// Use local API routes - Next.js API routes are under /api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('adminToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    // Ensure endpoint starts with /api for Next.js routes
    // Remove leading slash if present, then prepend /api
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const apiEndpoint = cleanEndpoint.startsWith('/api') ? cleanEndpoint : `/api${cleanEndpoint}`;

    try {
      console.log(`Making request to: ${this.baseURL}${apiEndpoint}`);
      const response = await fetch(`${this.baseURL}${apiEndpoint}`, config);
      console.log('Response status:', response.status);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'API request failed');
      }

      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.msg || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    const response = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    // Admin login returns { success, msg, token }, extract token
    return { token: response.token };
  }

  // Course endpoints
  async getCourses() {
    const response = await this.request('/admin/courses');
    return response.courses || response;
  }

  async createCourse(courseData) {
    const response = await this.request('/admin/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
    return response.course || response;
  }

  async updateCourse(id, courseData) {
    const response = await this.request(`/admin/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
    return response.course || response;
  }

  async deleteCourse(id) {
    return this.request(`/admin/courses/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadBrochure(formData) {
    const token = localStorage.getItem('adminToken');
    const API_BASE_URL = this.baseURL;
    const endpoint = '/api/admin/courses/upload-brochure';

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Upload failed');
      }

      if (!response.ok) {
        throw new Error(data.message || data.msg || 'Upload failed');
      }

      console.log('Upload response data:', data);
      const path = data.path;
      console.log('Extracted path from response:', path);
      
      if (!path) {
        throw new Error('No path returned from upload endpoint');
      }
      
      return path;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Category endpoints
  async getCategories() {
    const response = await this.request('/admin/categories');
    return response.categories || response;
  }

  async createCategory(categoryData) {
    const response = await this.request('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
    return response.category || response;
  }

  async updateCategory(id, categoryData) {
    const response = await this.request(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
    return response.category || response;
  }

  async deleteCategory(id) {
    return this.request(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;


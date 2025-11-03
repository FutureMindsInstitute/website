# API Server Implementation

This Next.js project now includes a complete backend API server that replicates the Express.js server functionality from the API documentation.

## Structure

### Models (`/models`)
- **User.js** - User model with profile, courses, experience, education
- **Course.js** - Course model with features, pricing, categories
- **Category.js** - Category model for course categorization
- **OTP.js** - OTP model for phone verification (auto-expires after 60 seconds)

### Middleware (`/middleware`)
- **userAuth.js** - JWT authentication for user routes
- **adminAuth.js** - JWT authentication for admin routes (validates admin ID)
- **middleware.js** - Global rate limiting middleware

### Utilities (`/lib`)
- **db.js** - MongoDB connection with caching
- **rateLimit.js** - Rate limiting utilities
- **email.js** - Email sending (Nodemailer) with welcome and password reset templates
- **sms.js** - SMS sending (Twilio) for OTP
- **otp.js** - OTP generation utility

### API Routes (`/app/api`)

#### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup/send-otp` - Send OTP for signup
- `POST /api/auth/signup/verify-otp` - Verify OTP and create user account
- `POST /api/auth/login` - User login with phone/password
- `GET /api/auth/google/login` - Google OAuth login (placeholder)
- `POST /api/auth/send-reset-password-link` - Request password reset
- `GET /api/auth/verify-reset-password-link` - Verify reset token
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/user/profile` - Get user profile
- `PUT /api/auth/user/profile` - Update user profile
- `DELETE /api/auth/user/profile` - Delete user account

#### Admin Routes (`/api/admin`)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/[id]` - Update course
- `DELETE /api/admin/courses/[id]` - Delete course
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

#### Public Routes (`/api`)
- `GET /api/category` - Get all active categories (public)
- `GET /api/course` - Get all active courses (public)

#### Payment Routes (`/api/payment`)
- `POST /api/payment/subscribe/[userId]` - Initiate course subscription (create Razorpay order)
- `POST /api/payment/verify-payment/[userId]` - Verify payment and complete subscription

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (see `env.template`):
```env
MONGODB_CONNECT_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZ_KEY_ID=your_razorpay_key_id
RAZ_KEY_SECRET=your_razorpay_key_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
FRONTEND_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

## Features

### Authentication
- JWT-based authentication (24-hour expiry)
- Phone OTP verification for signup
- Password reset via email
- Google OAuth (placeholder - needs implementation)
- User and admin authentication middleware

### Course Management
- Full CRUD operations for courses
- Feature array management
- Category assignment
- Active/inactive status

### Category Management
- Full CRUD operations for categories
- Automatic cleanup from courses on deletion

### Payment Integration
- Razorpay integration for course subscriptions
- Payment signature verification
- Course subscription with date tracking

### Security
- Rate limiting (global and per-endpoint)
- Password hashing with bcrypt
- JWT token verification
- Input validation
- OTP expiration (60 seconds)

### Email & SMS
- Welcome emails on signup
- Password reset emails
- OTP via SMS (Twilio)
- Email templates with HTML formatting

## Notes

1. **Google OAuth**: The `/api/auth/google/login` route is a placeholder. You'll need to implement the full OAuth flow using `googleapis` package.

2. **Rate Limiting**: Current implementation uses in-memory storage. For production, consider using Redis.

3. **Admin Credentials**: Admin login uses hardcoded credentials as per the original API:
   - Email: `admin@womeninproductindia.com`
   - Password: `admin@123`

4. **Database**: Uses MongoDB with Mongoose. Connection is cached for optimal performance.

5. **API Client**: The frontend API client (`lib/api.js`) has been updated to use the local API routes by default.

## Testing

You can test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- curl
- The frontend admin panel

All routes follow the same structure and response format as documented in the original API documentation.

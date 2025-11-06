'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import publicApi from '../../../../lib/publicApi';

const initialForm = {
  name: '',
  courses: [],
  amount: '',
  totalRedeemNumbers: '',
  isActive: true,
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [couponRes, courseRes] = await Promise.all([
          publicApi.get('/api/coupon', { withCredentials: true }),
          publicApi.get('/api/course', { withCredentials: true }),
        ]);
        if (!mounted) return;
        setCoupons(Array.isArray(couponRes?.data?.coupons) ? couponRes.data.coupons : []);
        setCourses(Array.isArray(courseRes?.data?.courses) ? courseRes.data.courses : []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.msg || e.message || 'Failed to load coupons');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Close courses dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (!courseDropdownOpen) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCourseDropdownOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setCourseDropdownOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [courseDropdownOpen]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return coupons;
    return coupons.filter(c => c.name?.toLowerCase().includes(q));
  }, [coupons, search]);

  const courseName = (idOrObj) => {
    const id = String(idOrObj?._id || idOrObj);
    const c = courses.find(x => String(x._id) === id);
    return c?.name || 'Unknown';
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (coupon) => {
    setEditingId(coupon._id);
    setForm({
      name: coupon.name || '',
      courses: (coupon.courses || []).map(c => String(c?._id || c)),
      amount: coupon.amount ?? '',
      totalRedeemNumbers: coupon.totalRedeemNumbers ?? '',
      isActive: coupon.isActive ?? true,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitting(false);
    setForm(initialForm);
    setEditingId(null);
  };

  const onChange = (key) => (e) => {
    const value = key === 'isActive' ? e.target.checked : e.target.value;
    setForm(s => ({ ...s, [key]: value }));
  };

  const onChangeCourses = (e) => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setForm(s => ({ ...s, courses: options }));
  };

  const refetchCoupons = async () => {
    const res = await publicApi.get('/api/coupon', { withCredentials: true });
    setCoupons(Array.isArray(res?.data?.coupons) ? res.data.coupons : []);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: String(form.name || '').toUpperCase().trim(),
        courses: form.courses,
        amount: Number(form.amount),
        totalRedeemNumbers: Number(form.totalRedeemNumbers),
        isActive: !!form.isActive,
      };
      if (!editingId) {
        await publicApi.post('/api/admin/coupons', payload, { withCredentials: true });
      } else {
        await publicApi.put(`/api/admin/coupons/${editingId}`, payload, { withCredentials: true });
      }
      await refetchCoupons();
      closeModal();
    } catch (e) {
      alert(e?.response?.data?.msg || e.message || 'Failed to save coupon');
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this coupon?')) return;
    try {
      await publicApi.delete(`/api/admin/coupons/${id}`, { withCredentials: true });
      await refetchCoupons();
    } catch (e) {
      alert(e?.response?.data?.msg || e.message || 'Failed to delete coupon');
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
        <button
          onClick={openCreate}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-4 py-2 text-sm font-medium cursor-pointer"
        >
          New Coupon
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          className="w-full max-w-sm bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-600">Loading coupons...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-600">No coupons found.</div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redeemed</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {filtered.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {(c.courses?.length || 0)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">₹{c.amount}</td>
                  <td className="px-4 py-3 text-gray-700">{c.totalRedeemNumbers}</td>
                  <td className="px-4 py-3 text-gray-700">{c.currentRedeemNumbers ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="px-3 py-1.5 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer"
                    >Edit</button>
                    <button
                      onClick={() => onDelete(c._id)}
                      className="px-3 py-1.5 text-xs rounded-md bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer"
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit Coupon' : 'New Coupon'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">✕</button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={onChange('name')}
                  onBlur={() => setForm(s => ({ ...s, name: String(s.name || '').toUpperCase() }))}
                  placeholder="e.g. NEWYEAR50"
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Courses</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCourseDropdownOpen(o => !o)}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  >
                    <span>{form.courses.length ? `Selected (${form.courses.length})` : 'Select courses'}</span>
                    <svg className={`w-4 h-4 transition-transform ${courseDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {courseDropdownOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2">
                      <div className="max-h-64 overflow-auto">
                        {courses.length === 0 ? (
                          <div className="px-2 py-2 text-sm text-gray-500">No courses</div>
                        ) : (
                          courses.map((c) => {
                            const id = String(c._id);
                            const checked = form.courses.includes(id);
                            return (
                              <label key={id} className="flex items-center gap-2 px-2 py-1 text-sm text-gray-800 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    setForm(s => {
                                      const next = e.target.checked
                                        ? Array.from(new Set([...(s.courses || []), id]))
                                        : (s.courses || []).filter(x => x !== id);
                                      return { ...s, courses: next };
                                    });
                                  }}
                                />
                                <span className="truncate">{c.name}</span>
                              </label>
                            );
                          })
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setForm(s => ({ ...s, courses: [] }))}
                          className="px-2 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => setCourseDropdownOpen(false)}
                          className="px-2 py-1 text-xs rounded-md bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.amount}
                    onChange={onChange('amount')}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Redeems</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.totalRedeemNumbers}
                    onChange={onChange('totalRedeemNumbers')}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input id="isActive" type="checkbox" checked={form.isActive} onChange={onChange('isActive')} />
                <label htmlFor="isActive" className="text-sm text-gray-800">Active</label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-60 cursor-pointer">
                  {submitting ? 'Saving...' : (editingId ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}



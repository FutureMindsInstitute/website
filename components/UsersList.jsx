'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import PaginationControls from '@/components/PaginationControls';
import { jsonFetcher } from '@/lib/fetcher';
import { formatDate } from '@/lib/utils';

const DEFAULT_LIMITS = [5, 10, 25, 50];

function buildKey({ page, limit, q, course }) {
  return JSON.stringify({ page, limit, q: q || '', course: course || '' });
}

function toCsv(rows) {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Courses', 'Created', 'Updated'];
  const escape = (v) => {
    const s = String(v ?? '');
    if (s.includes('"') || s.includes(',') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  
  const formatCourses = (courses) => {
    if (!Array.isArray(courses) || courses.length === 0) return 'No courses';
    return courses
      .map((c) => {
        if (typeof c === 'object' && c !== null) {
          if (c.courseId && typeof c.courseId === 'object') {
            return c.courseId.name || 'Course';
          }
          return c.name || 'Course';
        }
        return 'Course';
      })
      .filter(Boolean)
      .join('; ');
  };
  
  const lines = [headers.join(',')].concat(
    rows.map(u => [
      u._id || '',
      u.name || '',
      u.email || '',
      u.phone || u.mobile || '-',
      formatCourses(u.courses),
      u.createdAt ? formatDate(u.createdAt) : '-',
      u.updatedAt ? formatDate(u.updatedAt) : '-',
    ].map(escape).join(','))
  );
  return lines.join('\n');
}

export default function UsersList({ initialCourseFilter = [], courseOptions: courseOptionsProp }) {
  const router = useRouter();
  const params = useSearchParams();

  const [page, setPage] = useState(Math.max(1, Number(params.get('page')) || 1));
  const [limit, setLimit] = useState(Number(params.get('limit')) || 10);
  const [serverQuery, setServerQuery] = useState(params.get('q') || '');
  const [localQuery, setLocalQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState(() => {
    const urlCourse = params.get('course');
    if (urlCourse) return urlCourse.split(',').filter(Boolean);
    if (Array.isArray(initialCourseFilter)) return initialCourseFilter.map(String);
    return [];
  });

  const [data, setData] = useState({ users: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState(courseOptionsProp || []);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // In-memory cache for fetched pages
  const cacheRef = useRef(new Map());
  const debounceRef = useRef(null);

  // Sync URL (replace) without spamming history
  const syncUrl = useCallback((next) => {
    const sp = new URLSearchParams();
    sp.set('page', String(next.page));
    sp.set('limit', String(next.limit));
    if (next.q) sp.set('q', next.q); else sp.delete('q');
    if (next.course && next.course.length) sp.set('course', next.course.join(',')); else sp.delete('course');
    router.replace(`?${sp.toString()}`);
  }, [router]);

  // Fetch courses for filter if not provided
  useEffect(() => {
    if (courseOptionsProp && courseOptionsProp.length) return;
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/course', { credentials: 'include' });
        const json = await res.json();
        if (mounted) setCourses(Array.isArray(json?.courses) ? json.courses : []);
      } catch (e) {
        console.error('Failed to load course options', e);
      }
    })();
    return () => { mounted = false; };
  }, [courseOptionsProp]);

  // Close dropdown on outside click / Escape
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

  // Fetch data (uses cache)
  const fetchData = useCallback(async (opts) => {
    const key = buildKey(opts);
    const cached = cacheRef.current.get(key);
    if (cached) {
      setData(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }
    try {
      const sp = new URLSearchParams({ page: String(opts.page), limit: String(opts.limit) });
      if (opts.q) sp.set('q', opts.q);
      if (opts.course && opts.course.length) sp.set('course', opts.course.join(','));
      const json = await jsonFetcher(`/api/admin/user?${sp.toString()}`);
      const payload = {
        users: Array.isArray(json?.users) ? json.users : [],
        total: Number(json?.total) || 0,
        totalPages: Number(json?.totalPages) || 1,
      };
      cacheRef.current.set(key, payload);
      setData(payload);
      setError(null);
    } catch (e) {
      console.error('Failed to fetch users', e);
      setError(e?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial and reactive fetch
  useEffect(() => {
    const q = serverQuery?.trim();
    const course = courseFilter;
    const next = { page, limit, q, course };
    syncUrl(next);
    fetchData(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, serverQuery, courseFilter]);

  // Local filtering of current page only
  const visibleRows = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return data.users;
    return (data.users || []).filter(u => (
      String(u.name || '').toLowerCase().includes(q) ||
      String(u.email || '').toLowerCase().includes(q)
    ));
  }, [data.users, localQuery]);

  // Debounced server search trigger
  const triggerServerSearch = useCallback((value) => {
    const q = String(value || '').trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setServerQuery(q);
    }, 400);
  }, []);

  const onClearServerSearch = () => {
    setServerQuery('');
    setPage(1);
  };

  const onChangeCourse = (e) => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setCourseFilter(options);
    setPage(1);
  };

  const onExportCsv = () => {
    const csv = toCsv(visibleRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* <div className="flex items-center gap-2">
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Filter current page (name/email)"
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div> */}

          <div className="flex items-center gap-2">
            <input
              defaultValue={serverQuery}
              onChange={(e) => triggerServerSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            <Button onClick={() => triggerServerSearch(document.activeElement?.value || serverQuery)}>
              Search
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="secondary"
                onClick={() => setCourseDropdownOpen((o) => !o)}
                className="flex items-center gap-2"
              >
                <span>{courseFilter.length ? `Courses (${courseFilter.length})` : 'Filter by courses'}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${courseDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              {courseDropdownOpen && (
                <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                  <div className="max-h-64 overflow-auto">
                    {courses.length === 0 ? (
                      <div className="px-2 py-2 text-sm text-gray-500">No courses</div>
                    ) : (
                      courses.map((c) => {
                        const id = String(c._id);
                        const checked = courseFilter.includes(id);
                        return (
                          <label key={id} className="flex items-center gap-2 px-2 py-1 text-sm text-gray-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                setCourseFilter((prev) => {
                                  const next = e.target.checked
                                    ? Array.from(new Set([...prev, id]))
                                    : prev.filter((x) => x !== id);
                                  return next;
                                });
                                setPage(1);
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
                      onClick={() => setCourseFilter([])}
                      className="px-2 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setCourseDropdownOpen(false)}
                      className="px-2 py-1 text-xs rounded-md bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button variant="secondary" onClick={onExportCsv}>Export CSV</Button>
          </div>
        </div>

        {!!serverQuery && (
          <div className="mb-3 text-sm flex items-center justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 rounded px-3 py-2">
            <span>Showing server results for ‘{serverQuery}’</span>
            <button onClick={onClearServerSearch} className="underline cursor-pointer">Clear</button>
          </div>
        )}

        <div className="mb-3 text-sm text-gray-700">
          {data.total} users — Page {page} of {Math.max(data.totalPages || 1, 1)}
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {visibleRows.length > 0 ? (
                  visibleRows.map((u) => (
                    <tr key={u._id}>
                      <td className="px-4 py-3 text-gray-700">{u._id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-4 py-3 text-gray-700">{u.email}</td>
                      <td className="px-4 py-3 text-gray-700">{u.phone || u.mobile || '-'}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {Array.isArray(u.courses) && u.courses.length > 0 ? (
                          (() => {
                            const names = u.courses
                              .map((c) => {
                                if (typeof c === 'object' && c !== null) {
                                  if (c.courseId && typeof c.courseId === 'object') {
                                    return c.courseId.name || 'Course';
                                  }
                                  return c.name || 'Course';
                                }
                                return 'Course';
                              })
                              .filter(Boolean);
                            return (
                              <div className="max-w-xs flex flex-wrap gap-1">
                                {names.map((n, i) => (
                                  <span
                                    key={`${n}-${i}`}
                                    className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                    title={n}
                                  >
                                    {n}
                                  </span>
                                ))}
                              </div>
                            );
                          })()
                        ) : (
                          <span className="text-gray-400">No courses</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{u.createdAt ? formatDate(u.createdAt) : '-'}</td>
                      <td className="px-4 py-3 text-gray-700">{u.updatedAt ? formatDate(u.updatedAt) : '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan={7}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <PaginationControls
            page={page}
            totalPages={data.totalPages}
            limit={limit}
            onChangePage={(p) => setPage(Math.max(1, Math.min(p, data.totalPages || 1)))}
            onChangeLimit={(l) => { setLimit(l); setPage(1); }}
            limits={DEFAULT_LIMITS}
          />
        </div>
      </CardContent>
    </Card>
  );
}



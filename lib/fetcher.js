export async function jsonFetcher(url, init = {}) {
  try {
    const res = await fetch(url, { credentials: 'include', ...init });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const msg = (() => {
        try { return JSON.parse(text)?.msg || text; } catch { return text; }
      })() || `Request failed (${res.status})`;
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return await res.json();
  } catch (e) {
    console.error('Fetch error for', url, e);
    throw e;
  }
}



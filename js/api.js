// API wrapper
window.API = (function() {
  function _headers(needAuth) {
    const h = { "Content-Type": "application/json" };
    if (needAuth) {
      const t = localStorage.getItem(LS_ADMIN_TOKEN);
      if (t) h["Authorization"] = "Bearer " + t;
    }
    return h;
  }

  async function _req(method, path, body, needAuth) {
    const opt = { method, headers: _headers(needAuth) };
    if (body) opt.body = JSON.stringify(body);
    const r = await fetch(API_BASE + path, opt);
    let data = null;
    try { data = await r.json(); } catch(_) {}
    if (!r.ok) {
      const msg = (data && (data.error || data.message)) || ("HTTP " + r.status);
      const err = new Error(msg);
      err.status = r.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  return {
    get:    (p, auth=false) => _req("GET",    p, null, auth),
    post:   (p, b, auth=false) => _req("POST",   p, b,    auth),
    put:    (p, b, auth=false) => _req("PUT",    p, b,    auth),
    delete: (p, auth=false) => _req("DELETE", p, null, auth),
  };
})();

// 共用工具
function esc(s) {
  return String(s||"").replace(/[&<>"']/g, c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  })[c]);
}

function getOrCreateVoterToken() {
  let t = localStorage.getItem(LS_VOTER_TOKEN);
  if (!t) {
    // 簡單的隨機字串
    t = Date.now().toString(36) + "_" +
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2);
    localStorage.setItem(LS_VOTER_TOKEN, t);
  }
  return t;
}

function staffPhotoURL(staffId) {
  return API_BASE + "/api/public/staff/" + staffId + "/photo";
}

function requireAdmin() {
  if (!localStorage.getItem(LS_ADMIN_TOKEN)) {
    location.href = "login.html";
    return false;
  }
  return true;
}

function adminLogout() {
  localStorage.removeItem(LS_ADMIN_TOKEN);
  location.href = "login.html";
}

// GANTI dengan konfigurasi Firebase Anda (Console → Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyDkCa6hMHj0-PG6_b-ZVXiCCs7xAnqjMDY",
  authDomain: "kerjajadiasn-23c10.firebaseapp.com",
  projectId: "kerjajadiasn-23c10",
  storageBucket: "kerjajadiasn-23c10.firebasestorage.app",
  messagingSenderId: "438320778659",
  appId: "1:438320778659:web:52625d76f08d27a120de16"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// Helper global
window.KJ = {
  auth, db,
  // Cek apakah hari ini Sabtu (tryout gratis)
  isSaturday() { return new Date().getDay() === 6; },
  // Generate kode peserta
  genCode() {
    const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const seg = () => Array.from({length:4},()=>c[Math.floor(Math.random()*c.length)]).join('');
    return `ASN-${seg()}-${seg()}`;
  },
  // Format tanggal
  fmtDate(ts) {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'});
  },
  // Notifikasi toast sederhana
  toast(msg, type='info') {
    const el = document.createElement('div');
    const colors = {info:'bg-blue-600', success:'bg-green-600', error:'bg-red-600', warning:'bg-yellow-500'};
    el.className = `fixed top-4 right-4 ${colors[type]} text-white px-5 py-3 rounded-xl shadow-2xl z-[9999] font-semibold transition-all`;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; setTimeout(()=>el.remove(),300); }, 3000);
  },
  // Logout peserta
  logout() {
    localStorage.removeItem('kj_session');
    location.href = 'login.html';
  },
  // Session peserta
  getSession() {
    try { return JSON.parse(localStorage.getItem('kj_session')); } catch { return null; }
  },
  setSession(data) { localStorage.setItem('kj_session', JSON.stringify(data)); }
};

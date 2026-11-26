# Kerja Jadi ASN — Platform Tryout CPNS

Platform tryout CPNS dengan panel admin (kelola soal via Excel, generate kode peserta), dashboard peserta, tryout gratis setiap Sabtu.

## 🚀 Setup Firebase

### 1. Buat Project Firebase
1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **Add Project** → beri nama → lanjutkan
3. Setelah project jadi, klik icon **Web** `</>` untuk membuat app
4. Salin `firebaseConfig` yang muncul

### 2. Aktifkan Layanan
- **Authentication**: Menu **Build → Authentication** → Get Started → aktifkan **Email/Password** dan **Anonymous**
- **Firestore**: Menu **Build → Firestore Database** → Create Database → mode **Production** → pilih region Asia

### 3. Isi `js/firebase-config.js`
Ganti placeholder dengan config Firebase Anda.

### 4. Buat Admin Pertama
1. Di Firebase Console → **Authentication** → tab **Users** → Add user (email + password admin Anda)
2. Salin UID user yang baru dibuat
3. Di **Firestore** → Create collection `admins` → Document ID = UID tadi → isi field apapun (misal: `{ "nama": "Admin" }`)

### 5. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules

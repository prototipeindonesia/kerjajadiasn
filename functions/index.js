const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Webhook Midtrans
exports.midtransWebhook = functions.https.onRequest(async (req, res) => {
  const statusResponse = req.body;
  
  if (statusResponse.transaction_status === 'capture' || statusResponse.transaction_status === 'settlement') {
    const orderId = statusResponse.order_id; // Format: TRX-timestamp-kodePeserta
    const parts = orderId.split('-');
    const kodePeserta = parts[parts.length - 1]; // Ambil kode dari order ID
    
    // 1. Update status pendaftar menjadi approved
    const pendaftarSnap = await admin.firestore().collection('pendaftar').where('kode', '==', kodePeserta).get();
    if (!pendaftarSnap.empty) {
      await pendaftarSnap.docs[0].ref.update({ status: 'approved', paymentType: 'midtrans' });
    }
    
    // 2. Generate Kode Akses (Logika sama seperti di admin manual)
    // ... (Anda perlu menyalin logika generate kode dari admin ke sini)
    
    // 3. Kirim WhatsApp (Gunakan API seperti Fonnte/Wablas)
    // fetch('https://api.fonnte.com/send', { ... })
  }
  res.status(200).send('OK');
});

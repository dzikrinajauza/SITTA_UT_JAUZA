// Menangkap elemen form
const loginForm = document.getElementById('loginForm');
const signupBtn = document.getElementById('signupBtn');

// Logika saat form disubmit
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah halaman reload

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mencari kecocokan data
    const user = dataPengguna.find(u => u.email === email && u.password === password);

    if (user) {
        // Simpan nama user ke localStorage (opsional, agar bisa tampil di dashboard)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('namaUser', user.nama);
        
        alert(`Login Berhasil! Selamat datang, ${user.nama}`);
        window.location.href = 'dashboard.html';
    } else {
        alert('Email atau Password salah. Silakan cek kembali data di data.js Anda.');
    }
});
// Logika tombol Signup
signupBtn.addEventListener('click', function() {
    alert('Tombol Signup diklik! Silakan buat akun baru.');
});
// Data Pengguna Sementara untuk keperluan validasi login Tugas UT
const dataPengguna = [
  {
    nama: "Rina Wulandari",
    email: "jauza@email.com",
    password: "rina123"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Mencari kecocokan data login
            const user = dataPengguna.find(u => u.email === email && u.password === password);

            if (user) {
                // Set status login ke LocalStorage agar dashboard terbuka
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('namaUser', user.nama);
                
                alert(`Login Berhasil! Selamat datang, ${user.nama}`);
                // Pindah ke halaman index.html utama (SPA Dashboard Vue)
                window.location.href = 'index.html';
            } else {
                alert('Email atau Password salah. Silakan gunakan rina@ut.ac.id atau jauza@email.com');
            }
        });
    }
});
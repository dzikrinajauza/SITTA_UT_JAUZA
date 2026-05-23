document.addEventListener('DOMContentLoaded', () => {

    // --- BAGIAN 1: LOGIKA STATUS LOGIN ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const namaUser = localStorage.getItem('namaUser');

    if (isLoggedIn === 'true' && namaUser) {
        // a. Ubah Header: Ganti "Log in / Sign in" menjadi Nama User & Logout
        const navAuth = document.querySelector('.nav-auth');
        if (navAuth) {
            navAuth.innerHTML = `
                <span style="margin-right: 15px; font-size: 16px; color: #1e2772;"><b>${namaUser}</b></span>
                <button class="btn-get-started" id="logoutBtn" style="background: #1e2772; font-size: 16px; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;">Logout</button>
            `;
        }

        // b. Ubah Hero Section: Tampilkan nama di Welcome Message sesuai desain baru
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            heroTitle.innerHTML = `Hello, welcome back <br> <span>${namaUser}</span>`;
        }

        // c. Logika Tombol Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.clear(); // Hapus sesi login
                window.location.href = 'index.html'; // Kembali ke login
            });
        }
    }


    // --- BAGIAN 2: DROPDOWN REPORTS ---
    const reportsBtn = document.getElementById('reportsBtn');
    const reportsSubmenu = document.getElementById('reportsSubmenu');

    if (reportsBtn && reportsSubmenu) {
        reportsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            reportsSubmenu.classList.toggle('show');
        });
    }


    // --- BAGIAN 3: GLOBAL CLICK (TUTUP DROPDOWN) ---
    window.onclick = (event) => {
        // Jika area selain tombol Reports diklik, tutup dropdown
        if (reportsSubmenu && !event.target.matches('#reportsBtn')) {
            reportsSubmenu.classList.remove('show');
        }
    };

     // --- LOGIKA SISTEM TAB NAVIGASI ---
    const navTabs = document.querySelectorAll('.nav-tab');
    const cardContainers = document.querySelectorAll('.cards-container');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah halaman melompat atau reload saat diklik
    
            // 1. Hapus class 'active' (garis bawah oranye) dari semua menu navigasi
            navTabs.forEach(t => t.classList.remove('active'));
            
            // 2. Tambahkan class 'active' hanya ke menu yang baru saja diklik
            this.classList.add('active');
    
            // 3. Sembunyikan SEMUA kontainer kartu
            cardContainers.forEach(container => container.classList.add('hidden-tab'));
            
            // 4. Cari tahu kontainer mana yang harus dibuka berdasarkan atribut data-target
            const targetId = this.getAttribute('data-target');
            
            // 5. Munculkan kontainer target dengan menghapus class hidden-tab
            const targetContainer = document.getElementById(targetId);
            if (targetContainer) {
                targetContainer.classList.remove('hidden-tab');
            }
        });
    });
 
});
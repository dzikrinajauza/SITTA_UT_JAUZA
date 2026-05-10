document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.getElementById('heroGetStarted');
    const formStokSection = document.getElementById('form-stok');

    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn === 'true') {
                // JIKA SUDAH LOGIN: Scroll ke bagian Tambah Stok
                if (formStokSection) {
                    formStokSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // JIKA BELUM LOGIN: Arahkan ke halaman login (index.html)
                window.location.href = 'index.html'; 
            }
        });
    }
    
    // --- BAGIAN 1: LOGIKA STATUS LOGIN ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const namaUser = localStorage.getItem('namaUser');

    if (isLoggedIn === 'true' && namaUser) {
        // 1. Ubah Header: Ganti "Login" menjadi Nama User & Logout
        const navAuth = document.querySelector('.nav-auth');
        if (navAuth) {
            navAuth.innerHTML = `
                <span style="margin-right: 15px;"><b>${namaUser}</b></span>
                <button class="btn-get-started" id="logoutBtn">Logout</button>
            `;
        }

        // 2. Ubah Hero Section: Tampilkan nama di Welcome Message
        const heroTitle = document.querySelector('.hero-section h1');
        if (heroTitle) {
            heroTitle.innerHTML = `Hello, Welcome back <br> <span>${namaUser}</span>`;
        }

        // 3. Logika Tombol Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.clear(); // Hapus data login
            window.location.href = 'index.html'; // Kembali ke halaman login
        });
    } else {
        // Opsional: Jika belum login tapi coba akses dashboard, akan balik ke login
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


    // --- BAGIAN 3: MODAL PREVIEW COVER ---
    const coverTriggers = document.querySelectorAll('.cover-trigger');
    const coverModal = document.getElementById('coverModal');
    const previewImg = document.getElementById('previewImg');
    const closeBtn = document.querySelector('.close-btn');

    coverTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const coverSrc = this.getAttribute('data-cover');
            if (previewImg) previewImg.src = coverSrc;
            if (coverModal) coverModal.style.display = 'block';
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => coverModal.style.display = 'none';
    }

    // --- BAGIAN 4: FORM TAMBAH STOK ---
    const addStockForm = document.getElementById('addStockForm');
    const stockTableBody = document.querySelector('#stockTable tbody');

    if (addStockForm) {
        addStockForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const kode = document.getElementById('kodeBahan').value;
            const nama = document.getElementById('namaBahan').value;
            const stok = document.getElementById('jumlahStok').value;
            const lokasi = document.getElementById('lokasiRak').value;

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${kode}</td>
                <td>${nama.toUpperCase()}</td>
                <td>${stok}</td>
                <td>${lokasi.toUpperCase()}</td>
                <td><img src="assets/icon-photo.png" class="cover-trigger" data-cover="assets/default-cover.jpg" alt="cover"></td>
            `;

            stockTableBody.appendChild(newRow);
            alert('Data Stok Berhasil Ditambahkan!');
            addStockForm.reset();
        });
    }

    // --- BAGIAN 5: GLOBAL CLICK (TUTUP MODAL/DROPDOWN) ---
    window.onclick = (event) => {
        if (reportsSubmenu && !event.target.matches('#reportsBtn')) {
            reportsSubmenu.classList.remove('show');
        }
        if (coverModal && event.target == coverModal) {
            coverModal.style.display = 'none';
        }
    };
});
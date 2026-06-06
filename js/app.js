var app = new Vue({
  el: "#app",
  data: {
    currentTab: 'dashboard',
    isReportsDropdownOpen: false,
    namaUser: 'Rina Wulandari',

    // Tambahkan 2 state penampung modal ini
    isEditModalOpen: false,
    selectedItemToEdit: null,

    upbjjList: [],
    kategoriList: [],
    pengirimanList: [],
    paket: [],
    stok: [],
    tracking: {}
  },
  
  created() {
    // 1. Ambil nama user yang login dari LocalStorage (Bawaan script login kamu)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userSesi = localStorage.getItem('namaUser');
    
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; // Alihkan ke halaman login jika belum autentikasi
    } else {
        this.namaUser = userSesi;
    }

    // 2. Mengambil data dari dataBahanAjar.json menggunakan Fetch API (Sesuai Indikator Tugas)
    fetch('data/dataBahanAjar.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Gagal membaca file JSON dummy.");
        }
        return response.json();
      })
      .then(data => {
         this.upbjjList = data.upbjjList;
         this.kategoriList = data.kategoriList;
         this.pengirimanList = data.pengirimanList;
         this.paket = data.paket;
         
         // Ambil dari LocalStorage jika ada modifikasi baru (CRUD), jika kosong gunakan data dasar JSON
         this.stok = JSON.parse(localStorage.getItem("dataStokUT")) || data.stok;
         this.tracking = JSON.parse(localStorage.getItem("dataTrackingUT")) || data.tracking;
         console.log("Data JSON dummy berhasil dimuat ke dalam state Vue.");
      })
      .catch(err => console.error("Error layer service fetch:", err));
  },

  methods: {
    toggleReportsDropdown() {
      this.isReportsDropdownOpen = !this.isReportsDropdownOpen;
    },
    logout() {
      localStorage.clear();
      window.location.href = 'login.html';
    },
    // Handler menyimpan data stok baru dari form component
    saveStokGlobal(newStokObj) {
      this.stok.push(newStokObj);
      localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
      alert("Data stok baru berhasil masuk sistem utama!");
      this.currentTab = 'teaching-list'; // Lempar user otomatis ke halaman list tabel
    },
    // Handler menyimpan data tracking DO baru dari form component
    saveTrackingGlobal(payload) {
      // Menggunakan Vue.$set agar property baru bersifat reaktif dideteksi sistem
      this.$set(this.tracking, payload.key, payload.data);
      localStorage.setItem("dataTrackingUT", JSON.stringify(this.tracking));
    },
    logout() {
      localStorage.clear();
      window.location.href = 'login.html';
    },
    // Fungsi menangkap data baris tabel yang di-klik untuk dialirkan ke modal
    bukaEditGlobal(item) {
      this.selectedItemToEdit = item;
      this.isEditModalOpen = true;
    },
    // Fungsi mengeksekusi penyimpanan update data ke array utama & LocalStorage
    eksekusiUpdateStok(updatedObj) {
      const idx = this.stok.findIndex(s => s.kode === updatedObj.kode);
      if (idx !== -1) {
        // Update data array secara reaktif
        this.stok.splice(idx, 1, updatedObj);
        localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
        
        this.isEditModalOpen = false; // Tutup modal
        alert("Data stok berhasil diperbarui!");
      }
    },
    saveTrackingGlobal(payload) {
      this.$set(this.tracking, payload.key, payload.data);
      localStorage.setItem("dataTrackingUT", JSON.stringify(this.tracking));
    },
    // Fungsi Baru: Menghapus data stok secara reaktif berdasarkan kode bahan ajar
    eksekusiHapusStok(itemHapus) {
      const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus data bahan ajar: "${itemHapus.judul}"?`);
      
      if (konfirmasi) {
        // Cari posisi index item yang mau dihapus di dalam array
        const idx = this.stok.findIndex(s => s.kode === itemHapus.kode);
        if (idx !== -1) {
          // Hapus 1 item dari array secara reaktif
          this.stok.splice(idx, 1);
          // Perbarui penyimpanan lokal di browser
          localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
          alert("Data bahan ajar berhasil dihapus dari sistem!");
        }
      }
    }
  }
});

// Menutup dropdown otomatis saat klik di luar area tombol Reports
document.addEventListener('click', function() {
  if (window.app) {
    window.app.isReportsDropdownOpen = false;
  }
});
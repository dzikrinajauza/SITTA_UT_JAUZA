var app = new Vue({
  el: "#app",
  data: {
    currentTab: 'dashboard',
    isReportsDropdownOpen: false,
    
    // 1. UBAH DI SINI: Kosongkan namaUser secara default agar tidak otomatis masuk akun
    namaUser: '', 

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
    // 2. TAMBAHKAN GERBANG PENGECEKAN AUTENTIKASI
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userSesi = localStorage.getItem('namaUser');
    
    // Jika status login kosong atau tidak bernilai 'true', langsung tendang ke login.html
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return; // Hentikan proses selanjutnya agar data JSON tidak bocor dimuat
    } else {
        // Jika valid, baru masukkan nama dari localStorage ke state Vue
        this.namaUser = userSesi;
    }

    // 3. JIKA LOLOS LOGIN, BARU AMBIL DATA JSON
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
         
         this.stok = JSON.parse(localStorage.getItem("dataStokUT")) || data.stok;
         this.tracking = JSON.parse(localStorage.getItem("dataTrackingUT")) || data.tracking;
         console.log("Data JSON dummy berhasil dimuat.");
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
    saveStokGlobal(newStokObj) {
      this.stok.push(newStokObj);
      localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
      alert("Data stok baru berhasil masuk sistem utama!");
      this.currentTab = 'teaching-list';
    },
    saveTrackingGlobal(payload) {
      this.$set(this.tracking, payload.key, payload.data);
      localStorage.setItem("dataTrackingUT", JSON.stringify(this.tracking));
    },
    bukaEditGlobal(item) {
      this.selectedItemToEdit = item;
      this.isEditModalOpen = true;
    },
    eksekusiUpdateStok(updatedObj) {
      const idx = this.stok.findIndex(s => s.kode === updatedObj.kode);
      if (idx !== -1) {
        this.stok.splice(idx, 1, updatedObj);
        localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
        this.isEditModalOpen = false;
        alert("Data stok berhasil diperbarui!");
      }
    },
    eksekusiHapusStok(itemHapus) {
      const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus data bahan ajar: "${itemHapus.judul}"?`);
      if (konfirmasi) {
        const idx = this.stok.findIndex(s => s.kode === itemHapus.kode);
        if (idx !== -1) {
          this.stok.splice(idx, 1);
          localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
          alert("Data bahan ajar berhasil dihapus dari sistem!");
        }
      }
    }
  }
});

document.addEventListener('click', function() {
  if (window.app) {
    window.app.isReportsDropdownOpen = false;
  }
});
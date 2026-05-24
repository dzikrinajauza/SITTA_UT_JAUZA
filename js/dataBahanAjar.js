var app = new Vue({
  el: "#app",
  // DATA BARU: VARIABEL UNTUK MENAMPUNG PILIHAN FILTER DAN DATA STOK
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    pengirimanList: [
      { kode: "REG", nama: "Reguler (3-5 hari)" },
      { kode: "EXP", nama: "Ekspres (1-2 hari)" },
    ],
    paket: [
      { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116", "EKMA4115"], harga: 120000 },
      { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201", "FISIP4001"], harga: 140000 },
    ],

    formStok: {
      kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "",
      harga: null, qty: null, safety: null, catatanHTML: "",
    },

    stok: [
      { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024, cetak ulang</em>" },
      { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
      { kode: "BIOL4201", judul: "Biologi Umum (Praktikum)", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh <u>pendingin</u> untuk kit basah" },
      { kode: "FISIP4001", judul: "Dasar-Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder" },
    ],
    
    tracking: {
      "DO2025-0001": {
        nim: "123456789", nama: "Rina Wulandari", status: "Dalam Perjalanan", ekspedisi: "JNE", tanggalKirim: "2025-08-25", paket: "PAKET-UT-001", total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" },
        ],
      },
    },
    // VARIABEL BARU UNTUK MENGATUR STATUS FILTER (BUKA/TUTUP)
    isFilterOpen: false,
    
    // PENAMBAHAN VARIABEL FILTER AGAR COCOK DENGAN HTML
    filterOpt: {
      regional: "",
      kategori: "",
      harga: "",
      sortName: "",
      sortSafety: "",
      sortQty: ""
    },

    // VARIABEL BARU UNTUK MENGATUR STATUS MODAL EDIT DAN MENYIMPAN DATA SEMENTARA YANG AKAN DIEDIT
    isEditModalOpen: false,
    editIndex: -1,
    editForm: {
      kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "",
      harga: null, qty: null, safety: null, catatanHTML: ""
    },
  },

  // FITUR BARU: COMPUTED UNTUK LOGIKA FILTER REAL-TIME
  computed: {
    filteredStok() {
      // 1. Copy array agar data asli tidak rusak saat difilter
      let result = [...this.stok];

      // 2. Filter berdasarkan Regional
      if (this.filterOpt.regional !== "") {
        result = result.filter(item => item.upbjj === this.filterOpt.regional);
      }

      // 3. Filter berdasarkan Kategori
      if (this.filterOpt.kategori !== "") {
        result = result.filter(item => item.kategori === this.filterOpt.kategori);
      }

      // 4. Pengurutan (Sorting) A-Z Nama Bahan Ajar
      if (this.filterOpt.sortName === "az") {
        result.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.filterOpt.sortName === "za") {
        result.sort((a, b) => b.judul.localeCompare(a.judul));
      }

      // 5. Pengurutan (Sorting) Harga
      if (this.filterOpt.harga === "tinggi") {
        result.sort((a, b) => b.harga - a.harga); // Terbesar ke terkecil
      } else if (this.filterOpt.harga === "rendah") {
        result.sort((a, b) => a.harga - b.harga); // Terkecil ke terbesar
      }

      // 6. Pengurutan (Sorting) Safety Stock
      if (this.filterOpt.sortSafety === "min") {
        result.sort((a, b) => a.safety - b.safety);
      } else if (this.filterOpt.sortSafety === "max") {
        result.sort((a, b) => b.safety - a.safety);
      }

      // 7. Pengurutan (Sorting) Stock QTY
      if (this.filterOpt.sortQty === "min") {
        result.sort((a, b) => a.qty - b.qty);
      } else if (this.filterOpt.sortQty === "max") {
        result.sort((a, b) => b.qty - a.qty);
      }

      return result;
    }
  },
   //  FUNGSI YANG DIJALANKAN SAAT INSTANSI VUE DIBUAT
  created: function () {
    const stokTersimpan = localStorage.getItem("dataStokUT");
    if (stokTersimpan) {
      this.stok = JSON.parse(stokTersimpan);
    }
  },
  
  methods: {
    simpanDataStok() {
      this.stok.push({ ...this.formStok });
      localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
      alert("Data stok berhasil ditambahkan!");
      this.formStok = {
        kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "",
        harga: null, qty: null, safety: null, catatanHTML: "",
      };
    },
    
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    
    resetFilter() {
      // Mengosongkan kembali semua pilihan radio button
      this.filterOpt = { 
        regional: "", 
        kategori: "", 
        harga: "",
        sortName: "",
        sortSafety: "",
        sortQty: ""
      };
    },
    
    // FUNGSI UNTUK MEMBUKA MODAL EDIT DENGAN DATA YANG SUDAH ADA
    bukaModalEdit(item) {
      // Cari urutan data asli di array stok berdasarkan kode uniknya
      this.editIndex = this.stok.findIndex(s => s.kode === item.kode);
      
      // Copy datanya ke dalam form edit agar data asli tidak langsung berubah saat kita mengetik
      this.editForm = { ...item };
      this.isEditModalOpen = true;
    },
    
    tutupModalEdit() {
      this.isEditModalOpen = false;
    },
    
    simpanEditData() {
      if (this.editIndex !== -1) {
        // Ganti data lama dengan data baru yang sudah diedit
        // Menggunakan splice() adalah cara paling aman di Vue 2 agar tabel langsung otomatis ter-update
        this.stok.splice(this.editIndex, 1, { ...this.editForm });
        
        // Simpan pembaruan ke memori browser
        localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
        
        this.isEditModalOpen = false;
        alert("Data berhasil diperbarui!");
      }
    }

  },
});
var app = new Vue({
  // 1. SEMUA VARIABEL HARUS MASUK DI DALAM 'data'
  el: "#app",
  
  // 1. SEMUA VARIABEL HARUS MASUK DI DALAM 'data'
  data: {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    pengirimanList: [
      { kode: "REG", nama: "Reguler (3-5 hari)" },
      { kode: "EXP", nama: "Ekspres (1-2 hari)" },
    ],
    paket: [
      {
        kode: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        isi: ["EKMA4116", "EKMA4115"],
        harga: 120000,
      },
      {
        kode: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        isi: ["BIOL4201", "FISIP4001"],
        harga: 140000,
      },
    ],

    formStok: {
      kode: "",
      judul: "",
      kategori: "",
      upbjj: "",
      lokasiRak: "",
      harga: null,
      qty: null,
      safety: null,
      catatanHTML: "",
    },

    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>",
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>",
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah",
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder",
      },
    ],
    
    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" },
        ],
      },
    },

    // ---> VARIABEL SIDEBAR DIPINDAHKAN KE SINI <---
    isFilterOpen: false,
    filterOpt: {
      regional: "",
      kategori: "",
      harga: ""
    }
  },

  created: function () {
    const stokTersimpan = localStorage.getItem("dataStokUT");
    if (stokTersimpan) {
      this.stok = JSON.parse(stokTersimpan);
    }
  },

  // 2. SEMUA FUNGSI (KLIK TOMBOL) HARUS MASUK DI DALAM 'methods'
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
    
    // ---> FUNGSI SIDEBAR TETAP DI SINI <---
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    resetFilter() {
      this.filterOpt = { regional: "", kategori: "", harga: "" };
    }
  },
});
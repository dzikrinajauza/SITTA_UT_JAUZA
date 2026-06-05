var app = new Vue({
  el: "#app",

  // ========================================================================
  // 1. DATA (STATE MANAGEMENT)
  // ========================================================================
  data: {
    // --- A. DATA REFERENSI (Dropdown & Pilihan) ---
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

    // --- B. FITUR STOK BAHAN AJAR ---
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

    // Variabel untuk Modal Edit Stok
    isEditModalOpen: false,
    editIndex: -1,
    editForm: {
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

    // Variabel untuk Sidebar Filter Stok
    isFilterOpen: false,
    filterOpt: {
      regional: "",
      kategori: "",
      harga: "",
      sortName: "",
      sortSafety: "",
      sortQty: "",
    },

    // --- C. FITUR TRACKING PENGIRIMAN ---
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
          {
            waktu: "2025-08-25 10:12:20",
            keterangan: "Penerimaan di Loket: TANGSEL",
          },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          {
            waktu: "2025-08-26 08:44:01",
            keterangan: "Diteruskan ke Kantor Tujuan",
          },
        ],
      },
    },
    formTracking: {
      nomorDO: "",
      ekspedisi: "",
      nim: "",
      paket: "",
      nama: "",
      tanggalKirim: "",
    },
  },

  // ========================================================================
  // 2. COMPUTED (LOGIKA OTOMATIS)
  // ========================================================================
  computed: {
    // --- Logika Detail Paket (Otomatis muncul saat dropdown dipilih) ---
    detailPaketPilihan() {
      if (!this.formTracking.paket) return null;
      return this.paket.find((p) => p.kode === this.formTracking.paket);
    },

    // --- Logika Filter Tabel Stok ---
    filteredStok() {
      let result = [...this.stok];

      // Filtering (Saring Data)
      if (this.filterOpt.regional !== "")
        result = result.filter(
          (item) => item.upbjj === this.filterOpt.regional,
        );
      if (this.filterOpt.kategori !== "")
        result = result.filter(
          (item) => item.kategori === this.filterOpt.kategori,
        );

      // Sorting (Urutkan Data)
      if (this.filterOpt.sortName === "az")
        result.sort((a, b) => a.judul.localeCompare(b.judul));
      else if (this.filterOpt.sortName === "za")
        result.sort((a, b) => b.judul.localeCompare(a.judul));

      if (this.filterOpt.harga === "tinggi")
        result.sort((a, b) => b.harga - a.harga);
      else if (this.filterOpt.harga === "rendah")
        result.sort((a, b) => a.harga - b.harga);

      if (this.filterOpt.sortSafety === "min")
        result.sort((a, b) => a.safety - b.safety);
      else if (this.filterOpt.sortSafety === "max")
        result.sort((a, b) => b.safety - a.safety);

      if (this.filterOpt.sortQty === "min")
        result.sort((a, b) => a.qty - b.qty);
      else if (this.filterOpt.sortQty === "max")
        result.sort((a, b) => b.qty - a.qty);

      return result;
    },
  },

  // ========================================================================
  // 3. LIFECYCLE HOOK (SAAT HALAMAN PERTAMA KALI DIBUKA)
  // ========================================================================
  created: function () {
    // Tarik data Stok dari memori browser
    const stokTersimpan = localStorage.getItem("dataStokUT");
    if (stokTersimpan) {
      this.stok = JSON.parse(stokTersimpan);
    }

    // Tarik data Tracking dari memori browser
    const trackingTersimpan = localStorage.getItem("dataTrackingUT");
    if (trackingTersimpan) {
      this.tracking = JSON.parse(trackingTersimpan);
    }
  },

  // ========================================================================
  // 4. METHODS (FUNGSI / AKSI KLIK TOMBOL)
  // ========================================================================
  methods: {
    // --- A. FUNGSI TRACKING ---
    simpanTrackingBaru() {
      if (!this.formTracking.nomorDO) {
        alert("Nomor DO wajib diisi!");
        return;
      }

      const newData = {
        nim: this.formTracking.nim,
        nama: this.formTracking.nama,
        status: "Ordered",
        ekspedisi: this.formTracking.ekspedisi,
        tanggalKirim: this.formTracking.tanggalKirim,
        paket: this.formTracking.paket,
        total: this.detailPaketPilihan ? this.detailPaketPilihan.harga : 0,
        perjalanan: [
          {
            waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
            keterangan: "Pesanan Dibuat (Order Confirmed)",
          },
        ],
      };

      this.$set(this.tracking, this.formTracking.nomorDO, newData);
      localStorage.setItem("dataTrackingUT", JSON.stringify(this.tracking));

      alert("Tracking Delivery Order berhasil ditambahkan!");
      this.formTracking = {
        nomorDO: "",
        ekspedisi: "",
        nim: "",
        paket: "",
        nama: "",
        tanggalKirim: "",
      };
    },

    // --- B. FUNGSI TAMBAH STOK BARU ---
    simpanDataStok() {
      this.stok.push({ ...this.formStok });
      localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
      alert("Data stok berhasil ditambahkan!");
      this.formStok = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: null,
        qty: null,
        safety: null,
        catatanHTML: "",
      };
    },

    // --- C. FUNGSI FILTER SIDEBAR ---
    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    resetFilter() {
      this.filterOpt = {
        regional: "",
        kategori: "",
        harga: "",
        sortName: "",
        sortSafety: "",
        sortQty: "",
      };
    },

    // --- D. FUNGSI EDIT MODAL ---
    bukaModalEdit(item) {
      this.editIndex = this.stok.findIndex((s) => s.kode === item.kode);
      this.editForm = { ...item };
      this.isEditModalOpen = true;
    },
    tutupModalEdit() {
      this.isEditModalOpen = false;
    },
    simpanEditData() {
      if (this.editIndex !== -1) {
        this.stok.splice(this.editIndex, 1, { ...this.editForm });
        localStorage.setItem("dataStokUT", JSON.stringify(this.stok));
        this.isEditModalOpen = false;
        alert("Data berhasil diperbarui!");
      }
    },
  },
});

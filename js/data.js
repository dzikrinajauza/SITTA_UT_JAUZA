var dataPengguna = [
  {
    id: 1,
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    password: "rina123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta",
  },
  {
    id: 2,
    nama: "Agus Pranoto",
    email: "agus@ut.ac.id",
    password: "agus123",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Makassar",
  },
  {
    id: 3,
    nama: "Siti Marlina",
    email: "siti@ut.ac.id",
    password: "siti123",
    role: "Puslaba",
    lokasi: "Pusat",
  },
  {
    id: 4,
    nama: "Doni Setiawan",
    email: "doni@ut.ac.id",
    password: "doni123",
    role: "Fakultas",
    lokasi: "FISIP",
  },
  {
    id: 5,
    nama: "Admin SITTA",
    email: "admin@ut.ac.id",
    password: "admin123",
    role: "Administrator",
    lokasi: "Pusat",
  },
];

var dataBahanAjar = [
  {
    kodeLokasi: "0TMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 548,
    cover: "img/pengantar_komunikasi.jpg",
  },
  {
    kodeLokasi: "0JKT01",
    kodeBarang: "EKMA4216",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "BMP",
    edisi: "3",
    stok: 392,
    cover: "img/manajemen_keuangan.jpg",
  },
  {
    kodeLokasi: "0SBY02",
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "BMP",
    edisi: "1",
    stok: 278,
    cover: "img/kepemimpinan.jpg",
  },
  {
    kodeLokasi: "0MLG01",
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi Dasar",
    jenisBarang: "BMP",
    edisi: "2",
    stok: 165,
    cover: "img/mikrobiologi.jpg",
  },
  {
    kodeLokasi: "0UPBJJBDG",
    kodeBarang: "PAUD4401",
    namaBarang: "Perkembangan Anak Usia Dini",
    jenisBarang: "BMP",
    edisi: "4",
    stok: 204,
    cover: "img/paud_perkembangan.jpg",
  },
];

var dataTracking = {
  2023001234: {
    nomorDO: "2023001234",
    nama: "Rina Wulandari",
    status: "On the Way",
    ekspedisi: "JNE",
    tanggalKirim: "2025-08-25",
    paket: "0JKT01",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2025-08-25 08:23:11",
        keterangan: "Your order has been received",
      },
      {
        waktu: "2025-08-25 08:24:50",
        keterangan: "Order confirmed",
      },
      {
        waktu: "2025-08-25 08:24:55",
        keterangan: "Your items are being prepared for shipment",
      },
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Received at counter: TANGERANG SELATAN.",
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Arrived at Hub: TANGERANG SELATAN.",
      },
      {
        waktu: "2025-08-25 16:12:20",
        keterangan: "Forwarded to South Jakarta Office.",
      },
      {
        waktu: "2025-08-25 18:30:10",
        keterangan: "Expected delivery",
      },
    ],
  },
  2023005678: {
    nomorDO: "2023001234",
    nama: "Agus Pranoto",
    status: "Finished",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-08-25",
    paket: "0UPBJJBDG",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2025-08-25 08:23:11",
        keterangan: "Your order has been received",
      },
      {
        waktu: "2025-08-25 08:24:50",
        keterangan: "Order confirmed",
      },
      {
        waktu: "2025-08-25 08:24:55",
        keterangan: "Your items are being prepared for shipment",
      },
      {
        waktu: "2025-08-25 10:12:20",
        keterangan: "Received at counter: TANGERANG SELATAN.",
      },
      {
        waktu: "2025-08-25 14:07:56",
        keterangan: "Arrived at Hub: TANGERANG SELATAN.",
      },
      {
        waktu: "2025-08-25 16:30:10",
        keterangan: "Forwarded to Bandung City Office",
      },
      {
        waktu: "2025-08-26 12:15:33",
        keterangan: "Arrived at Hub: Kota BANDUNG",
      },
      {
        waktu: "2025-08-26 15:06:12",
        keterangan: "Delivery process to Cimahi",
      },
      {
        waktu: "2025-08-26 20:00:00",
        keterangan: "Delivery Completed. Recipient: Agus Pranoto",
      },
    ],
  },
};

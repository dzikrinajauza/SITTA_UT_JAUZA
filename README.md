# SITTA-UT

#### SITTA-UT (Sistem Informasi Tracking & bahan Ajar - Universitas Terbuka) adalah website admin panel berbasis web untuk mengelola inventori bahan ajar (teaching materials) dan melacak status pengiriman delivery order ke mahasiswa Universitas Terbuka.

🔗 Live Demo: https://dzikrinajauza.github.io/sitta_ut/login.html

> 🎓 Proyek ini dibuat untuk memenuhi tugas mata kuliah **Pemrograman Berbasis Web**.

## 📖 Deskripsi

Website ini dibuat khusus untuk **admin/staf gudang UT**, dengan dua fungsi utama:
1. **Manajemen Stok Bahan Ajar** — mencatat, menambah, dan memantau ketersediaan stok bahan ajar per regional.
2. **Tracking Pengiriman (Delivery Order)** — mencatat pengiriman paket bahan ajar ke mahasiswa dan melacak statusnya secara real-time.

## ✨ Fitur Utama

### 🔐 Login

![alt text](?raw=true)

Halaman login admin dengan email & password sebelum mengakses dashboard.

### 🏠 Dashboard

![alt text](?raw=true)

Halaman utama setelah login, menampilkan sapaan personal ("Hello, welcome back") dan navigasi ke 4 modul utama melalui tab:

1. Teaching Material Info
2. Tracking Delivery Info
3. Reports
4. Transaction History

Serta shortcut card menuju:

1. Teaching Material Stock List
2. Add New Stock
3. Shipment Tracking
4. Add Tracking Delivery Order
   
### 📦 Teaching Material Stock List

![alt text](?raw=true)

Menampilkan tabel daftar stok bahan ajar (Kode, Nama Bahan Ajar, Kategori, Qty, Lokasi Rak, Regional UT, Harga, Safety Stock, Catatan, Status) lengkap dengan:
1. Panel **Filter** (berdasarkan Regional, Kategori, Harga, Nama Bahan Ajar A-Z/Z-A, Safety Stock, dan Qty)
2. Aksi Edit per baris data
3. Indikator status stok (Aman / Menipis)
   
### ➕ Add New Stock

![alt text](?raw=true)

Form untuk menambahkan data bahan ajar baru ke dalam inventori (Kode, Nama Bahan Ajar, Kategori, Qty, Lokasi Rak, Regional UT, Harga, Safety Stock, Catatan).

### 🚚 Add Tracking Delivery Order

![alt text](?raw=true)

Form untuk mencatat pengiriman baru (Nomor DO, Ekspedisi, NIM, Nama Mahasiswa, Paket Bahan Ajar, Tanggal Kirim), lengkap dengan rincian isi paket dan total harga otomatis. Data yang tersimpan langsung muncul di tabel **Daftar Tracking DO**.

### 📍 Shipment Tracking

![alt text](?raw=true)

Halaman untuk melacak status pengiriman berdasarkan nomor DO, menampilkan:
1. Progress bar pengiriman (Ordered → Confirmed → Shipped → Delivered)
2. Order timeline lengkap dengan waktu setiap perubahan status
3. Informasi detail pengiriman (Penerima, Tanggal Kirim, Ekspedisi, Kode Paket, Total Biaya)

## 🖼️ Tampilan Aplikasi

| Halaman	| Deskripsi |
|:--------|:----------|
| Login	| Autentikasi admin |
| Dashboard	| Ringkasan & navigasi modul |
| Teaching Material Stock List	| Daftar stok bahan ajar |
| Add New Stock	| Form tambah stok |
| Add Tracking Delivery Order	| Form tambah pengiriman |
| Shipment Tracking	| Lacak status pengiriman |

### 🛠️ Tech Stack
- **HTML5** — struktur halaman
- **CSS3** — styling (dipisah per halaman/komponen)
- **JavaScript (Vanilla JS)** — logika aplikasi & interaktivitas
- **JSON** — sumber data (dataBahanAjar.json)
- **GitHub Pages** — hosting/deploy

## 👤 Author

[Dzikrina Jauza Hasna] Front-End | [dzikrinajauza@example.com] · 🔗 https://www.linkedin.com/in/dzikrinajauza/ ·

## 🎓 Konteks Tugas

Website ini merupakan tugas kuliah mata kuliah Pemrograman Berbasis Web, dibuat sebagai studi kasus admin panel untuk manajemen inventori bahan ajar dan tracking pengiriman berbasis HTML, CSS, dan JavaScript.

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi MIT - Untuk keperluan pembelajaran/tugas dan dapat digunakan secara bebas dengan mencantumkan kredit kepada pembuat asli.


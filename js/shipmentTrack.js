/**
 * ========================================================================
 * FUNGSI UTAMA: Lacak Pengiriman
 * Digunakan untuk mencari nomor DO dan memperbarui tampilan (UI)
 * ========================================================================
 */
function lacakPengiriman() {
  // 1. Ambil inputan user dan elemen kontainer hasil
  const inputNoDO = document.getElementById("inputDO").value;
  const resultDiv = document.getElementById("trackingResult");

  if (!inputNoDO) {
    alert("Silakan masukkan Nomor DO terlebih dahulu.");
    return;
  }

  // ========================================================================
  // TAHAP 1: PENGAMBILAN & PENGGABUNGAN DATA
  // ========================================================================
  
  // Ambil data tracking terbaru yang disimpan admin dari Local Storage
  const trackingTersimpan = localStorage.getItem("dataTrackingUT");
  let dataDariAdmin = trackingTersimpan ? JSON.parse(trackingTersimpan) : {};
  
  // Gabungkan data bawaan JS (dataTracking) dengan data terbaru (dataDariAdmin)
  // Data admin diletakkan di belakang agar menimpa/memperbarui data lama jika nomor DO sama
  const semuaDataTracking = { ...dataTracking, ...dataDariAdmin };
  
  // Cari data spesifik berdasarkan input nomor DO
  const data = semuaDataTracking[inputNoDO];

  // ========================================================================
  // TAHAP 2: MEMPERBARUI TAMPILAN JIKA DATA DITEMUKAN
  // ========================================================================
  if (data) {
    resultDiv.classList.remove("hidden"); // Munculkan kontainer hasil

    // --- A. Update Informasi Dasar (Header & Tabel) ---
    // Jika tidak ada data.nomorDO, fallback menggunakan inputNoDO
    document.getElementById("res-do-number").innerText = `DO Number ${data.nomorDO || inputNoDO}`;
    document.getElementById("res-status-badge").innerText = data.status;
    document.getElementById("res-placed-date").innerText = `Placed on ${data.tanggalKirim}`;
    
    // Tabel Informasi
    document.getElementById("res-penerima").innerText = data.nama;
    document.getElementById("res-tgl-kirim").innerText = data.tanggalKirim;
    document.getElementById("res-ekspedisi").innerText = data.ekspedisi;
    document.getElementById("res-kode-paket").innerText = data.paket;
    document.getElementById("res-total").innerText = typeof data.total === 'number' 
        ? `Rp ${data.total.toLocaleString('id-ID')}` // Format uang jika angka
        : data.total; // Biarkan jika string (data statis lama)

    // --- B. Render Timeline Perjalanan Paket ---
    const timelineList = document.getElementById("res-timeline");
    timelineList.innerHTML = ""; // Bersihkan list sebelumnya

    if (data.perjalanan && data.perjalanan.length > 0) {
      data.perjalanan.forEach((item, index) => {
        const isCurrent = index === data.perjalanan.length - 1; // Tandai item terakhir sebagai status saat ini
        const li = document.createElement("li");
        li.className = "timeline-item";

        // Buat elemen list HTML
        li.innerHTML = `
          <div class="timeline-icon"><i class="fas fa-check"></i></div>
          <div class="timeline-content">
              <strong>${item.keterangan}</strong> 
              ${isCurrent ? '<span class="badge" style="background:#ffcccc; color:#d32f2f; margin-left: 10px;">Current</span>' : ""}
              <p style="font-size: 12px; color: gray; margin: 5px 0;">${item.waktu}</p>
          </div>
        `;
        timelineList.appendChild(li);
      });
    } else {
      timelineList.innerHTML = "<p>Belum ada riwayat perjalanan.</p>";
    }

    // --- C. Update Progress Bar (Indikator Hijau) ---
    const progressBar = document.getElementById("progress-bar-width");
    const stepShipped = document.getElementById("step-shipped");
    const stepDelivered = document.getElementById("step-delivered");
    
    // Ambil ikon di dalam lingkaran
    const iconShipped = stepShipped.querySelector(".circle i");
    const iconDelivered = stepDelivered.querySelector(".circle i");
    
    // Reset kondisi tampilan ke awal (hanya order & confirmed yang aktif)
    stepShipped.classList.remove("active");
    stepDelivered.classList.remove("active");
    iconDelivered.className = "fas fa-box"; 

    // Tentukan lebar bar dan ikon berdasarkan status
    if (data.status === "Finished" || data.status === "Delivered") {
      // Paket Diterima
      progressBar.style.width = "100%";
      stepShipped.classList.add("active");
      stepDelivered.classList.add("active");
      iconDelivered.className = "fas fa-check"; 
    } 
    else if (data.status === "On the Way" || data.status === "Dalam Perjalanan") {
      // Paket dalam pengiriman
      progressBar.style.width = "65%";
      stepShipped.classList.add("active");
      stepDelivered.classList.remove("active");
      iconDelivered.className = "fas fa-box";
    } 
    else {
      // Tahap awal (Ordered)
      progressBar.style.width = "35%";
      stepShipped.classList.remove("active");
      stepDelivered.classList.remove("active");
    }

  // ========================================================================
  // TAHAP 3: JIKA DATA TIDAK DITEMUKAN
  // ========================================================================
  } else {
    alert("Nomor Delivery Order (DO) tidak ditemukan di sistem!");
    resultDiv.classList.add("hidden"); // Sembunyikan kembali hasil
  }
}
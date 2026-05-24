function lacakPengiriman() {
  const inputNoDO = document.getElementById("inputDO").value;
  const resultDiv = document.getElementById("trackingResult");
  // 1. Ambil data tracking yang tersimpan di Local Storage
  const trackingTersimpan = localStorage.getItem("dataTrackingUT");
  // 2. Jika ada data di Local Storage, ubah jadi objek. Jika tidak ada, buat objek kosong {}
  let dataDariAdmin = trackingTersimpan ? JSON.parse(trackingTersimpan) : {};
  // 3. Gabungkan data bawaan (dataTracking) dengan data terbaru (dataDariAdmin)
  // Data admin diletakkan di belakang agar menjadi prioritas utama jika ada nomor DO yang sama
  const semuaDataTracking = { ...dataTracking, ...dataDariAdmin };
  // 4. Lakukan pencarian menggunakan gabungan data tersebut
  const data = semuaDataTracking[inputNoDO];

  if (data) {
    resultDiv.classList.remove("hidden");
    // 1. Update Informasi Header & Tabel
    document.getElementById("res-do-number").innerText =
      `DO Number ${data.nomorDO}`;
    document.getElementById("res-status-badge").innerText = data.status;
    document.getElementById("res-placed-date").innerText =
      `Placed on ${data.tanggalKirim}`;
    document.getElementById("res-penerima").innerText = data.nama;
    document.getElementById("res-tgl-kirim").innerText = data.tanggalKirim;
    document.getElementById("res-ekspedisi").innerText = data.ekspedisi;
    document.getElementById("res-kode-paket").innerText = data.paket;
    document.getElementById("res-total").innerText = data.total;

    // 3. Render Timeline
    const timelineList = document.getElementById("res-timeline");
    timelineList.innerHTML = ""; // Reset

    data.perjalanan.forEach((item, index) => {
      const isCurrent = index === data.perjalanan.length - 1;
      const li = document.createElement("li");
      li.className = "timeline-item";

      // Icon tetap hijau karena ini adalah history yang sudah dilalui
      li.innerHTML = `
                <div class="timeline-icon"><i class="fas fa-check"></i></div>
                <div class="timeline-content">
                    <strong>${item.keterangan}</strong> ${isCurrent ? '<span class="badge" style="background:#ffcccc">Current</span>' : ""}
                    <p style="font-size: 12px; color: gray; margin: 5px 0;">${item.waktu}</p>
                </div>
            `;
      timelineList.appendChild(li);
    });

    // 3. Update Delivery Progress (Logika Icon Hijau)
    const progressBar = document.getElementById("progress-bar-width");
    const stepShipped = document.getElementById("step-shipped");
    const stepDelivered = document.getElementById("step-delivered");

    // Memilih icon di dalam circle
    const iconShipped = stepShipped.querySelector(".circle i");
    const iconDelivered = stepDelivered.querySelector(".circle i");
    // Reset state awal
    stepShipped.classList.remove("active");
    stepDelivered.classList.remove("active");
    iconDelivered.className = "fas fa-box"; // Default icon box

    if (data.status === "Finished") {
      // Kondisi Paket Sudah Diterima (Selesai)
      progressBar.style.width = "100%";
      stepShipped.classList.add("active");
      stepDelivered.classList.add("active");
      iconDelivered.className = "fas fa-check"; // Ubah jadi centang
    } else if (data.status === "On the Way") {
      // Kondisi Paket Masih di Kurir
      progressBar.style.width = "65%";
      stepShipped.classList.add("active");
      stepDelivered.classList.remove("active");
      iconDelivered.className = "fas fa-box";
    } else {
      // Jika baru tahap awal
      progressBar.style.width = "35%";
      stepShipped.classList.remove("active");
      stepDelivered.classList.remove("active");
    }
  } else {
    alert("Nomor DO tidak ditemukan!");
    resultDiv.classList.add("hidden");
  }
}

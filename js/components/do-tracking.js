Vue.component('do-tracking-manager', {
  template: '#tpl-do-tracking',
  props: ['mode', 'trackingData', 'pengirimanList', 'paket'],
  data() {
    return {
      searchQuery: "",
      activeTrackKey: null,
      activeTrackData: null,
      localTracking: {
        nomorDO: "", ekspedisi: "", nim: "", paket: "", nama: "", tanggalKirim: ""
      }
    }
  },
  computed: {
    paketTerpilih() {
      if (!this.localTracking.paket) return null;
      return this.paket.find(p => p.kode === this.localTracking.paket);
    },
    progressWidth() {
      if (!this.activeTrackData) return '0%';
      const status = this.activeTrackData.status;
      if (status === 'Finished') return '100%';
      if (status === 'Dalam Perjalanan') return '65%';
      return '35%';
    }
  },
  watch: {
    // Watcher otomatis meng-generate Nomor DO baru saat form dibuka (Indikator 5)
    mode: {
      immediate: true,
      handler(newMode) {
        if (newMode === 'add') {
          const totalDO = Object.keys(this.trackingData).length + 1;
          const tahun = new Date().getFullYear();
          // Logika Auto-generate DO2026-0002 dst
          this.localTracking.nomorDO = `DO${tahun}-${String(totalDO).padStart(4, '0')}`;
        }
      }
    }
  },
  methods: {
    lacakDO() {
      if (!this.searchQuery) {
        alert("Masukkan No DO atau NIM!");
        return;
      }
      
      // Pencarian fleksibel bisa pakai No DO (key) atau NIM di dalam objek
      if (this.trackingData[this.searchQuery]) {
        this.activeTrackKey = this.searchQuery;
        this.activeTrackData = this.trackingData[this.searchQuery];
      } else {
        const foundKey = Object.keys(this.trackingData).find(key => this.trackingData[key].nim === this.searchQuery);
        if (foundKey) {
          this.activeTrackKey = foundKey;
          this.activeTrackData = this.trackingData[foundKey];
        } else {
          alert("Data Pengiriman tidak ditemukan!");
          this.resetLacak();
        }
      }
    },
    resetLacak() {
      this.searchQuery = "";
      this.activeTrackKey = null;
      this.activeTrackData = null;
    },
    submitTracking() {
      this.$emit('add-tracking-global', {
        key: this.localTracking.nomorDO,
        data: {
          nim: this.localTracking.nim,
          nama: this.localTracking.nama,
          status: "Ordered",
          ekspedisi: this.localTracking.ekspedisi,
          tanggalKirim: this.localTracking.tanggalKirim,
          paket: this.localTracking.paket,
          total: this.paketTerpilih ? this.paketTerpilih.harga : 0,
          perjalanan: [
            {
              waktu: new Date().toISOString().slice(0, 19).replace('T', ' '),
              keterangan: "Pesanan Dibuat (Order Confirmed)"
            }
          ]
        }
      });
      alert("Data Tracking DO berhasil ditambahkan!");
      this.resetForm();
    },
    resetForm() {
      const totalDO = Object.keys(this.trackingData).length + 1;
      const tahun = new Date().getFullYear();
      this.localTracking = {
        nomorDO: `DO${tahun}-${String(totalDO).padStart(4, '0')}`,
        ekspedisi: "", nim: "", paket: "", nama: "", tanggalKirim: ""
      };
    }
  }
});
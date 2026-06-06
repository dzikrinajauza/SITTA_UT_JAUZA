Vue.component('ba-stock-table', {
  template: '#tpl-stock',
  props: ['items', 'upbjjList', 'kategoriList'],
  data() {
    return {
      // Data internal untuk kontrol filter di sidebar
      isFilterOpen: false,
      filterOpt: {
        regional: "",
        kategori: "",
        harga: "",
        sortName: "",
        sortSafety: "",
        sortQty: "",
        alertStock: "" // Untuk filter Qty < Safety atau Qty = 0
      }
    }
  },
  computed: {
    // Kombinasi logika Filter dan Sorting menggunakan Computed Property (Indikator 4 & 6)
    filteredItems() {
      let result = [...this.items];

      // 1. Filter Berdasarkan Regional UT
      if (this.filterOpt.regional !== "") {
        result = result.filter(item => item.upbjj === this.filterOpt.regional);
      }
      
      // 2. Filter Berdasarkan Kategori Mata Kuliah
      if (this.filterOpt.kategori !== "") {
        result = result.filter(item => item.kategori === this.filterOpt.kategori);
      }

      // 3. Filter Kondisi Stok Khusus (Mengingatkan Re-order)
      if (this.filterOpt.alertStock === 'reorder') {
        result = result.filter(item => item.qty < item.safety);
      } else if (this.filterOpt.alertStock === 'empty') {
        result = result.filter(item => item.qty === 0);
      }

      // 4. Sorting Berdasarkan Judul (A-Z / Z-A)
      if (this.filterOpt.sortName === "az") {
        result.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.filterOpt.sortName === "za") {
        result.sort((a, b) => b.judul.localeCompare(a.judul));
      }

      // 5. Sorting Berdasarkan Harga
      if (this.filterOpt.harga === "tinggi") {
        result.sort((a, b) => b.harga - a.harga);
      } else if (this.filterOpt.harga === "rendah") {
        result.sort((a, b) => a.harga - b.harga);
      }

      return result;
    }
  },
  // Vue Filters untuk formatting data teks secara instan (Indikator 2 & 7)
  filters: {
    currencyRp(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    satuanBuah(value) {
      if (value === null || value === undefined) return '0 buah';
      return value + ' buah';
    }
  },
  methods: {
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
        alertStock: ""
      };
    },
    // Emit event ke root instance untuk aksi update & delete data
    panggilModalEdit(item) {
      this.$emit('edit-item', item);
    },
    hapusItemstok(item) {
      this.$emit('delete-item', item);
    }
  }
});
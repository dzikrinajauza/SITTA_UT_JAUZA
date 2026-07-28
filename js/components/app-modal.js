Vue.component('app-modal', {
  template: '#tpl-app-modal',
  props: ['isOpen', 'itemData'],
  data() {
    return {
      localForm: {
        kode: "", judul: "", qty: null, lokasiRak: "", harga: null, safety: null, catatanHTML: ""
      }
    }
  },
  watch: {
    // Memantau setiap ada data lemparan baru yang masuk saat tombol edit di-klik
    itemData: {
      immediate: true,
      handler(newData) {
        if (newData) {
          // Duplikat data agar perubahan input tidak langsung merusak tabel sebelum di-save
          this.localForm = { ...newData };
        }
      }
    }
  },
  methods: {
    tutupModal() {
      this.$emit('close-modal');
    },
    simpanPerubahan() {
      // Lempar data yang sudah di-edit kembali ke parent instance utama
      this.$emit('save-change', this.localForm);
    }
  }
});
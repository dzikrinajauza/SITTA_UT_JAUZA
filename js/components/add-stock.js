Vue.component('add-stock-form', {
  template: '#tpl-add-stock',
  props: ['upbjjList', 'kategoriList'],
  data() {
    return {
      localForm: {
        kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "",
        harga: null, qty: null, safety: null, catatanHTML: ""
      }
    }
  },
  methods: {
    submitForm() {
      // Kirim data inputan ke parent (app.js) untuk di-push ke array utama
      this.$emit('add-stok-global', { ...this.localForm });
      
      // Reset form input setelah sukses
      this.localForm = {
        kode: "", judul: "", kategori: "", upbjj: "", lokasiRak: "",
        harga: null, qty: null, safety: null, catatanHTML: ""
      };
    }
  }
});
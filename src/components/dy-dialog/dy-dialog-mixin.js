export default {
  data() {
    return {
      form: {},
      _form: {}
    }
  },
  created() {
    this._form = JSON.parse(JSON.stringify(this.form))
  },
  methods: {
    open() {
      this.$refs.dyDialog && this.$refs.dyDialog.open()
    },
    close() {
      this.$refs.dyDialog && this.$refs.dyDialog.close()
    },
    resetForm() {
      for(let key in this.form) {
        this.form[key] = this._form[key]
      }
    }
  }
}
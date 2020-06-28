export default {
  data() {
    return {
      initParams: {},
      _initParams: {}
    }
  },
  created() {
    this._initParams = JSON.parse(JSON.stringify(this.initParams))
  },
  methods: {
    open() {
      this.$refs.dyDialog && this.$refs.dyDialog.open()
    },
    close() {
      this.$refs.dyDialog && this.$refs.dyDialog.close()
    },
    resetForm() {
      for(let key in this.initParams) {
        this.initParams[key] = this._initParams[key]
      }
    }
  }
}
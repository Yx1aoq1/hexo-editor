
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      show: this.visible
    }
  },
  watch: {
    value (val) {
      if (val !== this.show) {
        this.show = val
      }
    },
    show (val) {
      if (val !== this.value) {
        this.$emit('input', val)
      }
    }
  }
}

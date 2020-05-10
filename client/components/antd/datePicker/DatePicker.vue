<!--基础组件：
 /**
 * @desc antd date-picker 封装，将输入输出值转成时间戳格式
 * @example
 -->
<template>
  <a-date-picker
    :value="controlValue"
    :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
    v-bind="$attrs"
    v-on="listeners"
    @change="handleChange"
  />
</template>
<script>
import moment from 'moment'
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      controlValue: ''
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: this.handleChange
      }
    }
  },
  watch: {
    value: {
      handler () {
        this.controlValue = this.formatDate()
      },
      immediate: true
    }
  },
  methods: {
    moment,
    formatDate () {
      return this.value ? moment(this.value) : null
    },
    handleChange (value) {
      const outValue = +value
      this.$emit('change', outValue)
      this.$emit('input', outValue)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

<template>
  <div>
    <template v-for="(tag, index) in tags">
      <a-tooltip v-if="tag.length > max" :key="tag" :title="tag">
        <a-tag :key="tag" :closable="index !== 0" @close="() => handleClose(tag)">
          {{ `${tag.slice(0, max)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else :key="tag" closable @close="() => handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>
<script>
export default {
  name: 'TagInput',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    value: {
      handler () {
        this.tags = _.cloneDeep(this.value)
      },
      immediate: true
    }
  },
  methods: {
    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
      this.emitValue()
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    handleInputChange (e) {
      this.inputValue = e.target.value
    },
    handleInputConfirm () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
      this.emitValue()
    },
    emitValue () {
      this.$emit('change', this.tags)
      this.$emit('input', this.tags)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

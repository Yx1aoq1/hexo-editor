<template>
  <div ref="editor" :class="['markdown', {'markdown-fullscreen': fullscreen}]">
    <ul class="markdown-toolbars">
      <li>
        <slot name="title"/>
      </li>
      <li
        v-for="item in toolbars_"
        :key="item"
        :name="getToolName(item)"
        @click="handleToolbars(item, $event)">
        <template>
          <i :class="getToolClass(item)"></i>
        </template>
      </li>
      <slot name="custom-tool"></slot>
    </ul>
    <input class="hide" type="file" accept="image/*" ref="imageInput" @change="handleFileChange" />
    <div class="markdown-tip">
      <slot name="tip" />
    </div>
    <div class="markdown-content">
      <div
        class="codemirror"
        ref="codemirror"
        @mouseenter="mousescrollSide('left')">
      </div>
      <MPreview
        ref="preview"
        class="markdown-preview"
        v-if="previewShow"
        :content="currentValue"
        :codeNumbers="false"
        @scroll="previewScroll"
        @mouseenter="mousescrollSide('right')">
      </MPreview>
    </div>
  </div>
</template>
<script>
import CodeMirror from 'codemirror'
import TOOLBAR_MAP from '../config/toolbar'
import CODEMIRROR_CONFIG from '../config/codemirror'
import handlers from './handlers'
// 基础引入
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/meta.js'
import MPreview from '../preview/MPreview'
export default {
  name: 'MarkdownEditor',
  components: {
    MPreview
  },
  mixins: [handlers],
  props: {
    /**
    * markdown 内容 v-model绑定
    * @type {String}
    */
    value: {
      type: String,
      default: ''
    },
    /**
    * codemirror 配置
    * @type {Object}
    */
    cmOptions: {
      type: Object,
      default: () => ({})
    },
    /**
    * 工具栏显示
    * @type {Array}
    */
    toolbars: {
      type: Array,
      default: () => Object.keys(TOOLBAR_MAP)
    },
    /**
    * 是否开启预览
    * @type {Boolean}
    */
    preview: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editor: null, // 编辑器实例
      currentValue: this.value,
      options: {}, // codemirror 配置
      editorScrollHeight: 0, // 编辑区域高度
      scrollSide: '', // 哪侧滚动
      previewShow: true, // 是否开启预览
      fullscreen: false, // 是否全屏
      lastInsert: '', // 最后一次插入的内容
      toolbars_: []
    }
  },
  watch: {
    value () {
      const { value, currentValue } = this
      if (currentValue !== value) {
        this.currentValue = value
        this.editor.setOption('value', value)
      }
    },
    preview: {
      handler () {
        this.previewShow = this.preview
        if (!this.preview) {
          this.toolbars_ = this.toolbars.filter(item => item !== 'preview')
        } else {
          this.toolbars_ = _.cloneDeep(this.toolbars)
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.createEditor()
  },
  methods: {
    async createEditor () {
      this.options = Object.assign({}, CODEMIRROR_CONFIG, this.cmOptions)
      this.editor = new CodeMirror(this.$refs.codemirror, {
        value: this.currentValue,
        ...this.options
      })
      this.editorScrollHeight = this.editor.doc.height
      this.addEditorLintener()
      const modeName = typeof this.options.mode === 'string' ? this.options.mode : this.options.mode.name
      const mode = CodeMirror.findModeByName(modeName)
      const theme = this.options.theme
      // 动态引入
      try {
        await import(`codemirror/theme/${theme}.css`)
        if (mode && mode.mode) {
          await import(`codemirror/mode/${mode.mode}/${mode.mode}.js`)
        }
      } catch (__) {}
      this.$nextTick(() => {
        // 重新更新配置
        Object.keys(this.options).forEach((name) => {
          if (this.options[name] && JSON.stringify(this.options[name])) {
            this.editor.setOption(name, this.options[name])
          }
        })
      })
    },
    addEditorLintener () {
      this.editor.on('change', _.debounce(data => {
        this.currentValue = this.editor.getValue()
        const { doc: { height } } = data
        this.editorScrollHeight = height
        this.$emit('input', this.currentValue)
      }), 500)
      this.editor.on('scroll', this.markdownScroll)
    },
    mousescrollSide (type) {
      this.scrollSide = type
    },
    markdownScroll (data = {}) {
      if (this.scrollSide === 'left') {
        const { doc: { height, scrollTop } } = data
        const preview = this.$refs.preview.$refs.preview
        const contentHeight = preview.offsetHeight
        const previewScrollHeight = preview.scrollHeight
        preview.scrollTop = parseInt((scrollTop * (previewScrollHeight - contentHeight)) / (height - contentHeight), 0)
      }
    },
    previewScroll () {
      if (this.scrollSide === 'right') {
        const preview = this.$refs.preview.$refs.preview
        const contentHeight = preview.offsetHeight
        const previewScrollHeight = preview.scrollHeight
        const previewScrollTop = preview.scrollTop
        const scrollTop = parseInt((previewScrollTop * (this.editorScrollHeight - contentHeight)) / (previewScrollHeight - contentHeight), 0)
        this.editor.scrollTo(0, scrollTop)
      }
    },
    handleToolbars (type, e) {
      this.$emit(`on-${type}`, e)
      const handler = this[`handle${type.replace('-', '').replace(/^\S/, s => s.toUpperCase())}`]
      if (handler) {
        handler(e)
      }
    },
    getToolName (type) {
      const name = TOOLBAR_MAP[type]
      switch (type) {
      case 'preview':
        return this.previewShow ? `关闭${name}` : `开启${name}`
      case 'fullscreen':
        return this.fullscreen ? `退出${name}` : name
      default:
        return name
      }
    },
    getToolClass (type) {
      let iconClass = `icon-${type}`
      switch (type) {
      case 'preview':
        iconClass = this.previewShow ? 'icon-no-preview' : iconClass
        break
      case 'fullscreen':
        iconClass = this.fullscreen ? 'icon-exit' : iconClass
        break
      }
      return [
        'icon',
        iconClass
      ]
    }
  }
}
</script>
<style lang="less" scoped>
</style>

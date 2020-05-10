<template>
  <div
    :class="['markdown-preview', `markdown-theme-${theme}`]"
    ref="preview"
    v-html="html"
    v-on="$listeners">
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItIns from 'markdown-it-ins'
import Clipboard from 'clipboard'
import hljs from 'highlight.js'
import 'highlightjs-line-numbers.js'
export default {
  name: 'MarkdownPreview',
  props: {
    /**
    * markdown 内容
    * @type {String}
    */
    content: {
      type: String,
      default: ''
    },
    /**
    * markdown-it 配置
    * @type {Object}
    */
    markdownOptions: {
      type: Object,
      default: () => ({})
    },
    /**
    * 预览主题
    * @type {String}
    */
    theme: {
      type: String,
      default: 'light'
    },
    /**
    * 是否开启代码复制
    * @type {Boolean}
    */
    copyCode: {
      type: Boolean,
      default: true
    },
    /**
    * 代码复制按钮文本
    * @type {String}
    */
    copyBtnText: {
      type: String,
      default: '复制代码'
    },
    /**
    * 是否开启代码行显示
    * @type {Boolean}
    */
    codeLineNumbers: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      md: null,
      html: '',
      copyBtns: null
    }
  },
  watch: {
    content: {
      handler () {
        this.translateMarkdown()
      },
      immediate: true
    }
  },
  methods: {
    translateMarkdown () {
      if (!this.md) {
        this.md = new MarkdownIt({
          breaks: true,
          highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return this.getCodeHtml(str, hljs.highlight(lang, str, true).value)
              } catch (__) {}
            }
            return this.getCodeHtml(str, this.md.utils.escapeHtml(str))
          },
          ...this.markdownOptions
        })
          .use(MarkdownItIns)
          .use(MarkdownItAnchor, {
            slugify: s => s.trim().replace('.', '')
          })
      }
      this.html = this.md.render(this.content)
      this.$nextTick(() => {
        this.initCopyBtns()
        this.codeLineNumbers && this.initCodeLineNumbers()
      })
    },
    getCodeHtml (code, html) {
      if (this.copyCode) {
        return '<pre class="code-block hljs">' +
          `<span class="copy-code" data-clipboard-text="${code}">${this.copyBtnText}</span>` +
          `<code>${html}</code>` +
          '</pre>'
      } else {
        return `<pre class="hljs"><code>${html}</code></pre>`
      }
    },
    initCodeLineNumbers () {
      const element = this.$refs.preview
      const codeBlock = element.querySelectorAll('.hljs code')
      _.forEach(codeBlock, block => {
        hljs.lineNumbersBlock(block)
      })
    },
    initCopyBtns () {
      if (this.copyBtns) {
        this.copyBtns.destroy()
      }
      this.copyBtns = new Clipboard('.copy-code')
    }
  },
  destroyed () {
    this.copyBtns.destroy()
  }
}
</script>
<style lang="less" scoped>
</style>

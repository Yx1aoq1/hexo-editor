import { uuid } from '@/utils'

export default {
  props: {
    /**
    * codemirror 配置
    * @type {Object}
    */
    imageOption: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      uuid: uuid(),
      imageOption_: {}
    }
  },
  watch: {
    imageOption: {
      handler (newVal) {
        this.imageOption_ = _.merge({
          action: '',
          filename: 'file',
          beforeUpload: undefined,
          data: {},
          headers: {},
          withCredentials: false,
          response: (res) => res.url
        }, newVal)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    insertContent (content) {
      this.editor.replaceSelection(content)
      this.lastInsert = content.replace(/\n/g, '')
    },
    setCursor (line = 0, ch = 0) {
      this.editor.setCursor(line, ch)
      this.editor.focus()
    },
    handlePicture () {
      this.insertContent('![image](href)')
    },
    handlePictureupload () {
      this.$refs.imageInput.click()
    },
    handleFileChange (e) {
      const files = e.target.files
      _.forEach(files, file => {
        this.upload(file, files)
      })
    },
    upload (file, fileList) {
      const { beforeUpload } = this.imageOption_
      if (!beforeUpload) {
        return setTimeout(() => this.post(file), 0)
      }
      const before = beforeUpload(file, fileList)
      if (before !== false) {
        setTimeout(() => this.post(file), 0)
      }
    },
    post (file) {
      const { action, data, headers, withCredentials, response } = this.imageOption_
      let param = new FormData()
      param.append('file', file)
      console.log(this.imageOption_)
      if (data) {
        Object.keys(data).map(key => {
          param.append(key, data[key])
        })
      }
      this.$ajax.post(action, param, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers
        },
        withCredentials
      })
        .then(res => {
          const imageUrl = response(res)
          this.insertContent(`![](${imageUrl})`)
        })
    },
    handlePreview () {
      this.previewShow = !this.previewShow
    },
    handleFullscreen () {
      this.fullscreen = !this.fullscreen
    },
    handleBold () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('**' + selection + '**')
      } else {
        this.insertContent('****')
      }
    },
    handleItalic () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('*' + selection + '*')
      } else {
        this.insertContent('**')
      }
    },
    handleStrikethrough () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('~~' + selection + '~~')
      } else {
        this.insertContent('~~~~')
      }
    },
    handleUnderline () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('++' + selection + '++')
      } else {
        this.insertContent('++++')
      }
    },
    handleLine () {
      this.insertContent('\n\n----\n')
    },
    handleQuotes () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('\n>' + selection + '\n\n')
      } else {
        this.insertContent('\n>  ')
      }
    },
    handleList () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('\n- ' + selection + '\n\n')
      } else {
        this.insertContent('\n-  ')
      }
    },
    handleOrderlist () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('\n1. ' + selection + '\n\n')
      } else {
        this.insertContent('\n1.  ')
      }
    },
    handleCode () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('\n```\n' + selection + '\n```\n')
      } else {
        this.insertContent('\n```\n\n```\n')
      }
    },
    handleLink () {
      this.insertContent('[link](href)')
    },
    handleTable () {
      this.insertContent(
        '| header 1 | header 2 |\n| -------- | -------- |\n| row 1 col 1 | row 1 col 2 |\n'
      )
    },
    handleHeader () {
      const selection = this.editor.getSelection()
      if (selection) {
        this.insertContent('\n#' + selection + '\n')
      } else {
        this.insertContent('\n# ')
      }
    }
  }
}

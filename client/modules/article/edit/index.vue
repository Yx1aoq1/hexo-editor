<template>
  <a-form-model :model="editForm" layout="vertical" class="edit-form">
    <a-page-header
      class="page-header"
      :ghost="false"
      @back="goback">
      <template slot="title">
        <a-form-model-item label="">
          <a-input v-model="editForm.title" placeholder="Title" />
        </a-form-model-item>
      </template>
      <template slot="extra">
        <a-button type="primary" @click="handleSave('posts')">Publish</a-button>
        <a-button @click="handleSave('drafts')">Stash</a-button>
        <a-button @click="goback">Cancel</a-button>
      </template>
    </a-page-header>
    <div class="panel">
      <div class="panel-left">
        <a-form-model-item label="">
          <date-picker
            v-model="editForm.date"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Date">
          </date-picker>
        </a-form-model-item>
        <a-form-model-item label="">
          <a-input v-model="editForm.categories" placeholder="Categories" />
        </a-form-model-item>
        <a-form-model-item label="">
          <tag-input v-model="editForm.tags"></tag-input>
        </a-form-model-item>
      </div>
      <div class="panel-right">
        <a-form-model-item label="">
          <markdown-editor v-model="editForm.content"></markdown-editor>
        </a-form-model-item>
      </div>
    </div>
  </a-form-model>
</template>
<script>
import { MarkdownEditor } from '@/components/base/markdown'
import { DatePicker } from '@/components/antd/datePicker'
import { TagInput } from '@/components/antd/tagInput'
export default {
  name: 'ArticleEdit',
  components: {
    MarkdownEditor,
    DatePicker,
    TagInput
  },
  data () {
    return {
      workspace: this.$route.params.workspace,
      editForm: {
        key: this.$route.params.key,
        title: 'Untitled',
        categories: '',
        tags: [],
        date: +new Date(),
        content: ''
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$api['article/detail']({
        id: this.editForm.key
      })
        .then(res => {
          this.editForm = res.data
        })
    },
    handleSave (target) {
      this.$api['article/save']({
        id: this.editForm.key,
        origin: this.workspace,
        target
      })
        .then(res => {
          this.$message.success(res.message)
        })
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.edit-form {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.page-header {
  margin: -24px -24px 0 -24px
}
.panel {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: ~"calc(100% - 70px)";
  &-left {
    width: 215px;
    height: 100%;
    border-right: 1px solid #d9d9d9;
    padding-right: 20px;
  }
  /deep/ &-right {
    padding-left: 20px;
    flex: 1;
    width: 100%;
    height: 100%;
    .ant-form-item, .ant-form-item-control-wrapper, .ant-form-item-control{
      height: 100%;
    }
  }
}
</style>

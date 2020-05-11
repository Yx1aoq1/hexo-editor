<template>
  <div>
    <div class="clearfix">
      <a-button type="primary" class="pull-right" @click="handleAdd">+ Add</a-button>
    </div>
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="handleEdit(item)">Edit</a>
        <a v-if="workspace !== 'posts'" slot="actions" @click="handleMove('posts', item)">Publish</a>
        <a v-if="workspace !== 'drafts'" slot="actions" @click="handleMove('drafts', item)">Stash</a>
        <a v-if="workspace !== 'trash'" slot="actions" @click="handleMove('trash', item)">Discard</a>
        <a v-if="workspace === 'trash'" slot="actions" @click="handleDelete(item)">Delete</a>
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <div slot="description">
            <a-icon type="folder" /> {{item.categories}}
            <a-icon class="mg-l10" type="tag" /> {{item.tags | tags}}
          </div>
        </a-list-item-meta>
        <div>{{item.date | date}}</div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { timeFormatter } from '@/utils'
export default {
  name: 'ArticleList',
  components: {
  },
  props: {
  },
  data () {
    return {
      workspace: '',
      data: []
    }
  },
  filters: {
    tags (value) {
      return value.join(',')
    },
    date (value) {
      return timeFormatter(value)
    }
  },
  watch: {
    $route: {
      handler () {
        this.workspace = this.$route.path.slice(1)
        this.getList()
      },
      immediate: true
    }
  },
  methods: {
    getList () {
      this.$api['article/list']({
        workspace: this.workspace
      })
        .then(res => {
          this.data = res.data
        })
    },
    handleAdd () {
      this.$router.push({
        name: 'ADD'
      })
    },
    handleEdit (item) {
      this.$router.push({
        name: 'EDIT',
        params: {
          key: item.key,
          workspace: this.workspace
        }
      })
    },
    handleMove (target, item) {
      this.$api['article/move']({
        id: item.key,
        origin: this.workspace,
        target
      })
        .then((res) => {
          this.$message.success(res.message)
          this.getList()
        })
    },
    handleDelete (item) {
      this.$confirm({
        title: 'Do you want to delete this article?',
        content: 'When clicked the OK button, source file will be delete',
        onOk: () => {
          this.$api['article/deleteSource']({
            id: item.key
          })
            .then((res) => {
              this.$message.success(res.message)
              this.getList()
            })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

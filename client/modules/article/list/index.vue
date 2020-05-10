<template>
  <div>
    <div class="clearfix">
      <a-button type="primary" class="pull-right" @click="handleAdd">+ Add</a-button>
    </div>
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="handleEdit(item)">Edit</a>
        <a v-if="workspace !== 'posts'" slot="actions" @click="handleActions('publish', item)">Publish</a>
        <a v-if="workspace !== 'drafts'" slot="actions" @click="handleActions('stash', item)">Stash</a>
        <a v-if="workspace !== 'trash'" slot="actions" @click="handleActions('delete', item)">Discard</a>
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
          key: item.key
        }
      })
    },
    handleActions (type, item) {
      this.$api[`article/${type}`]({
        id: item.key,
        workspace: this.workspace
      })
        .then((res) => {
          this.$message.success(res.message)
          this.getList()
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

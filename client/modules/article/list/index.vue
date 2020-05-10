<template>
  <div>
    <div class="clearfix">
      <a-button type="primary" class="pull-right" @click="handleAdd">+ Add</a-button>
    </div>
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="handleEdit(item)">Edit</a>
        <a slot="actions">Stash</a>
        <a slot="actions">Discard</a>
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
      routerType: '',
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
        this.routerType = this.$route.path.slice(1)
        this.getList()
      },
      immediate: true
    }
  },
  methods: {
    getList () {
      this.$api['article/list']({
        workspace: this.routerType
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
    }
  }
}
</script>
<style lang="less" scoped>
</style>

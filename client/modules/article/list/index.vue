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
            <a-icon class="mg-l10" type="tag" /> {{item.tags.join(', ')}}
          </div>
        </a-list-item-meta>
        <div>{{item.date}}</div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { uuid } from '@/utils'
export default {
  name: 'ArticleList',
  components: {
  },
  props: {
  },
  data () {
    return {
      routerType: '',
      data: [
        {
          id: 1,
          title: 'Vue之keep-alive使用指南',
          categories: 'vue',
          tags: ['a', 'b', 'c'],
          date: '2020-10-10'
        },
        {
          id: 2,
          title: 'Vue之keep-alive使用指南',
          categories: 'vue',
          tags: ['a', 'b', 'c'],
          date: '2020-10-10'
        },
        {
          id: 3,
          title: 'Vue之keep-alive使用指南',
          categories: 'vue',
          tags: ['a', 'b', 'c'],
          date: '2020-10-10'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler () {
        this.routerType = this.$route.path.slice(1)
      },
      immediate: true
    }
  },
  methods: {
    handleAdd () {
      this.$router.push({
        name: 'ADD',
        params: {
          id: uuid()
        }
      })
    },
    handleEdit (item) {
      this.$router.push({
        name: 'EDIT',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

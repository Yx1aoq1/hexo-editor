<template>
  <div>
    {{routerType}}
  </div>
</template>
<script>
export default {
  name: 'Post',
  components: {
  },
  props: {
  },
  data () {
    return {
      routerType: ''
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
  }
}
</script>
<style lang="less" scoped>
</style>

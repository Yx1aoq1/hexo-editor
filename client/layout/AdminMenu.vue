<template>
  <a-menu
    theme="dark"
    mode="inline"
    :selectedKeys="[currentMenu]"
    @click="handleMenuClick">
    <template v-for="item in menus">
      <a-menu-item v-if="item.show" :key="item.code">
        <a-icon :type="item.icon" />
        <span>{{item.name}}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      menus: window.globalConfig.menu
    }
  },
  computed: {
    currentMenu () {
      const currentRouter = this.$route.name
      const targetMenu = this.menus.find(item => item.url === currentRouter)
      if (targetMenu && targetMenu.show) {
        return targetMenu.code
      } else {
        return null
      }
    }
  },
  methods: {
    handleMenuClick (value) {
      const targetMenu = this.menus.find(item => item.code === value.key)
      this.$router.push({
        name: targetMenu.url
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>

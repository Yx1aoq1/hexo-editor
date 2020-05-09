<template>
  <a-menu
    theme="dark"
    mode="inline"
    :default-selected-keys="[menus[0].code]"
    @click="handleMenuClick">
    <a-menu-item v-for="item in menus" :key="item.code">
      <a-icon :type="item.icon" />
      <span>{{item.name}}</span>
    </a-menu-item>
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

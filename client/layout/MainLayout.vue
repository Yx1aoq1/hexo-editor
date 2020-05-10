<template>
  <a-layout class="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <admin-menu></admin-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view/>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import AdminMenu from './AdminMenu'
export default {
  name: 'Main',
  components: {
    AdminMenu
  },
  data () {
    return {
      collapsed: false
    }
  }
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  &-header {
    background: #fff;
    padding: 0;
  }
  &-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
    overflow: hidden;
    height: 100%;
  }
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

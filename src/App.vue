<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    attachEvents () {
      global.vbus.$on('global.$Message.error', (msg) => {
        this.$Message.error({
          content: msg,
          duration: 3
        })
      })
      global.vbus.$on('global.$Message.success', (msg) => {
        this.$Message.success(msg)
      })
      global.vbus.$on('global.$Message.destroy', () => {
        this.$Message.destroy()
      })
    }
  },
  created () {
    this.attachEvents()
  }
}
</script>

<style>
</style>

<template>
  <div>
    hello mycomponent
  </div>
</template>

<script>
import store from './store'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('pageA', ['aaa', 'bbb', 'ccc'])
  },
  beforeRouteEnter (to, from, next) {
    store.install()
    next()
  },
  beforeRouteLeave (to, from, next) {
    store.uninstall()
    next()
  }
}
</script>

<style scoped>

</style>

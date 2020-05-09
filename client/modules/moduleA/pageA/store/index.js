import Store from '@/plugins/store'
import actions from './actions'
import moduleA from './childrenAModule'
import moduleB from './childrenBModule'

export default {
  install () {
    Store.registerModule(['pageA'], {
      actions,
      modules: {
        moduleA,
        moduleB
      },
      namespaced: true
    })
  },
  uninstall () {
    Store.unregisterModule(['pageA'])
  }
}

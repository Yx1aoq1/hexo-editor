import api from '@/plugins/api'

export default {
  updateUserInfo ({ commit }) {
    api['common/userInfo']().then(data => {
      commit('setUserName', data.userName)
    })
  }
}

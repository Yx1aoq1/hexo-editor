<template>
  <div>
    <a-card title="Login" class="card-wrap">
      <a-form-model :model="editForm" layout="vertical" @submit="handleSubmit" @submit.native.prevent>
        <a-form-item>
          <a-input v-model="editForm.username" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="editForm.password"  type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="editForm.username === '' || editForm.password === ''"
            block
          >
            Log in
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>
<script>
import { md5 } from '@/utils'
export default {
  name: 'Login',
  data () {
    return {
      editForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$api['user/login']({
        username: this.editForm.username,
        password: md5(this.editForm.password, this.$const['APP/MD5_SUFFIX'])
      })
        .then(res => {
          this.$message.success(res.message)
          this.$store.commit('setUserInfo', res.data)
          this.$router.push({
            name: 'HOME-POSTS'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
.card-wrap {
  width: 350px;
  margin: 50px auto;
}
</style>

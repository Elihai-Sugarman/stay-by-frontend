<template>
  <div class="login-signup">
    <header class="auth-header divider">
      <div>{{ submitBtnText }}</div>
    </header>

    <div class="form-container">
      <el-form :model="credentials" label-position="top" :disabled="isLoading">
        <el-form-item label="Fullname" class="w-100" required v-if="!isLoginPage">
          <el-input v-model="credentials.fullname" />
        </el-form-item>
  
        <el-form-item label="Username" class="w-100" required>
          <el-input v-model="credentials.username" />
        </el-form-item>
  
        <el-form-item label="Password" class="w-100" required>
          <el-input type="password" v-model="credentials.password" />
        </el-form-item>
    
        <branded-btn @click="handleSubmit">
          <el-button class="submit-btn" :loading="isLoading">{{ submitBtnText }}</el-button>
        </branded-btn>

        <el-divider>or</el-divider>

        <el-button @click="handleDemoLogin" v-if="isLoginPage" class="demo-btn" :loading="isLoading">Log in as Demo User</el-button>

        <!-- <GoogleLogin
          :client-id="googleClientId"
          :callback="handleGoogleLogin"
          :error="handleGoogleError"
        /> -->

      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { GoogleLogin } from 'vue3-google-login'
const GOOGLE_CLIENT_ID = ''

import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  props: { isLoginPage: Boolean },
  components: {
    imgUploader,
    GoogleLogin
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        fullname: ''
      },
      isLoading: false
    }
  },
  computed: {
    submitBtnText() {
      return this.isLoginPage ? 'Log in' : 'Sign up'
    },
    googleClientId() {
      return GOOGLE_CLIENT_ID
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      const action = this.isLoginPage ? this.doLogin : this.doSignup
      await action()

      this.isLoading = false
    },
    handleGoogleLogin(res) {
      console.log('res', res)
    },
    handleGoogleError(err) {
      console.log('err', err)
    },
    handleDemoLogin() {
      this.credentials = {
        username: 'Demo',
        password: '123456'
      }

      this.handleSubmit()
    },
    async doLogin() {
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.credentials })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        ElMessage.error('invalid username or password')
      }
    },
    async doSignup() {
      try {
        await this.$store.dispatch({ type: 'signup', userCred: this.credentials })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        ElMessage.error('failed to signup')
      }
    }
  }
}
</script>
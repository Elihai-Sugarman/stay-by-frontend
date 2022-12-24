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

        <el-form-item class="w-100" v-if="!isLoginPage" v-loading="isUploading">
          <el-upload class="w-100" ref="upload"
            list-type="picture"
            :http-request="handleImgUpload"
            :on-exceed="handleUploadExceed"
            :on-remove="clearUploadedImgs"
            :limit="1">
            <template #trigger>
              <el-button type="primary" :loading="isUploading">Upload a profile photo</el-button>
            </template>
          </el-upload>
        </el-form-item>

        <branded-btn @click="handleSubmit">
          <el-button class="submit-btn" :loading="isLoading">{{ submitBtnText }}</el-button>
        </branded-btn>

        <el-divider>or</el-divider>

        <el-button @click="handleDemoLogin" v-if="isLoginPage" class="demo-btn" :loading="isLoading">Demo
          login</el-button>

        <router-link to="/login" v-if="!isLoginPage">
          <el-button class="w-100">Log in</el-button>
        </router-link>

        <router-link to="/signup" v-else>
          <el-button class="w-100">Sign up</el-button>
        </router-link>

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
import { ElMessage, genFileId } from 'element-plus'
import { GoogleLogin } from 'vue3-google-login'
const GOOGLE_CLIENT_ID = ''

import { socketService } from '../services/socket.service'
import { uploadService } from '../services/upload.service'
import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  props: {
    isLoginPage: Boolean,
    redirectOnSuccess: {
      default: true,
      type: Boolean
    }
  },
  components: {
    imgUploader,
    GoogleLogin
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        fullname: '',
        imgUrl: ''
      },
      isLoading: false,
      isUploading: false
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
    handleImgUpload({ file }) {
      this.isUploading = true

      return uploadService.uploadImg(file)
        .then(({ url }) => {
          // save url to imgUrl
          this.credentials.imgUrl = url
        })
        .finally(() => this.isUploading = false)
    },
    clearUploadedImgs() {
      this.$refs.upload?.clearFiles()
      this.credentials.imgUrl = ''
    },
    handleUploadExceed(files) {
      this.clearUploadedImgs()

      const file = files[0]
      file.uid = genFileId()
      this.$refs.upload?.handleStart(file)
      this.$refs.upload?.submit()
    },
    async handleSubmit() {
      this.isLoading = true
      try {
        const action = this.isLoginPage ? this.doLogin : this.doSignup
        const user = await action()

        socketService.login(user._id)
        this.redirectOnSuccess && this.$router.push('/')
      } catch (err) {
        console.log('err', err)
        ElMessage.error(err.response.data.err)
      } finally {
        this.isLoading = false
      }
    },
    handleGoogleLogin(res) {
      console.log('res', res)
    },
    handleGoogleError(err) {
      console.log('err', err)
    },
    handleDemoLogin() {
      this.credentials = {
        username: 'moshene',
        password: '36133410'
      }

      this.handleSubmit()
    },
    doLogin() {
      return this.$store.dispatch({ type: 'login', userCred: this.credentials })
    },
    doSignup() {
      return this.$store.dispatch({ type: 'signup', userCred: this.credentials })
    }
  }
}
</script>
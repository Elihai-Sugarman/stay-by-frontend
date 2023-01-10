<template>
  <section class="stay-edit">
    <el-form :model="stayToEdit" label-position="top" :disabled="isLoading">

      <el-form-item label="Name" class="w-100">
        <el-input v-model="stayToEdit.name" placeholder="Name" />
      </el-form-item>

      <!-- Address -->
      <el-form-item label="Address" class="w-100">
        <el-col :span="6">
          <el-input v-model="stayToEdit.address.city" placeholder="City" />
        </el-col>
        <el-col :offset="1" :span="5">
          <el-input v-model="stayToEdit.address.country" placeholder="Country" />
        </el-col>
        <el-col :offset="1" :span="11">
          <el-input v-model="stayToEdit.address.street" placeholder="Street" />
        </el-col>
      </el-form-item>

      <!-- Upload -->
      <el-form-item class="w-100">
        <el-upload class="w-100"
          :http-request="handleImgUpload"
          :on-remove="handleImgRemove"
          list-type="picture"
          v-model:file-list="uploadedImgs"
          drag multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </el-upload>
      </el-form-item>

      <!-- Capacity, Bedrooms, Bathrooms -->
      <el-row class="w-100">

        <el-col :span="8">
          <el-form-item label="Capacity">
            <el-input type="number" v-model="stayToEdit.capacity" />
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="7">
          <el-form-item label="Bedrooms">
            <el-input type="number" v-model="stayToEdit.bedrooms" />
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="7">
          <el-form-item label="Bathrooms">
            <el-input type="number" v-model="stayToEdit.bathrooms" />
          </el-form-item>
        </el-col>

      </el-row>

      <!-- Labels -->
      <el-row class="w-100">

        <el-col :span="8">
          <el-form-item label="Labels" class="w-100">
            <el-select
              placeholder="Select labels"
              class="w-100"
              v-model="stayToEdit.labels"
              multiple>
              <el-option
                v-for="label in labelOptions"
                :key="label"
                :label="label"
                :value="label"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :xs="10" :sm="7">
          <el-form-item label="Property type">
            <el-select
              placeholder="Select room type"
              class="w-100"
              v-model="stayToEdit.roomType">
              <el-option value="Private room" label="Private room" />
              <el-option value="Entire home/apt" label="Entire home/apt" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :xs="4" :sm="7">
          <el-form-item label="Price">
            <el-input type="number" v-model="stayToEdit.price" />
          </el-form-item>
        </el-col>

      </el-row>

      <!-- Amenities -->
      <el-form-item label="Amenities" class="w-100">
        <el-select
          placeholder="Select amenities"
          class="w-100"
          v-model="stayToEdit.amenities"
          multiple>
          <el-option
            v-for="amenity in amenitiesOptions"
            :key="amenity"
            :label="amenity"
            :value="amenity"
          />
        </el-select>
      </el-form-item>

      <!-- Description -->
      <el-form-item label="Description" class="w-100">
        <el-input type="textarea" v-model="stayToEdit.summary" placeholder="Description" rows="5" />
      </el-form-item>
    
      <div class="w-100 flex justify-center">
        <div class="w-25">
          <branded-btn @click="saveStay">Save</branded-btn>
        </div>
      </div>
    </el-form>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import { stayService } from '../../services/stay.service'
import { utilService } from '../../services/util.service'
import { uploadService } from '../../services/upload.service'
import { getActionAddStay, getActionUpdateStay } from '../../store/stay.store'

export default {
  components: { UploadFilled },
  data() {
    return {
      stayToEdit: stayService.getEmptyStay(),
      isLoading: false,
      uploadedImgs: []
    }
  },
  computed: {
    stayId() {
      return this.$route.params.id
    },
    user() {
      return this.$store.getters.loggedInUser
    },
    amenitiesOptions() {
      return stayService.amenities
    },
    labelOptions() {
      return stayService.labels
    }
  },
  created() {
    this.stayId && this.loadStay()
  },
  methods: {
    loadStay() {
      this.isLoading = true
      stayService.getById(this.stayId)
        .then(stay => {
          this.stayToEdit = stay
          this.uploadedImgs = stay.imgUrls
            .map((url, idx) => ({ name: idx + 1, url }))
        })
        .catch(() => ElMessage.error('Failed to load listing!'))
        .finally(() => this.isLoading = false)
    },
    async saveStay() {
      this.isLoading = true

      let action = this.addStay
      if (this.stayId) action = this.updateStay

      try {
        const res = await action()
        console.log('res', res)
        ElMessage.success('The listing saved successfully!')
        this.$router.push('/dashboard/listings')

      } catch (err) {
        ElMessage.error('Failed to save the listing')
      } finally {
        this.isLoading = false
      }
    },
    addStay() {
      const stayToSave = utilService.deepCopy(this.stayToEdit)
      stayToSave.host = this.user
      return this.$store.dispatch(getActionAddStay(this.stayToEdit))
    },
    updateStay() {
      return this.$store.dispatch(getActionUpdateStay(this.stayToEdit))
    },
    handleImgUpload({ file }) {
      return uploadService.uploadImg(file)
        .then(({ url }) => {
          // remove the added file
          const idx = this.uploadedImgs.findIndex(({ uid }) => file.uid === uid)
          this.uploadedImgs.splice(idx, 1)

          // push the new uploaded file
          const lastIdx = this.uploadedImgs.length + 1
          this.uploadedImgs.push({ name: lastIdx, url })

          // save url to stayToEdit
          this.stayToEdit.imgUrls.push(url)
        })
    },
    handleImgRemove({ url, uid }) {
      const idx = this.uploadedImgs.findIndex(img => img.uid === uid)
      this.uploadedImgs.splice(idx, 1)

      const stayImgIdx = this.stayToEdit.imgUrls.indexOf(url)
      this.stayToEdit.imgUrls.splice(stayImgIdx, 1)
    }
  }
}
</script>

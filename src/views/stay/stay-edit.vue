<template>
  <section class="stay-edit">
    <el-form :model="stayToEdit" label-width="200">

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
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          drag
          multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <!-- Test -->
      <el-form-item label="Test" class="w-100">
        <el-col :span="12">
          <el-input v-model="stayToEdit.capacity" placeholder="Capacity" />
        </el-col>
        <el-col :offset="1" :span="11">
          <el-input v-model="stayToEdit.bedrooms" placeholder="Bedrooms" />
        </el-col>
        <el-col :span="12">
          <el-input v-model="stayToEdit.bathrooms" placeholder="Bathrooms" />
        </el-col>
        <el-col :offset="1" :span="11">
          <el-input v-model="stayToEdit.price" placeholder="Price" />
        </el-col>
      </el-form-item>

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

      <!-- Labels -->
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

      <!-- Description -->
      <el-form-item label="Description" class="w-100">
        <el-input type="textarea" v-model="stayToEdit.summary" placeholder="Description" />
      </el-form-item>
    
    </el-form>
  </section>
</template>

<script>
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import { stayService } from '../../services/stay.service.local'
import { utilService } from '../../services/util.service'
import { getActionAddStay, getActionUpdateStay } from '../../store/stay.store'
import { amenitiesArray } from '../../../temp-data/amenities'

export default {
  components: { UploadFilled },
  data() {
    return {
      stayToEdit: stayService.getEmptyStay(),
      isLoading: false
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
      return amenitiesArray
    },
    labelOptions() {
      return this.$store.getters.labels
    }
  },
  created() {
    this.stayId && this.loadStay()
  },
  methods: {
    loadStay() {
      this.isLoading = true
      stayService.getById(this.stayId)
        .then(stay => this.stayToEdit = stay)
        .catch(() => ElMessage.error('Failed to load listing!'))
        .finally(() => this.isLoading = false)
    },
    async saveStay() {
      this.isLoading = true

      let action = this.addStay
      if (this.stayId) action = this.updateStay

      try {
        await action()
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
    }
  }
}
</script>

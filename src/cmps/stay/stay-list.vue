<template>
  <ul class="stay-list">
    <stay-preview v-for="stay in stays" :stay="stay" :key="stay._id" />
    <el-skeleton class="skeleton-preview" v-for="n in 30" :loading="isLoading" animated>
      <template #template>
        <div style="padding: 14px">
          <el-skeleton-item variant="image" class="skeleton-img" />
          <div class="flex justify-between" style="margin-top: 10px;">
            <el-skeleton-item variant="text" style="width: 60%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
          </div>
          <div class="w-100">
            <el-skeleton-item style="width: 65%;" />
          </div>
          <div class="w-100">
            <el-skeleton-item style="width: 25%;" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </ul>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
// import { getActionRemoveStay, getActionUpdateStay, getActionAddStayMsg } from '../../store/test.store'
import stayPreview from './stay-preview.vue'

export default {
  props: {
    stays: Array
  },
  components: {
    stayPreview
  },
  computed: {
    isLoading() {
      return this.$store.getters.isStaysLoading
    }
  },
  methods: {
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = { ...stay }
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))
        showSuccessMsg('Stay updated')

      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    }
  }
}
</script>
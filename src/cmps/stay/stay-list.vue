<template>
  <ul class="stay-list">
    <stay-preview v-for="stay in stays" :stay="stay" :key="stay._id" />
    <el-skeleton class="stay-preview" v-for="n in 30" :loading="isLoading" animated>
      <template #template>
        <div style="border-radius: 5%;">
          <el-skeleton-item variant="rect" style="height: 250px; border-radius: 5%;" />
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
import stayPreview from './stay-preview.vue'

export default {
  props: {
    stays: Array
  },
  components: {
    stayPreview
  },
  created() {
    window.addEventListener('scroll', this.onScrollDown)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScrollDown)
  },
  computed: {
    isLoading() {
      return this.$store.getters.isStaysLoading
    },
    staysCount() {
      return this.$store.getters.stays.length
    },
    totalStays() {
      return this.$store.getters.totalStays
    }
  },
  methods: {
    onScrollDown() {
      if (this.staysCount >= this.totalStays) return

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreStays()
      }
    },
    loadMoreStays() {
      this.$store.dispatch({ type: 'loadMoreStays', skip: this.stays.length })
    },
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
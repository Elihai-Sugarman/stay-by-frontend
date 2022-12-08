<template>
  <section class="dates-modal" v-if="open" @click.stop v-outside-click="() => $emit('close')">

    <!-- <div class="choose">
      <button>Choose dates</button>
    </div> -->

    <v-date-picker
      v-model="checkDates"
      :columns="columnsNum"
      is-range
      is-expanded
      :masks="masks"
    />
  </section>
</template>

<script>
export default {
  props: { open: Boolean },
  emits: ['change', 'close'],
  data() {
    return {
      columnsNum: 1,
      checkDates: {},
      masks: { weekdays: 'WW' }
    }
  },
  watch: {
    checkDates: {
      handler(dates) {
        this.$emit('change', {
          checkIn: dates.start,
          checkOut: dates.end
        })
      },
      deep: true
    }
  },
  created(){
    if (window.innerWidth > 800) this.columnsNum = 2
  },
}
</script>
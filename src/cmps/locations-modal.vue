<template>
  <section class="locations-modal" :class="modalGap" v-if="open" @click.stop v-outside-click="() => $emit('close')">

    <ul class="location-list" v-if="locations.length > 0 && !loading">
      <li v-for="loc in locations" @click="handleSelect(loc)">
        <div class="icon-wrapper">
          <icon-cmp icon-type="location" />
        </div>
        <span>{{ loc }}</span>
      </li>
    </ul>
    <div class="location-spinner-container" v-else-if="loading">
      <div class="location-spinner"></div>
    </div>

    <div class="region-container" v-if="!hideRegion">
      <div class="title">Search by region</div>
      <div class="regions">
        <div class="region" v-for="region in regions">
          <img :src="region.imgUrl" :alt="region.label" @click="handleSelect(region.label)" />
          <span>{{ region.label }}</span>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    open: Boolean,
    locations: Array,
    hideRegion: Boolean,
    loading: Boolean
  },
  emits: ['change', 'close'],
  data() {
    return {
      regions: [
        {
          label: 'I’m flexible',
          imgUrl: 'https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg'
        },
        {
          label: 'Middle East',
          imgUrl: 'https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320'
        },
        {
          label: 'Italy',
          imgUrl: 'https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320'
        },
        {
          label: 'United States',
          imgUrl: 'https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320'
        },
        {
          label: 'France',
          imgUrl: 'https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320'
        },
        {
          label: 'South America',
          imgUrl: 'https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320'
        }
      ]
    }
  },
  computed: {
    modalGap() {
      return {
        'modal-gap': !this.hideRegion
      }
    }
  },
  methods: {
    handleSelect(location) {
      this.$emit('change', location)
      this.$emit('close')
    }
  }
}
</script>
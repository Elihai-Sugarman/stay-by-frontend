<template>
  <section class="guest-modal" v-if="open" @click.stop>
    <div v-for="[title, guest] in Object.entries(options)" :id="title" class="guest-option">
      <div class="description">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ guest.subtitle }}</div>
      </div>

      <div class="guest-actions">
        <button type="button" @click="$emit('decrement', title)" :disabled="!guest.capacity">
          <icon-cmp icon-type="minus" />
        </button>
        <span>{{ guest.capacity }}</span>
        <button type="button" @click="$emit('increment', title)" :disabled="(guest.capacity === guest.maxCapacity)">
          <icon-cmp icon-type="plus" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // options: {
  //   Adults: {
  //     subtitle: 'Ages 13 or above',
  //     capacity: 0
  //   },
  //   Children: {
  //     subtitle: 'Ages 2–12',
  //     capacity: 0
  //   },
  //   Infants: {
  //     subtitle: 'Under 2',
  //     capacity: 0
  //   },
  //   Pets: {
  //     subtitle: 'Bringing a service animal?',
  //     capacity: 0
  //   }
  // }
  props: { options: Object, open: Boolean },
  emits: ['increment', 'decrement']
}
</script>
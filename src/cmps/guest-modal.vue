<template>
  <section class="guest-modal" v-if="open" @click.stop v-outside-click="() => $emit('close')">
    <div v-for="[title, guest] in Object.entries(guestsOptions)" :id="title" class="guest-option">
      <div class="description">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ guest.subtitle }}</div>
      </div>

      <div class="guest-actions">
        <button type="button" @click="handleGuestSelect(title, false)" :disabled="!guest.capacity">
          <icon-cmp icon-type="minus" />
        </button>
        <span>{{ guest.capacity }}</span>
        <button type="button" @click="handleGuestSelect(title, true)" :disabled="(guest.capacity === guest.maxCapacity)">
          <icon-cmp icon-type="plus" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
  props: { open: Boolean },
  emits: ['change', 'close'],
  data() {
    return {
      guestsOptions: {
        Adults: {
          type: 'Adults',
          subtitle: 'Ages 13 or above',
          capacity: 0,
          maxCapacity: 16
        },
        Children: {
          type: 'Children',
          subtitle: 'Ages 2–12',
          capacity: 0,
          maxCapacity: 15
        },
        Infants: {
          type: 'Infants',
          subtitle: 'Under 2',
          capacity: 0,
          maxCapacity: 5
        },
        Pets: {
          type: 'Pets',
          subtitle: 'Bringing a service animal?',
          capacity: 0,
          maxCapacity: 5
        }
      }
    }
  },
  methods: {
    handleGuestSelect(type, isIncrement) {
      const guestOption = this.guestsOptions[type]

      if (isIncrement) guestOption.capacity++
      else guestOption.capacity--

      // [{ type, capacity }, ...etc]
      const mappedGuests = Object.keys(this.guestsOptions)
        .filter(key => this.guestsOptions[key].capacity > 0)
        .map(key => this.guestsOptions[key])
        .map(({ type, capacity }) => ({ type, capacity }))

      this.$emit('change', utilService.deepCopy(mappedGuests))
    }
  }
}
</script>
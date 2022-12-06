<template>
  <section class="guest-modal" v-if="open" @click.stop v-outside-click="() => $emit('close')">
    <div v-for="guest in guestsOptions" :id="guest.type" class="guest-option">
      <div class="description">
        <div class="title">{{ guest.type }}</div>
        <div class="subtitle">{{ guest.subtitle }}</div>
      </div>

      <div class="guest-actions">
        <button
          type="button"
          @click="handleGuestSelect(guest.type, false)"
          :disabled="(!guest.capacity || (guest.capacity === initialAdultCapacity && guest.type === 'Adults'))">
          <icon-cmp icon-type="minus" />
        </button>
        <span>{{ guest.capacity }}</span>
        <button
          type="button"
          @click="handleGuestSelect(guest.type, true)"
          :disabled="(guest.capacity === guest.maxCapacity)">
          <icon-cmp icon-type="plus" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
  props: {
    open: Boolean,
    initialAdultCapacity: Number
  },
  emits: ['change', 'close'],
  data() {
    return {
      guestsOptions: {
        adults: {
          type: 'Adults',
          subtitle: 'Ages 13 or above',
          capacity: this.initialAdultCapacity || 0,
          maxCapacity: 16
        },
        children: {
          type: 'Children',
          subtitle: 'Ages 2–12',
          capacity: 0,
          maxCapacity: 15
        },
        infants: {
          type: 'Infants',
          subtitle: 'Under 2',
          capacity: 0,
          maxCapacity: 5
        },
        pets: {
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
      const guestOption = this.guestsOptions[type.toLowerCase()];

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
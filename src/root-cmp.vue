<template>
  <section class="main-layout" :class="pageClassLayout">
    <app-header />
    <router-view />
    <!-- <app-footer />  -->
    <!-- cuz miriam does't like footer :) will uncomment in future -->
    <mobile-footer/>
    <user-msg />
  </section>
</template>

<script>
import { userService } from './services/user.service'
import { orderService } from './services/order.service'
import { store } from './store/store'

import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'
import userMsg from './cmps/user-msg.vue'
import mobileFooter from './cmps/mobile-footer.vue'

export default {
  components: {
    appHeader,
    appFooter,
    userMsg,
    mobileFooter
  },
  created() {
    // store.dispatch({type: 'loadOrders'})
    // orderService.query()
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  computed: {
    pageClassLayout() {
      console.log('route', this.$route.name);
      return {
        'stay-layout': this.$route.name === 'stay-app',
        'smaller-layout': this.$route.name === 'stay-details' || 
                          this.$route.name === 'order-details'
      }
    }
  }
}
</script>
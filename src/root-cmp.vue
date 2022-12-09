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
import { ElNotification } from 'element-plus'
import { userService } from './services/user.service'
import { socketService, SOCKET_EVENT_ORDER_ADD, SOCKET_EVENT_ORDER_STATUS } from './services/socket.service'
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
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })

    // add listener in delay
    setTimeout(() => {
      socketService.on(SOCKET_EVENT_ORDER_ADD, this.notifyHost)
      socketService.on(SOCKET_EVENT_ORDER_STATUS, this.notifyStatus)
    }, 1000)
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
  },
  methods: {
    notifyHost({ renter }) {
      ElNotification({
        title: 'Reservation',
        message: 'New reservation received from ' + renter.fullname,
        type: 'info'
      })
    },
    notifyStatus({ status, host, stay }) {
      const type = status === 'approved' ? 'success' : 'warning'
      ElNotification({
        title: 'Trip status',
        message: `${host.fullname} ${status} your trip at ${stay.name}`,
        type
      })
    },
  }
}
</script>
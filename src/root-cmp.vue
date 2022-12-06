<template>
  <section class="main-layout">
    <app-header />
    <router-view />
    <!-- <app-footer />  -->
    <!-- cuz miriam does't like footer :) will uncomment in future -->
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

export default {
  components: {
    appHeader,
    appFooter,
    userMsg
  },
  created() {
    userService.loadUsersToStorage()
    store.dispatch({type: 'loadOrders'})
    // orderService.query()
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  }
}
</script>
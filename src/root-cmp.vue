<template>
    <section class="main-layout" :class="pageClassLayout">
        <app-header />
        <router-view />
        <!-- <app-footer />  -->
        <!-- cuz miriam does't like footer :) will uncomment in future -->
        <mobile-footer />
    </section>
</template>

<script>
import { ElNotification } from 'element-plus'
import { userService } from './services/user.service'
import {
    socketService,
    SOCKET_EVENT_ORDER_ADD,
    SOCKET_EVENT_ORDER_STATUS,
    SOCKET_EVENT_USER_UPDATED
} from './services/socket.service'
import { store } from './store/store'
import { version } from '../package.json'

import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'
import mobileFooter from './cmps/mobile-footer.vue'

export default {
    components: {
        appHeader,
        appFooter,
        mobileFooter
    },
    created() {
        console.log('App running v' + version)

        this.loadUser()
            .catch(err => console.log('Failed to load user!', err))
            .finally(() => this.initializeWebSockets())
    },
    unmounted() {
        socketService.terminate()
    },
    computed: {
        pageClassLayout() {
            return {
                'stay-layout': this.$route.name === 'stay-app',
                'smaller-layout': this.$route.name === 'stay-details' || this.$route.name === 'order-details'
            }
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    methods: {
        async loadUser() {
            const user = userService.getLoggedinUser()
            const loginToken = this.$cookies.get('loginToken')
            if (!loginToken) {
                if (user) await userService.logout()
                return
            }

            if (user) {
                // Get most updated user
                const updatedUser = await userService.getById(user._id)
                store.commit({ type: 'setLoggedinUser', user: updatedUser })
            }
        },
        initializeWebSockets() {
            socketService.setup()
            // Sign user socket
            socketService.on('connect', () => {
                if (this.loggedinUser) {
                    console.log('User socket signed!')
                    socketService.login(this.loggedinUser._id)
                }
            })

            socketService.on(SOCKET_EVENT_ORDER_ADD, this.notifyHost)
            socketService.on(SOCKET_EVENT_ORDER_STATUS, this.notifyStatus)
            socketService.on(SOCKET_EVENT_USER_UPDATED, user => store.commit({ type: 'setLoggedinUser', user }))
        },
        notifyHost({ renter }) {
            ElNotification({
                title: 'Reservation',
                message: 'New reservation received from ' + renter.fullname,
                type: 'success',
                duration: 0
            })
        },
        notifyStatus({ status, host, stay }) {
            const type = status === 'approved' ? 'success' : 'warning'
            ElNotification({
                title: 'Trip status',
                message: `${host.fullname} ${status} your trip at ${stay.name}`,
                type,
                duration: 0
            })
        }
    }
}
</script>
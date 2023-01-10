import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { stayStore } from './stay.store.js'
import { orderStore } from './order.store.js'

export const store = Vuex.createStore({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        userStore,
        stayStore,
        orderStore,
    },
    state: {},
    mutations: {},
    actions: {},
})

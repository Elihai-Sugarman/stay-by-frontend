import { createRouter, createWebHashHistory } from 'vue-router'

import stayApp from './views/stay/stay-app.vue'
import stayDetails from './views/stay/stay-details.vue'
import stayEdit from './views/stay/stay-edit.vue'
import stayExplore from './views/stay/stay-explore.vue'

import loginSignup from './views/login-signup.vue'
import orderDetails from './views/order-details.vue'

const routes = [
    {
        path: '/',
        redirect: '/stay',
    },
    {
        path: '/stay',
        name: 'stay-app',
        component: stayApp,
    },
    {
        path: '/stay/edit/:id?',
        name: 'stay-edit',
        component: stayEdit,
    },
    {
        path: '/stay/:id/order',
        name: 'order-details',
        component: orderDetails,
    },
    {
        path: '/stay/:id',
        name: 'stay-details',
        component: stayDetails,
    },
    {
        path: '/login',
        name: 'login-signup',
        component: loginSignup,
    },
    {
        path: '/explore',
        name: 'explore',
        component: stayExplore,
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory(),
    // base: process.env.BASE_URL,
})

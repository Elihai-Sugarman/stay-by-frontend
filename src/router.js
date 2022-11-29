import { createRouter, createWebHashHistory } from 'vue-router'

import stayApp from './views/stay-app.vue'
import stayDetails from './views/stay-details.vue'
import loginSignup from './views/login-signup.vue'
import orderDetails from './views/order-details.vue'
// import stayEdit from './views/stay-edit.vue'

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
        name: 'loginSignup',
        component: loginSignup,
    },
    // {
    //     path: '/stay/edit/:id?',
    //     name: 'stay-edit',
    //     component: stayEdit,
    // },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory(),
    // base: process.env.BASE_URL,
})

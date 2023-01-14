import { createRouter, createWebHashHistory } from 'vue-router'
import { requireAuth } from './guards'

import stayApp from './views/stay/stay-app.vue'
import stayDetails from './views/stay/stay-details.vue'
import stayEdit from './views/stay/stay-edit.vue'
import stayExplore from './views/stay/stay-explore.vue'

import loginSignup from './views/login-signup.vue'
import orderDetails from './views/order-details.vue'

import dashboard from './views/dashboard/dashboard.vue'
import ordersCmp from './views/dashboard/order.vue'
import stayWishlist from './views/stay/stay-wishlist.vue'
import listingsCmp from './views/dashboard/listings.vue'
import tripsCmp from './views/trips.vue'

const routes = [
    {
        path: '/',
        redirect: '/stay'
    },
    {
        path: '/stay',
        name: 'stay-app',
        component: stayApp
    },
    {
        path: '/stay/:id/order',
        name: 'order-details',
        component: orderDetails
    },
    {
        path: '/stay/:id',
        name: 'stay-details',
        component: stayDetails
    },
    {
        path: '/explore',
        name: 'explore',
        component: stayExplore
    },
    {
        path: '/login',
        name: 'login',
        component: loginSignup,
        props: { isLoginPage: true }
    },
    {
        path: '/signup',
        name: 'signup',
        component: loginSignup,
        props: { isLoginPage: false }
    },
    {
        path: '/dashboard',
        redirect: '/dashboard/reservation'
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        beforeEnter: requireAuth,
        children: [
            {
                path: 'reservation',
                name: 'reservation',
                component: ordersCmp
            },
            {
                path: 'listings',
                name: 'listings',
                component: listingsCmp
            },
            {
                path: 'stay/edit/:id?',
                name: 'stay-edit',
                component: stayEdit
            }
        ]
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: stayWishlist,
        beforeEnter: requireAuth
    },
    {
        path: '/trip',
        name: 'trips',
        component: tripsCmp,
        beforeEnter: requireAuth
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})

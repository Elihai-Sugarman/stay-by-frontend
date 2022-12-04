import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/styles/setup/_typography.scss'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import divider from './cmps/divider.vue'
import brandedBtn from './cmps/branded-btn.vue'
import iconCmp from './cmps/icon-cmp.vue'
import { clickOutsideDirective, focusDirective, rainbowDirective } from './directives'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(rootCmp)

app.directive('outside-click', clickOutsideDirective)
app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.component('divider', divider)
app.component('branded-btn', brandedBtn)
app.component('icon-cmp', iconCmp)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')

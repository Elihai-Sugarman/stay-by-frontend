import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'

import './assets/styles/setup/_typography.scss'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import { clickOutsideDirective, focusDirective, rainbowDirective } from './directives'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './font-awesome'

const app = createApp(rootCmp)

app.component('font-awesome-icon', FontAwesomeIcon) 
app.directive('outside-click', clickOutsideDirective)
app.directive('focus', focusDirective)
app.directive('rainbow', rainbowDirective)
app.use(router)
app.use(store)

app.mount('#app')

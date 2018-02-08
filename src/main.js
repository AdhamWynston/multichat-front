import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import store from './store/store'
import App from './App'
import routes from './routes'
import BootstrapVue from 'bootstrap-vue'
import env from './env'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const router = new VueRouter({
    routes,
    linkActiveClass: 'active'
})

Vue.use(VueAnalytics, {
    id: env.analyticsId,
    router
})

router.beforeEach((to, from, next) => {
    store.commit("routeChange", "start");
    next()
})

router.afterEach((to, from) => {
    store.commit("routeChange", "end");
    document.title = to.meta.title
})

new Vue({
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
}).$mount('#app')

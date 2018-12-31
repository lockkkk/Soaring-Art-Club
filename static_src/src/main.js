// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// vue plugins
import router from './router'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import VueLocalStorage from 'vue-localstorage'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';

import App from './ElementApp'

Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueLocalStorage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',

  localStorage: {
    loggedIn: {
      type: Boolean,
      default: false
    },
    expireTime: '',
    userInfo: {
      type: Object,
      // default: {
        // avatarUrl: '',
        // username: '',
        // userid: {
          // type: Number,
        // },
        // userperm: {
            // type: Number,
            // default: 0
        // }
      // }
    }
  },
  methods: {
      checkLogin() {
          if (this.$localStorage.loggedIn) {
              // expire and toggle login state
          }
          // judge if we can access this page
          // check if there is allowed 
          console.log(this.$route)
          if (this.$route.matched.some(r => r.meta.requiresAuth)) {
              if (!this.$localStorage.loggedIn) {
                  this.$router.push('/login')
                  this.$message.error('需要登录才能访问该页面！')
              }
          }
      }
  },
  created() {
    this.checkLogin()
  },
  watch: {
    "$route": 'checkLogin'
  },

  components: { App }
})

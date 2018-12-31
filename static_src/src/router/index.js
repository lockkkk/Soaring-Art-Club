import Vue from 'vue'
import Router from 'vue-router'

import Root from '@/Root'
import Login from '@/components/Login'
import Register from '@/Register'

import Works from '@/components/Works'
import Work from '@/components/work/Work'
import NewWork from '@/components/work/New'
import Updates from '@/components/Updates'
import Update from '@/components/update/Update'
import NewUpdate from '@/components/update/New'
import Users from '@/components/Users'
import User from '@/components/user/User'
import NewUser from '@/components/user/New'
import Store from '@/components/Store'
import Good from '@/components/good/Good'
import NewGood from '@/components/good/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root,
    },{
      path: '/login',
      component: Login
    },{
      path: '/register',
      component: Register
    },{
      path: '/works',
      component: Works
    },{
      path: '/work/new',
      component: NewWork,
      meta: { requiresAuth: true }
    },{
      path: '/work/:id',
      component: Work,
    },{
      path: '/updates',
      component: Updates
    },{
      path: '/update/new',
      component: NewUpdate,
      meta: { requiresAuth: true }
    },{
      path: '/update/:id',
      component: Update,
    },{
      path: '/user/:id',
      component: User,
      meta: { requiresAuth: true }
    },{
      path: '/users',
      component: Users,
      meta: { requiresAuth: true }
    },{
      path: '/good/new',
      component: NewGood,
      meta: { requiresAuth: true }
    },{
        path: '/good/:id',
      component: Good,
    },{
      path: '/goods',
      alias: '/store',
      component: Store,
    }
  ]
})

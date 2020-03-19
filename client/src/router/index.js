import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import login from '../views/login'

import battle from '../views/Battle.vue'
import lobby from '../views/Lobby.vue'
import GameRules from '../views/GameRules.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    beforeEnter(to, from, next) {
      if (!localStorage.token) {
        next();
      } else {
        next('main');
      }
    }
  },
  {
    path: '/battle',
    name: 'battle',
    component: battle
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {

    path: '/lobby',
    name: 'lobby',
    component:lobby
  },

  {
    path: '/rules',
    name: 'GameRules',
    component: GameRules,
    // beforeEnter(to, from, next) {
    //   if (!localStorage.token) {
    //     next();
    //   } else {
    //     next({ name: 'lobby' });
    //   }
    // }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

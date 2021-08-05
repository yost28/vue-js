import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TelemetryPacketsEditor from "../views/TelemetryPacketsEditor.vue"
import TelemetryPacketsViewer from "../views/TelemetryPacketsViewer.vue"
import TelemetryPointsViewer from "../views/TelemetryPointsViewer.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/telemetry-packets-editor',
    name: 'TelemetryPacketsEditor',
    component: TelemetryPacketsEditor
  },
  {
    path: '/telemetry-packets-viewer',
    name: 'TelemetryPacketsViewer',
    component: TelemetryPacketsViewer
  },
  {
    path: '/telemetry-points-viewer',
    name: 'TelemetryPointsViewer',
    component: TelemetryPointsViewer
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

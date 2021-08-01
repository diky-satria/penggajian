import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { guest:true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { auth:true }
  },
  {
    path: '/pegawai',
    name: 'Pegawai',
    component: () => import('../views/admin/Pegawai.vue'),
    meta: { auth:true }
  },
  {
    path: '/jabatan',
    name: 'Jabatan',
    component: () => import('../views/admin/Jabatan.vue'),
    meta: { auth:true }
  },
  {
    path: '/golongan',
    name: 'Golongan',
    component: () => import('../views/admin/Golongan.vue'),
    meta: { auth:true }
  },
  {
    path: '/kehadiran',
    name: 'Kehadiran',
    component: () => import('../views/admin/Kehadiran.vue'),
    meta: { auth:true }
  },
  {
    path: '/input-kehadiran',
    name: 'InputKehadiran',
    component: () => import('../views/admin/InputKehadiran.vue'),
    meta: { auth:true }
  },
  {
    path: '/penggajian',
    name: 'Penggajian',
    component: () => import('../views/admin/Penggajian.vue'),
    meta: { auth:true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'link-style'
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.getters['auth/authenticated']){
    router.replace('/')
  }
  if(to.meta.guest && store.getters['auth/authenticated']){
    router.replace('/dashboard')
  }

  next()
})

export default router

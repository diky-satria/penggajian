<template>
   <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
         <div class="container">
            <div class="navbar-brand">G@JI</div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
               <template v-if="authenticated">
                  <div class="navbar-nav text-center" id="disabled-menu">
                     <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                     <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Master Data
                        </a>
                        <div class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                           <router-link to="/pegawai" class="dropdown-item">Pegawai</router-link>
                           <router-link to="/jabatan" class="dropdown-item">Jabatan</router-link>
                           <router-link to="/golongan" class="dropdown-item">Golongan</router-link>
                        </div>
                     </li>
                     <router-link to="/kehadiran" class="nav-link">Kehadiran</router-link>
                     <router-link to="/penggajian" class="nav-link">Penggajian</router-link>
                  </div>
                  <div class="navbar-nav ml-auto">
                     <button type="submit" @click="logout" class="btn btn-primary btn-logout-navbar d-flex justify-content-center" id="btn-logout-navbar">
                        <div>Logout</div>
                        <svg v-if="load" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;float:left;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                           <g>
                           <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#007bff" stroke-width="12"></path>
                           <path d="M49 3L49 27L61 15L49 3" fill="#007bff"></path>
                           <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                           </g>
                        </svg>
                     </button>
                  </div>
               </template>
               <template v-else:>
                  <div class="navbar-nav ml-auto">
                     <router-link to="/" class="nav-link btn-login-navbar"><div class="text-center">Login</div></router-link>
                  </div>
               </template>
            </div>
         </div>
      </nav>
   </div>
</template>

<script>
import store from '@/store'
import { computed, ref } from 'vue'
import router from '@/router'
export default {
  setup(){
    const authenticated = computed(() => store.getters["auth/authenticated"])
    const user = computed(() => store.getters["auth/user"])

    const load = ref(false)

    const logout = async () => {
      load.value = true
      let btn = document.getElementById('btn-logout-navbar')
      let dis = document.getElementById('disabled-menu')
      dis.style.display = 'none'
      btn.setAttribute('disabled', true)
      await store.dispatch('auth/logout')
      router.replace('/')
      btn.removeAttribute('disabled', false)
      dis.style.display = 'block'
      load.value = false
    }

    return {
      authenticated,
      user,
      logout,
      load
    }
  }
}
</script>
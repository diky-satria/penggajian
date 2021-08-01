<template>
  <div class="home">
    <div class="row">
      <div class="col-md-8">
        <img src="../assets/img/penggajian-login.png" class="img-login">
      </div>
      <div class="col-md-4">
        <form @submit.prevent="login" class="form-login">
          <div class="row">
            <div class="col d-flex justify-content-center">
              <div class="img-form-login">
                <img src="../assets/img/penggajian-img-form-login.png">
              </div>
            </div>
          </div>
          <div class="form-group">
            <input type="text" v-model="form.email" class="form-control input-email-edit" placeholder="Email...">
            <small v-if="error['email']" id="emailHelp" class="form-text text-danger">{{ error['email'][0] }}</small>
          </div>
          <div class="form-group">
            <input type="password" v-model="form.password" class="form-control input-pass-edit" placeholder="Password">
            <small v-if="error['password']" id="emailHelp" class="form-text text-danger">{{ error['password'][0] }}</small>
          </div>
          <button type="submit" class="btn btn-primary float-right d-flex" id="btn-login">
            <div>Login</div>
            <svg v-if="load" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <g>
                <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
              </g>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import store from '@/store'
export default{
    setup(){
    const form = reactive({
      email: '',
      password: ''
    })
    const error = ref([])
    const load = ref(false)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        iconColor: 'green',
        background: 'rgb(255, 71, 71)'
    })

    const login = async () => {
      let btn = document.getElementById('btn-login')
      try{
        btn.setAttribute('disabled', true)
        load.value = true
        await store.dispatch('auth/login', form)
        load.value = false
        setTimeout(() => {
          btn.removeAttribute('disabled', false)
        }, 2500)
      }catch(e){
        btn.setAttribute('disabled', true)
        load.value = true
        error.value = e.response.data.errors
        if(e.response.data.errors.invalid){
          Toast.fire({
            icon: 'error',
            title: 'Email atau Password salah'
          })
        }
        load.value = false
        btn.removeAttribute('disabled', false)
      }
    }

    return {
      form,
      login,
      error,
      load,
      Toast
    }
  }
}
</script>

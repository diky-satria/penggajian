<template>
   <div>
      <div class="row">
         <div class="col-md">
            <div class="d-flex justify-content-between">
               <p>Input Kehadiran</p>
               <form @submit.prevent="generate" class="d-flex">
                  <select v-model="cari.bulan" class="form-control form-control-edited" required>
                     <option :value="1">Januari</option>
                     <option :value="2">Februari</option>
                     <option :value="3">Maret</option>
                     <option :value="4">April</option>
                     <option :value="5">Mei</option>
                     <option :value="6">Juni</option>
                     <option :value="7">Juli</option>
                     <option :value="8">Agustus</option>
                     <option :value="9">September</option>
                     <option :value="10">Oktober</option>
                     <option :value="11">November</option>
                     <option :value="12">Desember</option>
                  </select>
                  <select v-model="cari.tahun" class="form-control form-control-edited mx-1" required>
                     <option :value="2021">2021</option>
                     <option :value="2022">2022</option>
                     <option :value="2023">2023</option>
                     <option :value="2024">2024</option>
                     <option :value="2025">2025</option>
                  </select>
                  <button type="submit" class="btn btn-sm btn-primary d-flex" id="btn-generate">
                     <div>Generate</div>
                     <svg v-if="load" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                     <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                     </g>
                     </svg>
                  </button>
                  <span class="border-left mx-2" style="border:2px solid gray;"></span>
                  <router-link to="/kehadiran" class="btn btn-sm btn-dark d-flex"><div>Kembali</div></router-link>
               </form>
            </div>
            <hr>
            <template v-if="pegawais !== null">
               <template v-if="pegawais.length > 0">
                  <div class="alert alert-success text-center">Form Input kehadiran bulan {{ bln }} tahun {{ thn }}</div>
                  <form @submit.prevent="inputKehadiran">
                  <table id="example" class="table table-sm" style="width:100%">
                     <thead>
                        <tr>
                           <th>No</th>
                           <th>NIP</th>
                           <th>Nama</th>
                           <th>Sakit</th>
                           <th>Izin</th>
                           <th>Alpha</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(p, index) in pegawais" :key="index">
                           {{setInputan(index, p.id, p.sakit, p.izin, p.alpha)}}
                           <td>{{ index + 1 }}</td>
                           <td>{{ p.nip }}</td>
                           <td>{{ p.nama_pegawai }}</td>
                           <td>
                              <input type="hidden" v-model="p.bulan">
                              <input type="hidden" v-model="p.id">
                              <input type="number" v-model="p.sakit" min="0" class="form-control" required>
                           </td>
                           <td>
                              <input type="number" v-model="p.izin" min="0" class="form-control" required>
                           </td>
                           <td>
                              <input type="number" v-model="p.alpha" min="0" class="form-control" required>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div class="d-flex justify-content-center">
                     <button type="submit" class="btn btn-primary btn-sm d-flex" id="btn-load-input-kehadiran">
                        <div>Lanjutkan</div>
                        <svg v-if="loadInputKehadiran" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g>
                           <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                           <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                           <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </g>
                        </svg>
                     </button>
                  </div>
                  </form>
               </template>
               <template v-else:>
                  <div class="row">
                     <div class="col d-flex justify-content-center">
                        <img src="../../assets/img/penggajian-sudah-diinput.png" class="img-penggajian-sudah-diinput">
                     </div>
                  </div>
               </template>
            </template>
            <template v-else:>
               <div class="row">
                  <div class="col d-flex justify-content-center">
                     <img src="../../assets/img/penggajian-generate.png" class="img-penggajian-generate">
                  </div>
               </div>
            </template>
         </div>
      </div>
   </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'
import { useLoading } from 'vue3-loading-overlay'
export default {
   setup(){
      const pegawais = ref([])
      const cari = reactive({
         bulan: '', 
         tahun: ''
      })
      const bln = ref()
      const thn = ref()
      const load = ref(false)
      const p = reactive({
         bulan: '',
         id: [],
         sakit: [],
         izin: [],
         alpha: []
      })
      const loadInputKehadiran = ref(false)

      const Toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: true,
         didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
         },
         iconColor: 'green',
         background: 'rgb(91, 255, 96)'
      })

      const generate = async () => {
         let loader = useLoading();
         loader.show({
            color: '#FFFFFF',
            isFullPage: 'true',
            backgroundColor: '#4B4B4B',
            loader: 'spinner',
            zIndex: 9999,
            width: 45,
            height: 45
         })
         let btn = document.getElementById('btn-generate')
         btn.setAttribute('disabled', true)
         load.value = true
         let response = await axios.get('api/kehadiran', {
            params:{
               bulan: cari.bulan,
               tahun: cari.tahun
            }
         })

         if(response.status === 200){
            pegawais.value = response.data.data
            bln.value = cari.bulan
            thn.value = cari.tahun
            p.bulan = bln.value+thn.value
            load.value = false
            btn.removeAttribute('disabled', false)
            loader.hide()
         }
      }

      const setInputan = (index, id, sakit, izin, alpha) => {
         p.id[index] = id
         p.sakit[index] = sakit
         p.izin[index] = izin
         p.alpha[index] = alpha
      }

      const inputKehadiran = async () => {
         let btn = document.getElementById('btn-load-input-kehadiran')
         btn.setAttribute('disabled', true)
         loadInputKehadiran.value = true
         await axios.post('api/kehadiran', p)
         router.replace('/kehadiran')
         btn.removeAttribute('disabled', false)
         loadInputKehadiran.value = false
         Toast.fire({
            icon: 'success',
            title: 'Kehadiran berhasil di input'
         })
      }

      onMounted(() => {
         generate()
      })

      return {
         cari,
         pegawais,
         generate,
         bln,
         thn,
         load,
         p,
         inputKehadiran,
         setInputan,
         loadInputKehadiran
      }
   }
}
</script>
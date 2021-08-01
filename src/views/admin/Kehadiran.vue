<template>
   <div>
      <div class="row">
         <div class="col-md">
            <div class="d-flex justify-content-between">
               <p>Kehadiran</p>
               <form @submit.prevent="cariData" class="d-flex">
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
                     <div>Cari</div>
                     <svg v-if="load" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                     <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                     </g>
                     </svg>
                  </button>
                  <span class="border-left mx-2" style="border:2px solid gray;"></span>
                  <router-link to="/input-kehadiran" class="btn btn-sm btn-primary d-flex"><div>Input</div><div class="ml-1">Kehadiran</div></router-link>
               </form>
            </div>
            <hr>
            <template v-if="pegawais !== null">
               <template v-if="pegawais.length > 0">
                  <div class="alert alert-success text-center">Kehadiran bulan {{ bln }} tahun {{ thn }}</div>
                  <table id="example" class="table table-sm" style="width:100%">
                     <thead>
                        <tr>
                           <th>No</th>
                           <th>NIP</th>
                           <th>Nama</th>
                           <th>Sakit</th>
                           <th>Izin</th>
                           <th>Alpha</th>
                           <th>Opsi</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(p, index) in pegawais" :key="index">
                           <td>{{ index + 1 }}</td>
                           <td>{{ p.nip }}</td>
                           <td>{{ p.nama_pegawai }}</td>
                           <td>{{ p.sakit }}</td>
                           <td>{{ p.izin }}</td>
                           <td>{{ p.alpha }}</td>
                           <td><button @click="getDetailKehadiran(p.id)" class="btn btn-sm btn-success" data-toggle="modal" data-target="#staticBackdropEdit">Edit</button></td>
                        </tr>
                     </tbody>
                  </table>
               </template>
               <template v-else:>
                  <div class="row">
                     <div class="col d-flex justify-content-center">
                        <img src="../../assets/img/penggajian-belum-ada-kehadiran.png" class="img-penggajian-belum-ada-data">
                     </div>
                  </div>
               </template>
            </template>
            <template v-else:>
               <div class="row">
                  <div class="col d-flex justify-content-center">
                     <img src="../../assets/img/penggajian-cari-data.png" class="img-penggajian-cari-data">
                  </div>
               </div>
            </template>
         </div>
      </div>

      <!-- modal edit -->
      <div class="modal fade modal-edit-keha" id="staticBackdropEdit" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
               <h5 class="modal-title" id="staticBackdropLabel">Edit Kehadiran</h5>
               <button type="button" class="close" @click="closeModalEdit" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="editKehadiran">
                     <div class="row">
                        <div class="col-md">
                           <div class="form-group">
                              <label>NIP</label>
                              <input type="text" v-model="form.nip" class="form-control" readonly>
                           </div>
                        </div>
                        <div class="col-md">
                           <div class="form-group">
                              <label>Nama</label>
                              <input type="text" v-model="form.nama_pegawai" class="form-control" readonly>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md">
                           <div class="form-group">
                              <label>Sakit</label>
                              <input type="text" v-model="form.sakit" class="form-control">
                              <small v-if="error['sakit']" id="emailHelp" class="form-text text-danger">{{ error['sakit'][0] }}</small>
                           </div>
                        </div>
                        <div class="col-md">
                           <div class="form-group">
                              <label>Izin</label>
                              <input type="text" v-model="form.izin" class="form-control">
                              <small v-if="error['izin']" id="emailHelp" class="form-text text-danger">{{ error['izin'][0] }}</small>
                           </div>
                        </div>
                        <div class="col-md">
                           <div class="form-group">
                              <label>Alpha</label>
                              <input type="text" v-model="form.alpha" class="form-control">
                              <small v-if="error['alpha']" id="emailHelp" class="form-text text-danger">{{ error['alpha'][0] }}</small>
                           </div>
                        </div>
                     </div>
                     <!-- button -->
                     <svg v-if="wait" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;float:left;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#007bff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#007bff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </g>
                     </svg><span v-if="wait" style="font-weight:bold;">Sedang mengambil data...</span>
                     <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-edit-keha">
                        <div>Edit</div>
                        <svg v-if="loadEdit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g>
                           <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                           <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                           <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </g>
                        </svg>
                     </button> 
                       <!-- end button -->
                  </form>
               </div>
            </div>
         </div>
      </div>
      <!-- end modal edit -->

   </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import $ from 'jquery'
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
      const form = reactive({
         nip: '',
         nama_pegawai: '',
         sakit: '',
         izin: '',
         alpha: ''
      })
      const idGaji = ref()
      const wait = ref(false)
      const loadEdit = ref(false)
      const error = ref([])

      const datatable = () => {
         $(document).ready(function() {
            $('#example').DataTable()
         } )
      }

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
 
      const cariData = async () => {
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
         let response = await axios.get('api/kehadiran_detail', {
            params:{
               bulan: cari.bulan,
               tahun: cari.tahun
            }
         })

         if(response.status === 200){
            pegawais.value = response.data.data
            datatable()
            bln.value = cari.bulan
            thn.value = cari.tahun
            load.value = false
            btn.removeAttribute('disabled', false)
            loader.hide()
         }
      }

      const getDetailKehadiran = async (id) => {
         let btn = document.getElementById('btn-edit-keha')
         btn.setAttribute('disabled', true)
         wait.value = true
         let response = await axios.get('api/kehadiran/' + id)
         if(response.status === 200){
            form.nip = response.data.data.nip
            form.nama_pegawai = response.data.data.nama_pegawai
            form.sakit = response.data.data.sakit
            form.izin = response.data.data.izin
            form.alpha = response.data.data.alpha
            idGaji.value = response.data.data.id
            wait.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const closeModalEdit = () => {
         error.value = ''
      }

      const editKehadiran = async () => {
         let btn = document.getElementById('btn-edit-keha')
         try{
            loadEdit.value = true
            btn.setAttribute('disabled', true)
            let response = await axios.patch('api/kehadiran/' + idGaji.value, form)
            if(response.status === 200){
               $('.modal-edit-keha').modal('hide')
               btn.removeAttribute('disabled', false)
               loadEdit.value = false
               error.value = ''
               cariData()
               Toast.fire({
                  icon: 'success',
                  title: 'Kehadiran berhasil diedit'
               })
            }
         }catch(e){
            loadEdit.value = true
            btn.setAttribute('disabled', true)
            error.value = e.response.data.errors
            btn.removeAttribute('disabled', false)
            loadEdit.value = false
         }
      }

      onMounted(() => {
         cariData()
      })

      return {
         cari,
         pegawais,
         cariData,
         datatable,
         bln,
         thn,
         load,
         form,
         getDetailKehadiran,
         idGaji,
         editKehadiran,
         wait,
         loadEdit,
         error,
         closeModalEdit,
         Toast
      }
   }
}
</script>
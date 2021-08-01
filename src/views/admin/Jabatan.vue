<template>
   <div>
      <div class="row">
         <div class="col-md-3">
            <p>Tambah Jabatan</p>
            <hr>
            <form @submit.prevent="addJabatan">
               <div class="form-group">
                  <label>Kode Jabatan</label>
                  <input type="text" v-model="form.kode_jabatan" class="form-control">
                  <small v-if="error['kode_jabatan']" id="emailHelp" class="form-text text-danger">{{ error['kode_jabatan'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Nama Jabatan</label>
                  <input type="text" v-model="form.nama_jabatan" class="form-control">
                  <small v-if="error['nama_jabatan']" id="emailHelp" class="form-text text-danger">{{ error['nama_jabatan'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Gaji Pokok</label>
                  <input type="text" v-model="form.gaji_pokok" class="form-control">
                  <small v-if="error['gaji_pokok']" id="emailHelp" class="form-text text-danger">{{ error['gaji_pokok'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Tunjangan Jabatan</label>
                  <input type="text" v-model="form.tunjangan_jabatan" class="form-control">
                  <small v-if="error['tunjangan_jabatan']" id="emailHelp" class="form-text text-danger">{{ error['tunjangan_jabatan'][0] }}</small>
               </div>
               <button type="submit" class="btn btn-sm btn-primary float-right d-flex" id="btn-tambah-jabatan">
                  <div>Tambah</div>
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
         <div class="col-md-9">
            <p>Data Jabatan</p>
            <hr>
            <table id="example" class="table table-sm" style="width:100%">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Kode</th>
                     <th>Nama</th>
                     <th>Gaji Pokok</th>
                     <th>Tunjangan Jabatan</th>
                     <th>Opsi</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(j, index) in jabatans" :key="index">
                     <td>{{ index + 1 }}</td>
                     <td>{{ j.kode_jabatan }}</td>
                     <td>{{ j.nama_jabatan }}</td>
                     <td><FormatRupiah :angka="j.gaji_pokok" :prefix="'Rp. '"/></td>
                     <td><FormatRupiah :angka="j.tunjangan_jabatan" :prefix="'Rp. '"/></td>
                     <td>
                        <button @click="detailJabatan(j.id)" class="btn btn-sm btn-success mx-1" data-toggle="modal" data-target="#staticBackdrop">Edit</button>
                        <button @click="deleteJabatan(j.id, j.nama_jabatan, index)" class="btn btn-sm btn-danger">Hapus</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
               <h5 class="modal-title" id="staticBackdropLabel">Edit Jabatan</h5>
               <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="editJabatan">
                     <div class="form-group">
                        <label>Kode Jabatan</label>
                        <input type="text" v-model="formEdit.kode_jabatan" class="form-control" readonly>
                     </div>
                     <div class="form-group">
                        <label>Nama Jabatan</label>
                        <input type="text" v-model="formEdit.nama_jabatan" class="form-control">
                        <small v-if="errorEdit['nama_jabatan']" id="emailHelp" class="form-text text-danger">{{ errorEdit['nama_jabatan'][0] }}</small>
                     </div>
                     <div class="form-group">
                        <label>Gaji Pokok</label>
                        <input type="text" v-model="formEdit.gaji_pokok" class="form-control">
                        <small v-if="errorEdit['gaji_pokok']" id="emailHelp" class="form-text text-danger">{{ errorEdit['gaji_pokok'][0] }}</small>
                     </div>
                     <div class="form-group">
                        <label>Tunjangan Jabatan</label>
                        <input type="text" v-model="formEdit.tunjangan_jabatan" class="form-control">
                        <small v-if="errorEdit['tunjangan_jabatan']" id="emailHelp" class="form-text text-danger">{{ errorEdit['tunjangan_jabatan'][0] }}</small>
                     </div>

                     <!-- button -->
                     <svg v-if="wait" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;float:left;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#007bff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#007bff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </g>
                     </svg><span v-if="wait" style="font-weight:bold;">Sedang mengambil data...</span>
                     <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-edit-jabatan">
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
      <!-- end modal -->

   </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import $ from 'jquery'
import FormatRupiah from '@/components/FormatRupiah.vue'
import Swal from 'sweetalert2'
import { useLoading } from 'vue3-loading-overlay'
export default {
   components:{
      FormatRupiah
   },
   setup(){
      const jabatans = ref([])
      const form = reactive({
         kode_jabatan: '',
         nama_jabatan: '',
         gaji_pokok: '',
         tunjangan_jabatan: ''
      })
      const error = ref([])
      const load = ref(false)
      const formEdit = reactive({
         kode_jabatan: '',
         nama_jabatan: '',
         gaji_pokok: '',
         tunjangan_jabatan: ''
      })
      const idJabatan = ref('')
      const errorEdit = ref([])
      const loadEdit = ref(false)
      const wait = ref(false)

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

      const getJabatan = async () => {
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
         let response = await axios.get('api/jabatan')
         if(response.status === 200){
            jabatans.value = response.data.data
            datatable()
            loader.hide()
         }
      }

      const addJabatan = async () => {
         let btn = document.getElementById('btn-tambah-jabatan')
         try{
            load.value = true
            btn.setAttribute('disabled', true)
            let response = await axios.post('api/jabatan', form)
            if(response.status === 200){
               form.kode_jabatan = ''
               form.nama_jabatan = ''
               form.gaji_pokok = ''
               form.tunjangan_jabatan = ''
               error.value = ''
               $('#example').DataTable().destroy()
               jabatans.value.unshift(response.data.jabatan)
               datatable()
               btn.removeAttribute('disabled', false)
               load.value = false
               Toast.fire({
                  icon: 'success',
                  title: 'Jabatan berhasil ditambahkan'
               })
            }
         }catch(e){
            load.value = true
            btn.setAttribute('disabled', true)
            error.value = e.response.data.errors
            btn.removeAttribute('disabled', false)
            load.value = false
         }
      }

      const deleteJabatan = (id, nama_jabatan, index) => {
         Swal.fire({
            title: 'Apa kamu yakin ?',
            text: 'ingin menghapus jabatan "' + nama_jabatan + '"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Kembali'
            }).then((result) => {
            if (result.isConfirmed) {
               axios.delete('api/jabatan/'+ id)
               $('#example').DataTable().destroy()
               jabatans.value.splice(index, 1)
               datatable()
               Toast.fire({
                  icon: 'success',
                  title: 'Jabatan berhasil dihapus'
               })
            }
         })
      }

      const detailJabatan = async (id) => {
         let btn = document.getElementById('btn-edit-jabatan')
         btn.setAttribute('disabled', true)
         wait.value = true
         let response = await axios.get('api/jabatan/' + id)
         if(response.status === 200){
            idJabatan.value = response.data.data.id
            formEdit.kode_jabatan = response.data.data.kode_jabatan
            formEdit.nama_jabatan = response.data.data.nama_jabatan
            formEdit.gaji_pokok = response.data.data.gaji_pokok
            formEdit.tunjangan_jabatan = response.data.data.tunjangan_jabatan
            wait.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const closeModal = () => {
         errorEdit.value.nama_jabatan = ''
         errorEdit.value.gaji_pokok = ''
         errorEdit.value.tunjangan_jabatan = ''
      }

      const editJabatan = async () => {
         let btn = document.getElementById('btn-edit-jabatan')
         try{
            btn.setAttribute('disabled', true)
            loadEdit.value = true
            let response = await axios.patch('api/jabatan/' + idJabatan.value, formEdit)
            if(response.status === 200){
               getJabatan()
               loadEdit.value = false
               $('.modal').modal('hide')
               btn.removeAttribute('disabled', false)
               setTimeout(() => {
                  Toast.fire({
                     icon: 'success',
                     title: 'Jabatan berhasil diedit'
                  })
               }, 2500)
            }
         }catch(e){
            btn.setAttribute('disabled', true)
            loadEdit.value = true
            errorEdit.value = e.response.data.errors
            loadEdit.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      onMounted(() => {
         getJabatan()
      })

      return {
         jabatans,
         getJabatan,
         form,
         addJabatan,
         error,
         load,
         datatable,
         deleteJabatan,
         Toast,
         detailJabatan,
         formEdit,
         idJabatan,
         editJabatan,
         errorEdit,
         closeModal,
         loadEdit,
         wait
      }
   }
}
</script>
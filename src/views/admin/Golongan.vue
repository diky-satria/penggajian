<template>
   <div>
      <div class="row">
         <div class="col-md-3">
            <p>Tambah Golongan</p>
            <hr>
            <form @submit.prevent="addGolongan">
               <div class="form-group">
                  <label>Kode Golongan</label>
                  <input type="text" v-model="form.kode_golongan" class="form-control">
                  <small v-if="error['kode_golongan']" id="emailHelp" class="form-text text-danger">{{ error['kode_golongan'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Uang Makan / Hari</label>
                  <input type="text" v-model="form.uang_makan" class="form-control">
                  <small v-if="error['uang_makan']" id="emailHelp" class="form-text text-danger">{{ error['uang_makan'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Uang Lembur / Jam</label>
                  <input type="text" v-model="form.uang_lembur" class="form-control">
                  <small v-if="error['uang_lembur']" id="emailHelp" class="form-text text-danger">{{ error['uang_lembur'][0] }}</small>
               </div>
               <div class="form-group">
                  <label>Asuransi Kesehatan (Askes)</label>
                  <input type="text" v-model="form.asuransi_kesehatan" class="form-control">
                  <small v-if="error['asuransi_kesehatan']" id="emailHelp" class="form-text text-danger">{{ error['asuransi_kesehatan'][0] }}</small>
               </div>
               <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-tam-gol">
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
            <p>Data Golongan</p>
            <hr>
            <table id="example" class="table table-sm" style="width:100%">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>Kode</th>
                     <th>Uang Makan / Hari</th>
                     <th>Uang Lembur / Jam</th>
                     <th>Asuransi Kesehatan</th>
                     <th>Opsi</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(g, index) in golongans" :key="index">
                     <td>{{ index + 1 }}</td>
                     <td>{{ g.kode_golongan }}</td>
                     <td><FormatRupiah :angka="g.uang_makan" :prefix="'Rp. '"/></td>
                     <td><FormatRupiah :angka="g.uang_lembur" :prefix="'Rp. '"/></td>
                     <td><FormatRupiah :angka="g.asuransi_kesehatan" :prefix="'Rp. '"/></td>
                     <td>
                        <button @click="detailGolongan(g.id)" class="btn btn-sm btn-success mx-1" data-toggle="modal" data-target="#staticBackdrop">Edit</button>
                        <button @click="deleteGolongan(g.id, g.kode_golongan, index)" class="btn btn-sm btn-danger">Hapus</button>
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
               <h5 class="modal-title" id="staticBackdropLabel">Edit Golongan</h5>
               <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="editGolongan">
                     <div class="form-group">
                        <label>Kode Golongan</label>
                        <input type="text" v-model="formEdit.kode_golongan" class="form-control" readonly>
                     </div>
                     <div class="form-group">
                        <label>Uang makan / Hari</label>
                        <input type="text" v-model="formEdit.uang_makan" class="form-control">
                        <small v-if="errorEdit['uang_makan']" id="emailHelp" class="form-text text-danger">{{ errorEdit['uang_makan'][0] }}</small>
                     </div>
                     <div class="form-group">
                        <label>Uang lembur / Jam</label>
                        <input type="text" v-model="formEdit.uang_lembur" class="form-control">
                        <small v-if="errorEdit['uang_lembur']" id="emailHelp" class="form-text text-danger">{{ errorEdit['uang_lembur'][0] }}</small>
                     </div>
                     <div class="form-group">
                        <label>Asuransi kesehatan (Askes)</label>
                        <input type="text" v-model="formEdit.asuransi_kesehatan" class="form-control">
                        <small v-if="errorEdit['asuransi_kesehatan']" id="emailHelp" class="form-text text-danger">{{ errorEdit['asuransi_kesehatan'][0] }}</small>
                     </div>
                     <!-- button -->
                     <svg v-if="wait" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;float:left;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#007bff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#007bff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </g>
                     </svg><span v-if="wait" style="font-weight:bold;">Sedang mengambil data...</span>
                     <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-edit-gol">
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
import Swal from 'sweetalert2'
import FormatRupiah from '@/components/FormatRupiah.vue'
import { useLoading } from 'vue3-loading-overlay'
export default {
   components: {
      FormatRupiah
   },
   setup(){
      const golongans = ref([])
      const form = reactive({
         kode_golongan: '',
         uang_makan: '',
         uang_lembur: '',
         asuransi_kesehatan: ''
      })
      const error = ref([])
      const load = ref(false)
      const formEdit = reactive({
         uang_makan: '',
         uang_lembur: '',
         asuransi_kesehatan: ''
      })
      const loadEdit = ref(false)
      const idGolongan = ref()
      const errorEdit = ref([])
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

      const getGolongan = async () => {
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
         let response = await axios.get('api/golongan')
         if(response.status === 200){
            golongans.value = response.data.data
            datatable()
            loader.hide()
         }
      }

      const addGolongan = async () => {
         let btn = document.getElementById('btn-tam-gol')
         try{
            btn.setAttribute('disabled', true)
            load.value = true
            let response = await axios.post('api/golongan', form)
            if(response.status == 200){
               form.kode_golongan = ''
               form.uang_makan = ''
               form.uang_lembur = ''
               form.asuransi_kesehatan = ''
               error.value = ''
               $('#example').DataTable().destroy()
               golongans.value.unshift(response.data.golongan)
               datatable()
               load.value = false
               btn.removeAttribute('disabled', false)
               Toast.fire({
                  icon: 'success',
                  title: 'Golongan berhasil ditambah'
               })
            }
         }catch(e){
            btn.setAttribute('disabled', true)
            load.value = true
            error.value = e.response.data.errors
            load.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const detailGolongan = async (id) => {
         let btn = document.getElementById('btn-edit-gol')
         btn.setAttribute('disabled', true)
         wait.value = true
         let response = await axios.get('api/golongan/' + id)
         if(response.status === 200){
            formEdit.kode_golongan = response.data.data.kode_golongan
            formEdit.uang_makan = response.data.data.uang_makan
            formEdit.uang_lembur = response.data.data.uang_lembur
            formEdit.asuransi_kesehatan = response.data.data.asuransi_kesehatan
            idGolongan.value = response.data.data.id
            wait.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const closeModal = () => {
         errorEdit.value = ''
      }

      const editGolongan = async () => {
         let btn = document.getElementById('btn-edit-gol')
         try{
            btn.setAttribute('disabled', true)
            loadEdit.value = true
            let response = await axios.patch('api/golongan/'+ idGolongan.value, formEdit)
            if(response.status === 200){
               getGolongan()
               $('.modal').modal('hide')
               loadEdit.value = false
               btn.removeAttribute('disabled', false)
               setTimeout(() => {
                  Toast.fire({
                     icon: 'success',
                     title: 'Golongan berhasil diedit'
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

      const deleteGolongan = (id, kode, index) => {
         Swal.fire({
            title: 'Apa kamu yakin ?',
            text: 'ingin menghapus golongan "' + kode + '"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Kembali'
            }).then((result) => {
            if (result.isConfirmed) {
               axios.delete('api/golongan/'+ id)
               $('#example').DataTable().destroy()
               golongans.value.splice(index, 1)
               datatable()
               Toast.fire({
                  icon: 'success',
                  title: 'Golongan berhasil dihapus'
               })
            }
         })
      }

      onMounted(() => {
         getGolongan()
      })

      return {
         golongans,
         getGolongan,
         datatable,
         form,
         addGolongan,
         Toast,
         error,
         load,
         deleteGolongan,
         formEdit,
         detailGolongan,
         loadEdit,
         editGolongan,
         idGolongan,
         errorEdit,
         closeModal,
         wait
      }
   }
}
</script>
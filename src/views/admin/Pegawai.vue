<template>
   <div>
      <div class="row">
         <div class="col-md-12">
            <div class="d-flex justify-content-between p-edited">
               <p>Data Pegawai</p>
               <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#staticBackdrop">Tambah</button>
            </div>
            <hr>
            <table id="example" class="table table-sm" style="width:100%">
               <thead>
                  <tr>
                     <th>No</th>
                     <th>NIP</th>
                     <th>Nama</th>
                     <th>Jabatan</th>
                     <th>Golongan</th>
                     <th>Jenis Kelamin</th>
                     <th>Telepon</th>
                     <th>Opsi</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(p, index) in pegawais" :key="index">
                     <td>{{ index + 1 }}</td>
                     <td>{{ p.nip }}</td>
                     <td>{{ p.nama_pegawai }}</td>
                     <td>{{ p.nama_jabatan }}</td>
                     <td>{{ p.kode_golongan }}</td>
                     <td>
                        <div v-if="p.nama_jenis_kelamin === 'L'">Laki-laki</div>
                        <div v-else:>Perempuan</div>
                     </td>
                     <td>{{ p.telepon }}</td>
                     <td>
                        <button @click="detailPegawai(p.id)" class="btn btn-sm btn-success mx-1" data-toggle="modal" data-target="#staticBackdropEdit">Edit</button>
                        <button @click="deletePegawai(p.id, p.nama_pegawai, index)" class="btn btn-sm btn-danger">Hapus</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      <!-- modal -->
      <div class="modal fade modal-tam-peg" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
               <h5 class="modal-title" id="staticBackdropLabel">Tambah Pegawai</h5>
               <button type="button" @click="closeModalTambah" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="addPegawai">
                     <div class="row">
                        <div class="col-md">
                           <div class="form-group">
                              <label>NIP</label>
                              <input type="text" v-model="form.nip" class="form-control">
                              <small v-if="error['nip']" id="emailHelp" class="form-text text-danger">{{ error['nip'][0] }}</small>
                           </div>
                           <div class="form-group">
                              <label>Nama</label>
                              <input type="text" v-model="form.nama_pegawai" class="form-control">
                              <small v-if="error['nama_pegawai']" id="emailHelp" class="form-text text-danger">{{ error['nama_pegawai'][0] }}</small>
                           </div>
                           <div class="form-group">
                              <label>Jabatan</label>
                              <select class="form-control" v-model="form.jabatan_id">
                                 <option v-for="j in jab" :key="j.id" :value="j.id">{{ j.kode_jabatan }} | {{ j.nama_jabatan }}</option>
                              </select>
                              <small v-if="error['jabatan_id']" id="emailHelp" class="form-text text-danger">{{ error['jabatan_id'][0] }}</small>
                           </div>
                        </div>
                        <div class="col-md">
                           <div class="form-group">
                              <label>Golongan</label>
                              <select class="form-control" v-model="form.golongan_id">
                                 <option v-for="g in gol" :key="g.id" :value="g.id">{{ g.kode_golongan }}</option>
                              </select>
                              <small v-if="error['golongan_id']" id="emailHelp" class="form-text text-danger">{{ error['golongan_id'][0] }}</small>
                           </div>
                           <div class="form-group">
                              <label>Jenis Kelamin</label>
                              <select class="form-control" v-model="form.jenis_kelamin_id">
                                 <option v-for="jk in jeniskelamin" :key="jk.id" :value="jk.id">
                                    <div v-if="jk.nama_jenis_kelamin === 'L'">Laki-laki</div>
                                    <div v-else:>Perempuan</div>
                                 </option>
                              </select>
                              <small v-if="error['jenis_kelamin_id']" id="emailHelp" class="form-text text-danger">{{ error['jenis_kelamin_id'][0] }}</small>
                           </div>
                           <div class="form-group">
                              <label>Telepon</label>
                              <input type="text" v-model="form.telepon" class="form-control">
                              <small v-if="error['telepon']" id="emailHelp" class="form-text text-danger">{{ error['telepon'][0] }}</small>
                           </div>
                        </div>
                     </div>
                     <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-tam-peg">
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
            </div>
         </div>
      </div>
      <!-- end modal -->

      <!-- modal edit -->
      <div class="modal fade modal-edit-peg" id="staticBackdropEdit" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
               <h5 class="modal-title" id="staticBackdropLabel">Edit Pegawai</h5>
               <button type="button" class="close" @click="closeModalEdit" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="editPegawai">
                     <div class="row">
                        <div class="col-md">
                           <div class="form-group">
                              <label>NIP</label>
                              <input type="text" v-model="formEdit.nip" class="form-control" readonly>
                           </div>
                           <div class="form-group">
                              <label>Nama</label>
                              <input type="text" v-model="formEdit.nama_pegawai" class="form-control">
                              <small v-if="errorEdit['nama_pegawai']" id="emailHelp" class="form-text text-danger">{{ errorEdit['nama_pegawai'][0] }}</small>
                           </div>
                           <div class="form-group">
                              <label>Jabatan</label>
                              <select class="form-control" v-model="formEdit.jabatan_id">
                                 <option v-for="j in jab" :key="j.id" :value="j.id">{{ j.kode_jabatan }} | {{ j.nama_jabatan }}</option>
                              </select>
                           </div>
                        </div>
                        <div class="col-md">
                           <div class="form-group">
                              <label>Golongan</label>
                              <select class="form-control" v-model="formEdit.golongan_id">
                                 <option v-for="g in gol" :key="g.id" :value="g.id">{{ g.kode_golongan }}</option>
                              </select>
                           </div>
                           <div class="form-group">
                              <label>Jenis Kelamin</label>
                              <select class="form-control" v-model="formEdit.jenis_kelamin_id">
                                 <option v-for="jk in jeniskelamin" :key="jk.id" :value="jk.id">
                                    <div v-if="jk.nama_jenis_kelamin === 'L'">Laki-laki</div>
                                    <div v-else:>Perempuan</div>
                                 </option>
                              </select>
                           </div>
                           <div class="form-group">
                              <label>Telepon</label>
                              <input type="text" v-model="formEdit.telepon" class="form-control">
                              <small v-if="errorEdit['telepon']" id="emailHelp" class="form-text text-danger">{{ errorEdit['telepon'][0] }}</small>
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
                     <button type="submit" class="btn btn-sm btn-primary d-flex float-right" id="btn-edit-peg">
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
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { useLoading } from 'vue3-loading-overlay'
export default {
   setup(){
      const pegawais = ref([])
      const jab = ref([])
      const gol = ref([])
      const jeniskelamin = ref([])
      const form = reactive({
         nip: '',
         nama_pegawai: '',
         jabatan_id: '',
         golongan_id: '',
         jenis_kelamin_id: '',
         telepon: ''
      })
      const error = ref([])
      const load = ref(false)
      const formEdit = reactive({
         nip: '',
         nama_pegawai: '',
         jabatan_id: '',
         golongan_id: '',
         jenis_kelamin_id: '',
         telepon: ''
      })
      const idPegawai = ref()
      const loadEdit = ref(false)
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

      const getPegawai = async () => {
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
         let response = await axios.get('api/pegawai')
         if(response.status === 200){
            pegawais.value = response.data.data
            datatable()
            loader.hide()
         }
      }

      const getJabGolJk = async () => {
         let response = await axios.get('api/jab-gol-jk')
         if(response.status === 200){
            jab.value = response.data.jabatan
            gol.value = response.data.golongan
            jeniskelamin.value = response.data.jk
         }
      }

      const closeModalTambah = () => {
         error.value = ''
      }

      const addPegawai = async () => {
         let btn = document.getElementById('btn-tam-peg')
         try{
            btn.setAttribute('disabled', true)
            load.value = true
            let response = await axios.post('api/pegawai', form)
            if(response.status === 200){
               $('#example').DataTable().destroy()
               form.nip = ''
               form.nama_pegawai = ''
               form.jabatan_id = '',
               form.golongan_id = ''
               form.jenis_kelamin_id = ''
               form.telepon = ''
               error.value = ''
               pegawais.value.unshift(response.data.pegawai)
               datatable()
               $('.modal-tam-peg').modal('hide')
               load.value = false
               btn.removeAttribute('disabled', false)
               Toast.fire({
                  icon: 'success',
                  title: 'Pegawai berhasil ditambahkan'
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

      const detailPegawai = async (id) => {
         wait.value = true
         let btn = document.getElementById('btn-edit-peg')
         btn.setAttribute('disabled', true)
         let response = await axios.get('api/pegawai/' + id)
         if(response.status === 200){
            formEdit.nip = response.data.data.nip
            formEdit.nama_pegawai = response.data.data.nama_pegawai
            formEdit.jabatan_id = response.data.data.jabatan_id
            formEdit.golongan_id = response.data.data.golongan_id
            formEdit.jenis_kelamin_id = response.data.data.jenis_kelamin_id
            formEdit.telepon = response.data.data.telepon
            idPegawai.value = response.data.data.id
            btn.removeAttribute('disabled', false)
            wait.value = false
         }
      }

      const closeModalEdit = async () => {
         errorEdit.value = ''
      }

      const editPegawai = async () => {
         let btn = document.getElementById('btn-edit-peg')
         try{
            btn.setAttribute('disabled', true)
            loadEdit.value = true
            let response = await axios.patch('api/pegawai/' + idPegawai.value, formEdit)
            if(response.status === 200){
               getPegawai()
               $('.modal-edit-peg').modal('hide')
               loadEdit.value = false
               btn.removeAttribute('disabled', false)
               setTimeout(() => {
                  Toast.fire({
                     icon: 'success',
                     title: 'Pegawai berhasil diedit'
                  })
               }, 3000)
            }
         }catch(e){
            btn.setAttribute('disabled', true)
            loadEdit.value = true
            errorEdit.value = e.response.data.errors
            loadEdit.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const deletePegawai = (id, nama_pegawai, index) => {
         Swal.fire({
            title: 'Apa kamu yakin ?',
            text: 'ingin menghapus "' + nama_pegawai + '"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Kembali'
            }).then((result) => {
            if (result.isConfirmed) {
               axios.delete('api/pegawai/'+ id)
               $('#example').DataTable().destroy()
               pegawais.value.splice(index, 1)
               datatable()
               Toast.fire({
                  icon: 'success',
                  title: 'Pegawai berhasil dihapus'
               })
            }
         })
      }

      onMounted(() => {
         getPegawai()
         getJabGolJk()
      })

      return {
         pegawais,
         getPegawai,
         datatable,
         getJabGolJk,
         jab,
         gol,
         jeniskelamin,
         form,
         addPegawai,
         error,
         load,
         closeModalTambah,
         formEdit,
         detailPegawai,
         idPegawai,
         editPegawai,
         loadEdit,
         errorEdit,
         closeModalEdit,
         deletePegawai,
         wait
      }
   }
}
</script>
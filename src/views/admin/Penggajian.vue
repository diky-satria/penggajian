<template>
   <div class="peng">
      <div class="row">
         <div class="col-md">
            <div class="d-flex justify-content-between">
               <p>Penggajian</p>
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
                  <button type="submit" class="btn btn-sm btn-primary d-flex" id="btn-cari">
                     <div>Cari</div>
                     <svg v-if="load" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                     <g>
                        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="12"></path>
                        <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                     </g>
                     </svg>
                  </button>
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
                           <td>
                              <button @click="detailGaji(p.id)" class="btn btn-sm btn-info" data-toggle="modal" data-target="#staticBackdropEdit">Detail</button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </template>
               <template v-else:>
                  <div class="row">
                     <div class="col d-flex justify-content-center">
                        <img src="../../assets/img/penggajian-belum-ada-data.png" class="img-penggajian-belum-ada-data">
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
         <div class="modal-dialog modal-lg">
            <div class="modal-content">
               <div class="modal-header modal-header-edit">
               <!-- load -->
               <div>
                  <svg v-if="wait" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;float:left;" width="24px" height="24px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                     <g>
                     <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#007bff" stroke-width="12"></path>
                     <path d="M49 3L49 27L61 15L49 3" fill="#007bff"></path>
                     <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                     </g>
                  </svg><span v-if="wait" style="font-weight:bold;">Sedang mengambil data...</span>
               </div>
               <!-- end load -->
               <button type="button" class="close" @click="closeModalEdit" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
               </div>
               <div class="modal-body">
                  <div id="exportToPdf">
                     <div class="row">
                        <div class="col text-center">
                           <h6>PT. JAVA ANIMA DARMAJA</h6>
                           <p>One Stop Business and IT Solution</p>
                           <p>Jl. Cempaka Blok C3 N0.24 Perum Beringin Raya, Kemiling, Bandar Lampung, Telp 021-123456</p>
                           <hr style="border:1px solid gray;">
                           <h6>SLIP GAJI KARYAWAN</h6>
                           <h6>Bulan {{ bln }} Tahun {{ thn }}</h6>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-6">
                           <table class="table table-sm table-borderless">
                              <tr>
                                 <td>NIP</td>
                                 <td>:</td>
                                 <td><p class="p-marg">{{ dataGaji.nip }}</p></td>
                              </tr>
                              <tr>
                                 <td>Nama</td>
                                 <td>:</td>
                                 <td><p class="p-marg">{{ dataGaji.nama_pegawai }}</p></td>
                              </tr>
                              <tr>
                                 <td>Jabatan</td>
                                 <td>:</td>
                                 <td><p class="p-marg">{{ dataGaji.jabatan }}</p></td>
                              </tr>
                              <tr>
                                 <td>Golongan</td>
                                 <td>:</td>
                                 <td><p class="p-marg">{{ dataGaji.golongan }}</p></td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col">
                           <h6>PENGHASILAN</h6>
                           <table class="table table-sm table-borderless">
                              <tr>
                                 <td>Gaji Pokok</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    <FormatRupiah v-if="dataGaji.gaji_pokok" :angka="dataGaji.gaji_pokok" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Tunjangan Jabatan</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    <FormatRupiah v-if="dataGaji.tunjangan_jabatan" :angka="dataGaji.tunjangan_jabatan" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td colspan="2" class="p-bold">Total (A)</td>
                                 <td class="float-right p-bold">
                                    <FormatRupiah v-if="parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)" :angka="parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                           </table>
                        </div>
                        <div class="col">
                           <h6>POTONGAN</h6>
                           <table class="table table-sm table-borderless">
                              <tr>
                                 <td>PPh (10%)</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    {{  }}
                                    <FormatRupiah v-if="(parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100" :angka="(parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Asuransi</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    <FormatRupiah v-if="dataGaji.asuransi_kesehatan" :angka="dataGaji.asuransi_kesehatan" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Izin ( {{ dataGaji.izin }} * 100.000 )</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    <FormatRupiah v-if="parseInt(dataGaji.izin) * 100000" :angka="parseInt(dataGaji.izin) * 100000" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Alpha ( {{ dataGaji.alpha }} * 200.000 )</td>
                                 <td>=</td>
                                 <td class="float-right">
                                    <FormatRupiah v-if="parseInt(dataGaji.alpha) * 200000" :angka="parseInt(dataGaji.alpha) * 200000" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                              <tr>
                                 <td colspan="2" class="p-bold">Total (B)</td>
                                 <td class="float-right p-bold">
                                    <FormatRupiah v-if="((parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100) + (parseInt(dataGaji.asuransi_kesehatan)) + (parseInt(dataGaji.izin) * 100000) + parseInt((dataGaji.alpha) * 200000)" :angka="((parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100) + (parseInt(dataGaji.asuransi_kesehatan)) + (parseInt(dataGaji.izin) * 100000) + parseInt((dataGaji.alpha) * 200000)" :prefix="'Rp. '"/>
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col">
                           <table class="table table-sm table-bordered">
                              <tr class="tr-edited">
                                 <td>
                                    <div class="p-bold p-2 d-flex justify-content-center">
                                       <p>PENERIMAAN BERSIH (A-B) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                                       <FormatRupiah class="text-center" v-if="gajiBersih(parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan), ((parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100) + (parseInt(dataGaji.asuransi_kesehatan)) + (parseInt(dataGaji.izin) * 100000) + parseInt((dataGaji.alpha) * 200000))" :angka="gajiBersih(parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan), ((parseInt(dataGaji.gaji_pokok) + parseInt(dataGaji.tunjangan_jabatan)) * 10 / 100) + (parseInt(dataGaji.asuransi_kesehatan)) + (parseInt(dataGaji.izin) * 100000) + parseInt((dataGaji.alpha) * 200000))" :prefix="'Rp. '"/>
                                    </div>
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row mb-4">
                        <div class="col-8"></div>
                        <div class="col-4">
                           <p class="ttd-title">B. Lampung, 30 Juni 2021</p>
                           <p>Manager Operasional</p>
                           <p class="ttd p-bold">Sugeng, SE.</p>
                        </div>
                     </div>
                  </div>
                  <!-- button -->
                  <button @click="exportToPdf" class="btn btn-sm btn-primary d-flex float-right" id="btn-edit-keha">PDF</button> 
                  <!-- end button -->
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
import html2pdf from 'html2pdf.js'
import FormatRupiah from '@/components/FormatRupiah.vue'
import { useLoading } from 'vue3-loading-overlay'
export default {
   components:{
      FormatRupiah
   },
   setup(){
      const pegawais = ref([])
      const cari = reactive({
         bulan: '',
         tahun: ''
      })
      const load = ref(false)
      const bln = ref()
      const thn = ref()
      const wait = ref(false)
      const dataGaji = ref([])

      const datatable = () => {
         $(document).ready(function() {
            $('#example').DataTable()
         } )
      }

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
         let btn = document.getElementById('btn-cari')
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

      const gajiBersih = (a, b) => {
         return a - b
      }

      const detailGaji = async (id) => {
         let btn = document.getElementById('btn-edit-keha')
         btn.setAttribute('disabled', true)
         wait.value = true
         let response = await axios.get('api/kehadiran/' + id)
         if(response.status === 200){
            dataGaji.value = response.data.data
            wait.value = false
            btn.removeAttribute('disabled', false)
         }
      }

      const exportToPdf = () => {
         var element = document.getElementById('exportToPdf')
         var opt = {
            margin:       20,
            filename:     'slip-gaji.pdf'
         }

         html2pdf().set(opt).from(element).save()
      }

      onMounted(() => {
         cariData()
      })

      return {
         cari,
         cariData,
         load,
         pegawais,
         datatable,
         bln,
         thn,
         wait,
         exportToPdf,
         dataGaji,
         detailGaji,
         gajiBersih
      }
   }
}
</script>
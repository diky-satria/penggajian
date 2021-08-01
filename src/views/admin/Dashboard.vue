<template>
   <div class="dashboard">
      <div class="row">
         <div class="col-md-4">
            <div class="back">
               <div class="front front-pegawai">
                  <h6>DATA PEGAWAI</h6>
                  <h5>{{ pegawais }}</h5>
               </div>
            </div>
         </div>
         <div class="col-md-4">
            <div class="back">
               <div class="front front-jabatan">
                  <h6>DATA JABATAN</h6>
                  <h5>{{ jabatans }}</h5>
               </div>
            </div>
         </div>
         <div class="col-md-4">
            <div class="back">
               <div class="front front-golongan">
                  <h6>DATA GOLONGAN</h6>
                  <h5>{{ golongans }}</h5>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col-md mt-4 d-flex justify-content-center">
            <ChartLine v-if="loaded" :chartDataLine="chartdataline" :chartOptionsLine="optionsline"/>
         </div>
         <div class="col-md mt-4 d-flex justify-content-center">
            <ChartBar v-if="loaded" :chartDataBar="chartdatabar" :chartOptionsBar="optionsbar"/>
         </div>
      </div>
      <div class="row mt-4">
         <div class="col-md d-flex justify-content-center">
            <ChartPie v-if="loaded" :chartDataPie="chartdatapie" :chartOptionsPie="optionspie"/>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import { useLoading } from 'vue3-loading-overlay'
import ChartPie from '@/components/ChartPie.vue'
import ChartBar from '@/components/ChartBar.vue'
import ChartLine from '@/components/ChartLine.vue'
export default {
   components:{
      ChartPie,
      ChartBar,
      ChartLine
   },
   data(){
      return{
         pegawais: null,
         jabatans: null,
         golongans: null,

         //data chart line
         chartdataline: null,
         optionsline: null,
         loaded: false,
         labJabLine: [],
         dataSatuLine: [],
         tunJab: [],

         //data chart pie
         chartdatapie: null,
         optionspie: null,

         //data chart bar
         chartdatabar: null,
         optionsbar: null,
         labGol: [],
         dataSatu: []
      }
   },
   mounted(){
      this.getData()
   },
   methods:{
      async getData(){
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
         let response = await axios.get('api/dashboard')
         if(response.status === 200){
            this.pegawais = response.data.pegawai
            this.jabatans = response.data.jabatan
            this.golongans = response.data.golongan

            this.loaded = true

            // ambil data untuk chart line
            this.dataSatuLine = response.data.jabatanData.map((x) => x.gaji_pokok)
            this.labJabLine = response.data.jabatanData.map((x) => x.nama_jabatan)
            this.tunJab = response.data.jabatanData.map((x) => x.tunjangan_jabatan)
            this.chartdataline = {
               labels: this.labJabLine,
               datasets: [
                  {
                     label: 'Gaji Pokok',
                     backgroundColor: 'rgba(255,0,0,0.3)',
                     borderWidth: 1,
                     borderColor: 'red',
                     data: this.dataSatuLine
                  },
                  {
                     label: 'Tunjangan Jabatan',
                     backgroundColor: 'rgba(0,255,0,0.3)',
                     borderWidth: 1,
                     borderColor: 'green',
                     data: this.tunJab
                  }
               ]
            }
            this.optionsline = {
               scales: {
                 yAxes: [
                   {
                     ticks: {
                       beginAtZero: true
                     }
                   }
                 ]
               },
               maintainAspecRation: false,
               title: {
                 display: true,
                 text: 'Jabatan'
               },
               responsive: false
            }

            //ambil data untuk chart pie 
            this.chartdatapie = {
               labels: ['Laki-laki', 'Perempuan'],
               datasets: [
                  {
                  label: 'Data One',
                  backgroundColor: ['rgba(0,255,0,0.7)','rgba(255,0,0,0.7)'],
                  data: [response.data.jk.laki, response.data.jk.perempuan]
                  }
               ]
            }
            this.optionspie = {
               title: {
                 display: true,
                 text: 'Jenis Kelamin'
               },
               responsive: false
            }

            // ambil data untuk chart bar
            this.dataSatu = response.data.golonganData.map((x) => x.uang_lembur)
            this.labGol = response.data.golonganData.map((x) => x.kode_golongan)
            this.chartdatabar = {
               labels: this.labGol,
               datasets: [
                  {
                     label: 'Uang Lembur',
                     backgroundColor: 'rgba(0,0,255,0.7)',
                     data: this.dataSatu
                  }
               ]
            }
            this.optionsbar = {
               scales: {
                 yAxes: [
                   {
                     ticks: {
                       beginAtZero: true
                     }
                   }
                 ]
               },
               maintainAspecRation: false,
               title: {
                 display: true,
                 text: 'Golongan'
               },
               responsive: false
            }

            loader.hide()
         }
      }
   }
}
</script>
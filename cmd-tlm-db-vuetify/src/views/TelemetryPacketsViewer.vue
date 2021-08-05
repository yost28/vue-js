<template>
<div>
  <v-card>
    <v-card-title>
      TLM Packet Viewer
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label=""
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tlm_pkts"
      :single-select="singleSelect"
      item-key="_id"
      show-select
      :search="search"
      class ="elevation-1"
    ></v-data-table>
  </v-card>
  <!-- v-for="pkt in tlm_pkts" :key="pkt._id"> -->
 
  <button @click="csvExport(csvData)" style=" right: 0px;width: 300px;border: 3px solid #73AD21;padding: 10px;"> Export to CSV</button>
   <!-- <div v-for="pkt in selected" :key="pkt._id">
    {{pkt.tlm_pkt_name}}
  </div> -->
  </div>
  
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        singleSelect: false,
        selected: [],
        tlm_pkts: [],
        headers: [
          {
            text: 'id',
            align: 'start',
            sortable: true,
            value: '_id',
          },
          { text: 'TLM Packet Name', value: 'tlm_packet_name' },
          { text: 'Sub System', value: 'sub_system' },
          { text: 'Destination Group', value: 'destination_group' },
          { text: 'CSP Port', value: 'csp_port' },
          { text: 'Response', value: 'response' },
           { text: 'Update Frequncy', value: 'update_frequency' },
          { text: 'File ID', value: 'file_id' },
          { text: 'Allow Short', value: 'allow_short' },
          { text: 'Non Telem', value: 'non_telem' },
          { text: 'TLM ID', value: 'tlm_id' },
           { text: 'fields', value: 'fields', sortable: false},
          { text: 'Satellite Family', value: 'satellite' },
          { text: 'Enabled In Production', value: 'enabled_in_production' },
          { text: 'Date Created', value: 'date_created' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    beforeMount(){
        fetch('http://localhost:3000/tlm_pkts')
        .then((res)=>res.json())
        .then(data =>this.tlm_pkts=data)
        .catch(err => console.log(err.message))     

    },
    methods:{
      csvExport(arrData) {
            
            let csvContent = "data:text/csv;charset=utf-8,";

            csvContent += [
                Object.keys(arrData[0]).join(","),
                ...arrData.map(item => Object.values(item).join(","))
            ]
                .join("\n")
                .replace(/(^\[)|(\]$)/gm, "");

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "export.csv");
            link.click();
        }

    },

    computed: {
        //computed functions
        csvData() {
       
            return this.selected.map((item) => ({
                ...item,
                fields: item.fields.join(";"), //item.address.city,
                satellite: item.satellite.join(";")//item.company.name
            }));
        

        },
       

        
   
    },
  }
</script>
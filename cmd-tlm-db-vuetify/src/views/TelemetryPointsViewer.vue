<template>
<div>
  <v-card>
    <v-card-title>
      TLM Points Viewer
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
          { text: 'TLM Point Name', value: 'tlm_point_name' },
          { text: 'Type', value: 'type' },
          { text: 'Size Bytes', value: 'size_bytes' },
          { text: 'CSP Port', value: 'units' },
          { text: 'Response', value: 'limit' },
           { text: 'Update Frequncy', value: 'red_low_limit' },
          { text: 'File ID', value: 'red_high_limit' },
          { text: 'Allow Short', value: 'yellow_low_limit' },
          { text: 'Non Telem', value: 'yellow_high_limit' },
          { text: 'TLM ID', value: 'green_low_limit' },
           { text: 'List', value: 'list', sortable: false},
          { text: 'Description', value: 'description' },
          { text: 'Time Tag Required', value: 'time_tag_required' },
          { text: 'Array Size', value: 'array_size' },
           { text: 'Satellite Family', value: 'satellite' },
          { text: 'Enabled In Production', value: 'enabled_in_production' },
        ],
        
      }
    },
    beforeMount(){
        fetch('http://localhost:3000/tlm_points')
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
<template>
<div>
  <h1>Telemetry Packets Editor</h1>

    <form @submit.prevent="handleSubmit" class="formview">
      <label>Telemetry Packet Name</label>
      <input type="text" required v-model="tlm_pkt_name">
      

      <label >Sub System</label>
      <input type="text" required v-model="sub_system">
      
      <label>Destination Group</label>
      <select v-model="destination_group">
          <option value="ALL">ALL</option>
          <option value="APC">APC</option>
          <option value="CSP">CSP</option>
          <option value="DPC">DPC</option>
          <option value="FC">FC</option>
      </select>

      <label>CSP Port</label>
      <input type="text" required v-model="csp_port">
      <div v-if="cspPortError" class="error">{{cspPortError}}</div>

      <div class="mb-3">
      <label for="formFile" class="form-label">CSV file with Telemetry Fields</label>
      <input class="form-control" type="file" id="formFile" accept=".csv" required v-on:change="onFileChange">
      </div>

      <label>TLM ID</label>
      <input type="text" required v-model="tlm_id">
      <div v-if="tlmIdError" class="error">{{tlmIdError}}</div>
      <div v-if="tlmResError" class="error">{{tlmResError}}</div>

      <label>Is this TLM Packet a Res packet?</label>
      <select v-model="tlm_res">
          <option value="YES">YES</option>
          <option value="NO">NO</option>
      </select>


      <label>Skills:</label>
      <input type="text" v-model="tempSkill" @keyup="addSkill">
      <div v-for="skill in skillsArray" :key="skill" class="pill" @click="deleteSkill">
          {{skill}}
      </div>

      <div class="terms">
          <input type="checkbox" v-model="checkbox" required>
          <label>Have you doubled checked all inputs?</label>
        </div>

        <div class="submit">
            <button>Submit</button>
        </div>

  
  </form>
  <p>TLM Packet Name: {{tlm_pkt_name}}</p>
  <p>Sub System: {{sub_system}}</p>
  <p>Password: {{destination_group}}</p>
  <p>CSP_Port: {{csp_port}}</p>
  <p>TLM ID: {{tlm_id}}</p>
  <p>TLM RES? {{tlm_res}}</p>
  <p>Check: {{terms}}</p>


  


  <div class = "table">
  <table class="table table-striped" style="display:inline-block;">
  <thead>
    <tr>
      <th scope="col">TLM Packet Name</th>
      <th scope="col">Sub System</th>
      <th scope="col">Destination Group</th>
      <th scope="col">CSP Port</th>
      <th scope="col">TLM Packet Name</th>
      <th scope="col">Sub System</th>
      <th scope="col">Destination Group</th>
      <th scope="col">CSP Port</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>
</div>
 


</template>

<script>
export default {
    data(){
        return{
            role: 'designer',
            terms: false,
            tempSkill: '',
            skillsArray: [],
            passwordError: '',
            tlm_pkt_name: '',
            sub_system: '',
            destination_group: 'ALL',
            tlm_res: '',
            csp_port: '',
            response: '',
            update_frequency: '',
            file_id: '',
            allow_short: '',
            non_telem:'',
            tlm_id:'',
            cspPortError: '',
            tlmIdError: '',
            tlmResError: '',
            fields_csv: [],

        }
    },
    methods: {
        addSkill(e){
            if (e.key === "," && this.tempSkill){
                if (!this.skillsArray.includes(this.tempSkill)){
                    this.skillsArray.push(this.tempSkill.replace(',',''))
                }
                this.tempSkill =""
            }
        },
        deleteSkill(e){
            this.skillsArray = this.skillsArray.filter(item => item !== e.target.innerText)
        },
        uploadDealcsv () {},
         
        readTextFile(file){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        alert(allText);
                    }
                }
            }
            rawFile.send(null);
        },
                  
       

        onFileChange(e) {
          const selectedFile = document.getElementById('formFile').files[0];
          console.log(selectedFile)
          console.log(e)
          //e.target.result
         
          

 
        },
        handleSubmit(){
            //validatePassword
            // this.passwordError = this.password.length > 5 ? 
            // '': "Password must be at least 6 characters long"

            this.cspPortError = (parseInt(this.csp_port) < 63) && parseInt(this.csp_port) > -1 ? '': "CSP Port must be an integer and be 62 or less"

            this.tlmIdError = (parseInt(this.tlm_id) < 256) && parseInt(this.tlm_id) > -1 ? '': "TLM ID must be an integer between 0 and 255"

            this.tlmResError = (this.tlm_res =='YES' && (this.tlm_id < 129)) || (this.tlm_res =='NO' && (this.tlm_id > 128)) ? '': "Res Packet should be between 0 and 128, no Res should be between 129 and 255"
            


            if(!this.cspPortError && !this.tlmIdError && !this.tlmResError){
                console.log('tlm_pkt_name: ',this.tlm_pkt_name)
                console.log('sub_system: ',this.sub_system)
                console.log('destination_group: ',this.destination_group)
                console.log('skills: ',this.skillsArray)
                console.log('terms accepted: ',this.checkbox)
            }
        }
    }
}
</script>

<style>

  .formview{
      max-width: 420px;
      margin: 30px auto;
      text-align: left;
      padding: 40px;
      border-radius: 10px;
  }

   .table{
      max-width: 1000px;
      margin: 30px auto;
      background: white;
      text-align: left;
      padding: 40px;
      border-radius: 10px;
  }
  label{
      color: #aaa;
      display:inline-block;
      margin:25px 0 15px;
      font-size: 0.6em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: bold;
  }
  input, select{
      display:block;
      padding: 10px 6px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      border-bottom: 1px solid #ddd;
      color: #555;
  }
  input[type="checkbox"]{
      display: inline-block;
      width: 16px;
      margin: 0 10px 0 0;
      position: relative;
      top: 2px;

  }
  .pill{
      display: inline-block;
      margin: 0 0 0 0;
      padding: 6px 12px;
      background: #eee;
      border-radius: 0px;
      font-size: 12px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #777;
      cursor: pointer;
  }
  button{
      background: #0b6dff;
      border: 0;
      padding: 10px, 20px;
      margin-top: 20px;
      color: white;
      border-radius: 20px;
  }
  .submit{
      text-align: center;
  }
  .error{
      margin-top: 10px;
      font-size: 0.8em;
      font-weight: bold;
  }

</style>
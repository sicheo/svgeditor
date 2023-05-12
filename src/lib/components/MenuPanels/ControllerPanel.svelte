<script lang="ts">
import { onMount} from "svelte";
 
export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}

let name = ''
let model = ''
let intf = ''
let ip = ''
let port = ''
let mac = ''
let driver = ''
let data = {name:'',model:'',intf:'',ip:'',port:'',mac:'',driver:'',type:'CONTROLLER',level:'level6'}

let sourcedrivers:any[] = [
    {uid:1,name:'s7',port:102},
    {uid:2,name:'modbus',port:502},
    {uid:3,name:'ip',port:44818},
    {uid:4,name:'mqtt',port:8883}
]

let interfaces:any[] = [
    {uid:1,name:'ETHERNET'},
    {uid:2,name:'WIFI'},
    {uid:3,name:'SERIAL'},
    {uid:4,name:'SERIALETH'},
]



onMount(async ()=>{
    /*name = node.data.name
    model = node.data.model
    intf = node.data.intf
    ip = node.data.ip
    port = node.data.port
    mac = node.data.mac
    driver = node.data.driver*/
  });



function changeValue(event:any){
    /*node.data.name = name
    node.data.model = model
    node.data.intf = intf
    node.data.ip = ip
    node.data.port = port
    node.data.mac = mac
    node.data.driver = driver
    node.data.port = port*/
    //node.data = data
     node.data.image='/image-controller.svg'
    node.data.level = 'level6'
    callback()
}

function setDriver(){
    let drv = sourcedrivers.find((item:any)=>(item.name == node.data.driver))
    node.data.port = drv.port
    //node.data = data
}

function changeDriver(event:any){
    setDriver()
    callback()
}

</script>

<div class="class-panel-content">
	<div class= "class-panel-row">
            <label class= "class-panel-cell">
                Name
	            <input type="text" name="name"  bind:value="{node.data.name}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Model
	            <input type="text" name="name"  bind:value="{node.data.model}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Interface
	             <select type="sourcedriver" name="type" bind:value={node.data.intf} on:change={changeValue}>
					{#each interfaces as Interface, index(Interface.uid)}
						<option value={Interface.name}>{Interface.name}</option>
					{/each}
				</select>
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                IP
	            <input type="text" name="name"  bind:value="{node.data.ip}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Port
	            <input type="text" name="name"  bind:value="{node.data.port}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                MAC
	            <input type="text" name="name"  bind:value="{node.data.mac}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Driver
	             <select type="sourcedriver" name="type" bind:value={node.data.driver} on:change={changeDriver}>
					{#each sourcedrivers as Driver, index(Driver.uid)}
						<option value={Driver.name}>{Driver.name}</option>
					{/each}
				</select>
            </label>
    </div>
</div>

<style>
.panel-input-text{
	 width: auto;
}

.panel-input{
	 max-width: 100px;
     font-size: smaller;
     color: teal;
}

.class-panel-content {
  display: flexbox;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(50px, auto);
  font-size: smaller;
  padding-top: 10px;
}

.class-panel-row {
  display: flex;
  justify-content:right;
  font-size: smaller;
}

label {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  width: 160px;
  line-height: 22px;
  margin-bottom: 10px;
}

input {
  height: 20px;
  flex: 0 0 80px;
  margin-left: 5px;
}
</style>
<script lang="ts">
import { onMount } from 'svelte';

export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}


let name = ''
let address = ''
let data = {name:'',address:'',type:'COMPANY',level:'level0'}

onMount(async ()=>{
    /*data.name = node.data.name
    data.address = node.data.address*/
  });

function setNode(event:any){
    /*node.data.name = name
    node.data.address = address*/
    //node.data = data
     node.data.image='/image-company.svg'
    node.data.level = 'level1'
    callback()
}

</script>

<div class="class-panel-content">
	<div class= "class-panel-row">
            <label class= "class-panel-cell">
                Name
	            <input type="text" name="name"  bind:value="{node.data.name}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Address
	            <input type="text" name="name"  bind:value="{node.data.address}" on:change={setNode} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">   
            <div class= "class-panel-cell" style="--color:{color}">
                <hr class = "hr-solid" />
            </div>
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
.hr-solid {
    border-bottom: 1px solid var(--color);
}
</style>
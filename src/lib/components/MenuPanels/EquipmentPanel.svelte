<script lang="ts">
import { onMount } from 'svelte';


export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}


let name = ''
let description = ''
let manufacturer = ''
let model = ''
let room = ''
let data = {name:'',description:'',manufacturer:'',model:'',room:'',type:'EQUIPMENT',level:'level'}

onMount(async ()=>{
    /*name = node.data.name
    description = node.data.description
    manufacturer = node.data.manufacturer
    model = node.data.model
    room = node.data.room*/
  });



function changeValue(event:any){
    /*node.data.name = name
    node.data.description = description
    node.data.manufacturer = manufacturer
    node.data.model = model
    node.data.room = room*/
    //node.data = data
     node.data.image='/image-equipment.svg'
    node.data.level = 'level5'
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
                Description
	            <input type="text" name="name"  bind:value="{node.data.description}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Manufacturer
	            <input type="text" name="manufacturer"  bind:value="{node.data.manufacturer}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Model
	            <input type="text" name="model"  bind:value="{node.data.model}" on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Room
	            <input type="text" name="manufacturer"  bind:value="{node.data.room}" on:change={changeValue} class="panel-input panel-input-text">
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
<script lang="ts">
// ALIGN INPUTS
// https://stackoverflow.com/questions/17275707/how-do-i-evenly-add-space-between-a-label-and-the-input-field-regardless-of-leng
import { onMount } from 'svelte';
import {getCountries} from '../../script/utils.js'
import { _ } from 'svelte-i18n'



export let node:any ={data:{}}
export let color = "Teal"
export let callback = (param:any=null)=>{}



let name = ''
let description = ''
let nation = 'IT'
let city = ''
let address = ''
let data = {name:'',description:'',nation:'IT',city:'',address:'',type:'FACTORY',level:'level2'}
let countries = []



onMount(async ()=>{
    name = node.data.name
    description = node.data.description
    nation = node.data.nation
    city = node.data.city
    address = node.data.address
    countries = await getCountries()
  });



function changeValue(event:any){
    /*node.data.name = name
    node.data.description = description
    node.data.nation = nation
    node.data.city = city
    node.data.address = address*/
    //node.data = data
    node.data.image='/image-factory.svg'
    node.data.level = 'level2'
    callback()
}

const onClickItsystems = (ev:any)=>{

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
	            <input type="text" name="description"  bind:value="{node.data.description}"  on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Nation
                <!-- All countries -->
                <select name="nation" class="panel-input" bind:value={node.data.nation} on:change={changeValue}>
                    <option>country</option>
                    {#each countries as Country}
                        <option value="{Country.value}">{Country.name}</option>
                    {/each}
                </select>
	        </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                City
	            <input type="text" name="city"  bind:value="{node.data.city}"  on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
    <div class= "class-panel-row">
            <label class= "class-panel-cell">
                Address
	            <input type="text" name="address"  bind:value="{node.data.address}"  on:change={changeValue} class="panel-input panel-input-text">
            </label>
    </div>
     <div class= "class-panel-row">
                <label class= "class-panel-cell">
	                <input  type="button" name="name" on:click={onClickItsystems} value="{$_('up2clone_master_panel_materials')}"  class="panel-input panel-input-button">
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
select {
  height: 20px;
  flex: 0 0 50px;
  margin-left: 10px;
  background-color: white;
}

</style>
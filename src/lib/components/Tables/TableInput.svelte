<script lang="ts">

import { _ } from 'svelte-i18n'

export let onChange = (ev:any)=>{console.log("TST CHANGE")}
export let value = ""
export let uuid = ""
export let placeholder = $_("table-filter-placehoder")
export let type = 'text'
export let list = ""


</script>
	
	<label class="text">
		<input name="text" list={list} type="{type}" on:change={onChange} data-uuid="{uuid}" value="{value}" placeholder={placeholder}>
	</label>	

<style>

.text {
  position: relative;
  display: inline-block;
  width: 100%;
}


.text input { 
  opacity: 1;
  background-color: #eeeeee;
  width: 100%;
  border: none;
  outline: none;
  margin: 2px,2px,2px,2px;
}


</style>
<script lang="ts">
import TableInput from './TableInput.svelte'


export let column 
export let table
export let width = '80px'
export let heigth = '21px'

const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
const columnFilterValue = column.getFilterValue()

 const sortedUniqueValues =  () => {
      //const ret = typeof firstValue === 'number'? []: Array.from(column.getFacetedUniqueValues().keys()).sort()
	  const ret = Array.from(column.getFacetedUniqueValues().keys()).sort()
	  return ret
 }
 
 const change = (ev:any) =>{
	 console.log("SET FILTER VALUR",column.getFacetedUniqueValues())
	 const target = ev.target
	 column.setFilterValue(target.value)
 }
</script>
	
	<div class="filter" style="--width:{width};--heigth:{heigth}">
		<datalist id={column.id + 'list'}>
			{#each sortedUniqueValues().slice(0, 5000)  as Value}
				<option value={Value} key={Value} />
			{/each}
		</datalist>
		<div class='tableinput'>
			<TableInput  type="text" value={columnFilterValue} onChange={change} list="{column.id + 'list'}"/>
		</div>
	</div>	

<style>

.filter {
  position: relative;
  display: inline-block;
  /*width: 80px;
  height: 21px;*/
  width: var(--width);
  height: var(--heigth);
}

.filter .tableinput { 
  opacity: 1.0;
  width: 100%;
}


</style>
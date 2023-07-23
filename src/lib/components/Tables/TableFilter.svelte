<script lang="ts">
import TableInput from './TableInput.svelte'


export let column 
export let table

const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)
const columnFilterValue = column.getFilterValue()

 const sortedUniqueValues =  () => {
      const ret = typeof firstValue === 'number'? []: Array.from(column.getFacetedUniqueValues().keys()).sort()
	  return ret
 }
 
 const change = (ev:any) =>{
	 const target = ev.target
	 column.setFilterValue(target.value)
 }
</script>
	
	<div class="filter">
		<datalist id={column.id + 'list'}>
			{#each sortedUniqueValues().slice(0, 5000)  as Value}
				<option value={Value} key={Value} />
			{/each}
		</datalist>
		<TableInput type="text" value={columnFilterValue} onChange={change} list="{column.id + 'list'}"/>
	</div>	

<style>

.filter {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 21px;
}

.filter input { 
  opacity: 0;
  width: 0;
  height: 0;
}


</style>
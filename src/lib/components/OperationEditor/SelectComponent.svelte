<script lang="ts">
  export let row:any
  export let typeTag:any
  export let optionsArray:any
  export let onSelectComponent:any;
  //export let col;

  let Options = optionsArray.find((item:any) => { return(item.name == typeTag) })

  const onSelectLocal = (e:any) =>{
	  const target = e.target
	  if(target)
		onSelectComponent(row,typeTag,target.value)
  }
</script>

	<div class="class-last-item">
		 <select type="sourcedriver" name="select" bind:value={row[typeTag]} on:change={onSelectLocal} disabled>
			{#each Options.options as Option, index(Option.id)}
				<option value={Option.name}>{Option.name}</option>
			{/each}
		</select>
	</div>
<style>
</style>
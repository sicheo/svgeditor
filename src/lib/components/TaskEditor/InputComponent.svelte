<script lang="ts">
  export let row:any
  export let typeTag:any
  export let onInputComponent:any

  const onClickLocal = (e:any) =>{
	  const target = e.target
	  if(target)
		onInputComponent(row,typeTag,target.value)
  }
  
</script>

	<div class="class-last-item">
		<input type="text" name="name"  bind:value={row[typeTag]} on:change={onClickLocal} id= "{typeTag +'-op-input-'+row.id}" disabled>
	</div>
<style>
</style>
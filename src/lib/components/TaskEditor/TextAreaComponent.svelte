<script lang="ts">
  export let row:any
  export let typeTag:any
  export let onTextAreaComponent:any

  const onClickLocal = (e:any) =>{
	  const target = e.target
	  if(target)
		onTextAreaComponent(row,typeTag,target.value)
  }
  
</script>

	<div class="class-last-item">
		<textarea id= "{typeTag +'-op-input-'+row.id}"  bind:value={row[typeTag]} name="name" rows="1" cols="22" on:change={onClickLocal} disabled  />
	</div>
<style>
</style>
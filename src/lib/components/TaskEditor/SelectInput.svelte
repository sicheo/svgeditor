<script lang="ts">
  export let optionInputs:any = []
  export let onChangeSelectInput:any 
  //export let col;

  
</script>

	<div class="class-last-item">
		 <select type="sourcedriver" name="select" on:change={onChangeSelectInput}>
			    <option value="0"></option>
			{#each optionInputs as Option, index(Option.uid)}
				<option value={Option.uid}>{Option.name}</option>
			{/each}
		</select>
	</div>
<style>
</style>
<script lang="ts">
  export let row;
  export let onEditButtonClick;
  export let onDeleteButtonClick;
  export let onUpButtonClick;
  export let onDownButtonClick;
  //export let col;
</script>

	<div class="class-last-item">
					<!--button on:click={panelcontroller('hide',currentnode)} style = '--color:white;--background-color:{color}; --width:23px; border:0'>&#9932;</button-->
                    <input type="image" src="../edit.svg"  alt="Submit" width="25" height="25" on:click={onEditButtonClick(row)}> 
					<input type="image" src="../DELETE.svg"  alt="Submit" width="25" height="25" on:click={onDeleteButtonClick(row)} > 
					<input type="image" src="../UPARROW.svg"  alt="Submit" width="25" height="25" on:click={onUpButtonClick(row)} > 
					<input type="image" src="../DOWNARROW.svg"  alt="Submit" width="25" height="25" on:click={onDownButtonClick(row)} > 
	</div>
<style>
</style>
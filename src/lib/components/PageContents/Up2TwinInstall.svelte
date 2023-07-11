<script lang="ts">


export let color
export let dialogOptions




const exitPage = (ev:any)=>{
	const div = document.getElementById("modal-master-params-div-id")
    if(div)
        div.style.display = 'none'
}



</script>

<div class="install-dialog-class">
	<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
		{dialogOptions.title} {dialogOptions.device.uid}
		<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
	    </div>
	</div>
	<div class="class-panel-body">
		
	</div>
</div>


<style>
.install-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 100%;
	min-height: 300px;
	height: 100%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

.class-panel-body {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}
</style>
<script lang="ts">

export let color
export let dialogOptions : any
export let data = []


const exitPage = (ev:any)=>{
	const div = document.getElementById("build-tool-dialog")
    if(div)
        div.style.display = 'none'
}

</script>
    <div class="sign-edit-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				<p>{dialogOptions.dialogDelete} {dialogOptions.row.name}</p>
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body" style="--color:{color};">
			<!-- START EDIT DEVICE INPUTS-->
			<div class="labels1">
				<label for="input1">Input 1: </label>
				<label for="input2">Input 2: </label>
				<label for="input3">Input 3: </label>
			</div>

			<div class="inputs1">
				<input type="text" value="" name="input1" id="input1" />
				<input type="text" value="" name="input2" id="input2" />
				<input type="text" value="" name="input3" id="input3" />
			</div>

			<div class="labels2">
				<label for="input4">Input 4: </label>
				<label for="input5">Input 5: </label>
				<label for="input6">Input 6: </label>
			</div>

			<div class="inputs2">
				<input type="text" value="" name="input4" id="input4" />
				<input type="text" value="" name="input5" id="input5" />
				<input type="text" value="" name="input6" id="input6" />
			</div>

			<!-- END EDIT DEVICE INPUTS-->
		</div>
	</div>

<style>
.sign-edit-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 90%;
	height: 350px;
	margin: auto;
}
.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

.class-panel-header p{
 margin-left: 8px;
}

.class-panel-body {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--color);
  font-weight:bold ;
}

label,
input {
    display: block;
}
label {
    padding: 4px 0 0;
}
input {
    margin: 4px 0 0;
}
.labels1 {
    float: left;
    width: 80px;
}
.labels2 {
    float: left;
    width: 80px;
}
.inputs1 {
    float: left;
    width: 200px;
}
.inputs2 {
    float: left;
    width: 200px;
}


</style>
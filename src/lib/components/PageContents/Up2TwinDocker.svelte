<script lang="ts">

export let color
export let dialogOptions

let cafile:any
let certfile:any
let keyfile:any
let labelCA = "CA"
let labelCERT = "CERT"
let labelKEY = "KEY"

let dockerfile:any

let title = dialogOptions.title+' '+dialogOptions.device.uid


const exitPage = (ev:any)=>{
	labelCA = "CA"
	labelCERT = "CERT"
	labelKEY = "KEY"
	let button = document.getElementById('docker-submit')
	button.setAttribute('disabled','disabled')
	button.style.opacity='0.3'
	const div = document.getElementById("modal-master-params-div-id")
    if(div)
        div.style.display = 'none'
}

const  readFile = async function(event:any) {
	try{
			let file = await event.target.files[0].arrayBuffer();
			let button = document.getElementById('docker-submit')
			let ui8 = new Uint8Array(file);
			const fileContent = [...ui8]
			switch(event.target.id){
				case "ca-file-input":
					cafile = fileContent
					labelCA=event.target.files[0].name
					break;
				case "cert-file-input":
					certfile = fileContent
					labelCERT=event.target.files[0].name
					break;
				case "key-file-input":
					keyfile = fileContent
					labelKEY=event.target.files[0].name
					break;
				/*case "docker-file-input":
					console.log("READ DOCKER TAR")
					dockerfile = new TextDecoder().decode(file)
					//console.log(dockerfile)
					//dockerfile = fileContent
					break;*/
			}
			if(labelCA!='CA'&& labelCERT!='CERT'&& labelKEY!='KEY'){
				button.removeAttribute('disabled')
				button.style.cursor='pointer'
				button.style.opacity='1.0'
				//button.setAttribute("style","opacity:1.0;")
			}
		}catch(error){
			console.log("READ FILE ERROR", error)
		}
	
}

const dockerSubmit = (ev:any)=>{
	console.log("** CONNECTING TO DOCKER ***",dialogOptions.device.host)
}

</script>

<div class="docker-dialog-class">
	<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
		<span>{title}</span>
		<div class="class-last-item">
				<div class="button-wrap">
					<label class="button" style="--background-color:{color};" id="label-ca-file-input" for="ca-file-input">{labelCA}</label>
					<input id="ca-file-input" type="file" accept=".pem"  on:change={readFile}>
					<label class="button" style="--background-color:{color};" id="label-cert-file-input" for="cert-file-input">{labelCERT}</label>
					<input id="cert-file-input" type="file" accept=".pem"  on:change={readFile}>
					<label class="button" style="--background-color:{color};" id="label-key-file-input" for="key-file-input">{labelKEY}</label>
					<input id="key-file-input" type="file" accept=".pem"  on:change={readFile}>
					<input id="docker-submit" style="--color:{color};opacity:0.3"  type="button" value="Submit" disabled on:click={dockerSubmit}/>
				</div>
			    <input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
	    </div>
	</div>
	<div class="class-panel-body">

	</div>
</div>


<style>
.docker-dialog-class{
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

.class-last-item{
	display: flex;
    align-items: flex-start;
    justify-content: right;
    width: 80%;
}

input[type="file"] {
        position: absolute;
        z-index: -1;
        top: 10px;
        left: 8px;
        font-size: 17px;
        color: #b8b8b8;
      }

input[type="button"] {
        color: var(--color);
		background-color: white ;
		padding: 5px 5px;
		font-size: 14px;
        font-weight: bold;
      }

.button-wrap {
        position: relative;
      }
      
.button {
        display: inline-block;
        padding: 5px 5px;
		margin-right: 5px;
        cursor: pointer;
        border-radius: 5px;
        background-color: var(--background-color);
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }
</style>
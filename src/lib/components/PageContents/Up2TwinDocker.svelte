<script lang="ts">
 import { _ } from 'svelte-i18n'
 import {dockerInfo, dnsLookup, setDockerEnv, dockerCreate, dockerListContainers, dockerListImages } from '../../script/api.js'
 import {mock} from '../../ustore.js'
 import { flexRender, createColumnHelper } from '@tanstack/svelte-table';
 import SimpleTable from '../Tables/SimpleTable.svelte'
 import TableImage from  '../Tables/TableImage.svelte'
 import TableText from  '../Tables/TableText.svelte'



export let color
export let dialogOptions

const columnHelper  = createColumnHelper()

let cafile:any
let certfile:any
let keyfile:any
let labelCA = "CA"
let labelCERT = "CERT"
let labelKEY = "KEY"
let statusmessage = ""
//let statuscolor = color
let containers = []
let datacontainers = []
let images = []

let dockerfile:any

let title = dialogOptions.title+' '+dialogOptions.device.name


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
				
			}
			if(labelCA!='CA'&& labelCERT!='CERT'&& labelKEY!='KEY'){
				button.removeAttribute('disabled')
				button.style.cursor='pointer'
				button.style.opacity='1.0'
			}
		}catch(error){
			console.log("READ FILE ERROR", error)
		}
	
}

const dockerSubmit = async (ev:any)=>{
		console.log("** CONNECTING TO DOCKER ***",dialogOptions.device.host)
		let res
		try{
			const ipdockerhost = await dnsLookup(dialogOptions.device.host,$mock)
			const dockerhost = 'tcp://'+ipdockerhost.address+":2376"
			const env = {
				DOCKER_HOST: dockerhost
			}
			await setDockerEnv(env,$mock)
			res = await dockerCreate(cafile,certfile,keyfile,$mock)
		
			res = await dockerInfo($mock)
		
			res = res.data
			switch(res.code){
				case 'ERR_OSSL_PEM_NO_START_LINE':
					statusmessage += ' NOT CONNECTED '+res.code + ' check certs files'
					//statuscolor = 'red'
					break;
				default:
					if(res.errno || res.code){
						statusmessage += ' NOT CONNECTED '+res.code
						//statuscolor = 'red'
					}
					else{ 
						statusmessage += ' CONNECTED Architecture: '+res.Architecture + '  OS Type: '+res.OSType + '  OS: '+res.OperatingSystem +'  OS Version: '+res.OSVersion+ '  Server Version: '+res.ServerVersion 
						res = await dockerListContainers({all:true},$mock)
						res = res.data
						if(Array.isArray(res)){
							containers = res
							console.log("*+*+ CONTAINERS *+*+", containers)
							for(let i =0; i< containers.length;i++) 
								containers[i].Created = new Date(containers[i].Created).toISOString()
						}
						res = await dockerListImages($mock)
						res = res.data
						if(Array.isArray(res)){
							images = res
							for(let i =0; i< images.length;i++) 
								images[i].Created = new Date(images[i].Created).toISOString()
						}
					}
					datacontainers = JSON.parse(JSON.stringify(containers))
					break
			}
		}catch(error){
			console.log(error)
			statusmessage += ' NOT CONNECTED '+error
			//statuscolor = 'red'
		}
}


const imgCols = [

]

let contCols = [
	columnHelper.group({
            id:'id',
            columns:[
                    columnHelper.accessor('Image', {
                        id : 'Image',
                        header: () => 'IMAGE',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('Created', {
                        id : 'Created',
                        header: () => 'Created',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('State', {
                        id : 'State',
                        header: () => 'STATE',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'save',
                        header: () => 'SAVE',
                        cell: (props) =>   flexRender(TableImage,{image:'/SAVE.svg',onClick:onClickSave}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'edit',
                        header: () => 'EDIT',
                        cell: (props) =>   flexRender(TableImage,{image:'/edit.svg',onClick:onClickEdit}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'delete',
                        header: () => 'DELETE',
                        cell: (props) =>   flexRender(TableImage,{image:'/DELETE.svg',onClick:onClickDelete}),
                    }),
            ]
        })

]

const listContainers = new Promise(async(resolve:any,reject:any)=>{
	let res 
	try{
		res = await dockerListContainers({all:true},$mock)
		res = res.data
		if(Array.isArray(res)){
			containers = res
			console.log("*+*+ CONTAINERS *+*+", containers)
			for(let i =0; i< containers.length;i++) 
				containers[i].Created = new Date(containers[i].Created).toISOString()
			resolve(containers)
		}
	}catch(error){
		reject(error)
	}

})

const onClickSave = (ev:any) =>{}
const onClickEdit = (ev:any) =>{}
const onClickDelete = (ev:any) =>{}

const getImages = (ev:any) =>{

}

const getContainers = (ev:any) =>{

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
					<input id="docker-submit" style="--color:{color};opacity:0.3"  type="button" value="{$_('up2clone_docker_submit')}" disabled on:click={dockerSubmit}/>
				</div>
			    <input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
	    </div>
	</div>
	<div class="class-panel-body">
		<div class="class-panel-body-inner">
			<input id="docker-submit" style="--color:{color};opacity:0.3;margin-bottom:2px;"  type="button" value="Containers" disabled on:click={getContainers}/>
			{#await listContainers}
				<p>...waiting</p>
			{:then containers}	
				<SimpleTable data={containers} bind:columns={contCols} color={color}></SimpleTable>
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</div>
		<div class="class-panel-body-inner">
			<input id="docker-submit" style="--color:{color};opacity:0.3;margin-bottom:2px;"  type="button" value="Images" disabled on:click={getImages}/>
		</div>
	</div>
	<div class="class-panel-footer" style="background-color: silver ;">
		<span>Status: {statusmessage}</span>
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
  display: block;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

.class-panel-body-inner{
	margin-top: 20px;
	border-bottom: 1px solid;
}

.class-panel-footer{
	font-weight: bold;
	color:white;
	background-color: var(--background-color);
}
.class-panel-footer span{
	margin-left: 5px;
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
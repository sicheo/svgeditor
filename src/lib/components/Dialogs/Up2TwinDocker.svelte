<script lang="ts">
// https://github.com/open-source-labs/Docketeer
 import { _ } from 'svelte-i18n'
 import {dockerInfo, 
	 dnsLookup, 
	 setDockerEnv, 
	 dockerCreate, 
	 dockerListContainers, 
	 dockerListImages } from '../../script/api.js'
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
let refreshDataExt:any

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
	const divin = document.getElementById("docker-panel-body-id")
	if(divin)
		divin.style.visibility = 'hidden'
	statusmessage = ''
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
							for(let i =0; i< containers.length;i++) 
								containers[i].Created = new Date(containers[i].Created).toISOString()
						}
						res = await dockerListImages({all:true},$mock)
						res = res.data
						if(Array.isArray(res)){
							images = res
							for(let i =0; i< images.length;i++) 
								images[i].Created = new Date(images[i].Created).toISOString()
						}
						console.log("IMAGES",images)
					}
					datacontainers = JSON.parse(JSON.stringify(containers))
					// SHOW BODY DIV
					const div = document.getElementById("docker-panel-body-id")
					if(div)
						div.style.visibility = 'visible'
					break
			}
		}catch(error){
			console.log(error)
			statusmessage += ' NOT CONNECTED '+error
			alert("DEVICE NOT REACHABLE")
		}
}


const imgCols = [

]

const containerColumns = [
        
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
                        header: () => 'START',
						enableColumnFilter:false,
                        cell: (props) =>   flexRender(TableImage,{image:'/START.svg',onClick:onClickStart}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'edit',
                        header: () => 'STOP',
						enableColumnFilter:false,
                        cell: (props) =>   flexRender(TableImage,{image:'/STOP.svg',onClick:onClickStop}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'delete',
                        header: () => 'DELETE',
						enableColumnFilter:false,
                        cell: (props) =>   flexRender(TableImage,{image:'/DELETE.svg',onClick:onClickDelete}),
                    }),
  
  ]

  const imageColumns = [
        
                columnHelper.accessor('Id', {
                       id : 'Id',
                        header: () => 'Id',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor('Created', {
                        id : 'Created',
                        header: () => 'Created',
                        cell: (props) =>  flexRender(TableText,{text:props.getValue()}),
                    }),
                    columnHelper.accessor((row:any) => `${row}`, {
                        id : 'delete',
                        header: () => 'DELETE',
						enableColumnFilter:false,
                        cell: (props) =>   flexRender(TableImage,{image:'/DELETE.svg',onClick:onClickDelete}),
                    }),
  
  ]



const listContainers = new Promise(async(resolve:any,reject:any)=>{
	let res 
	try{
		res = await dockerListContainers({all:true},$mock)
		res = res.data
		if(Array.isArray(res)){
			containers = res
			for(let i =0; i< containers.length;i++) 
				containers[i].Created = new Date(containers[i].Created).toISOString()
			resolve(containers)
		}
	}catch(error){
		reject(error)
	}

})

const listImages = new Promise(async(resolve:any,reject:any)=>{
	let res 
	try{
		res = await dockerListImages({all:true},$mock)
		res = res.data
		if(Array.isArray(res)){
			images = res
			for(let i =0; i< images.length;i++) 
				images[i].Created = new Date(images[i].Created).toISOString()
			resolve(images)
		}
	}catch(error){
		reject(error)
	}

})

const onClickStart = (ev:any) =>{
}
const onClickStop = (ev:any) =>{
}
const onClickDelete = (ev:any) =>{
}

const getImages = (ev:any) =>{

}

const getContainers = (ev:any) =>{

}

</script>

<div class="up2twin-dialog-class" style="width: 100%;height: 100%;margin: auto;min-height: 300px;">
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
	<div class="class-panel-status" style="background-color: silver ;">
		<span>Status: {statusmessage}</span>
	</div>
	<div class="class-panel-body" id="docker-panel-body-id">
		<div class="class-panel-body-inner">
			<div class="container-table-div">
				{#await listContainers}
					<p>...waiting</p>
				{:then containers}	
					<SimpleTable id="container-table" title="{$_("deploy-docker-container")}" data={containers} columns={containerColumns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			</div>
			<div class="image-table-div">
				{#await listImages}
					<p>...waiting</p>
				{:then images}	
					<SimpleTable id="image-table" title="{$_("deploy-docker-image")}" data={images} columns={imageColumns} color={color} bind:refreshDataExt={refreshDataExt}></SimpleTable>
				{:catch error}
					<p style="color: red">{error.message}</p>
			{/await}
			</div>
		</div>
		<div class="class-panel-body-inner">
			<input id="docker-submit" style="--color:{color};opacity:0.3;margin-bottom:2px;"  type="button" value="Images" disabled on:click={getImages}/>
		</div>
	</div>
</div>


<style>


/*
.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
  background-color: #eeeeee;
}*/

.up2twin-dialog-class{
	height: fit-content;
}
.class-panel-header span{
	margin-left: 5px;
}


.class-panel-body {
  visibility: hidden;
  
}

.class-panel-body-inner{
	display:block;
	margin-top: 20px;
	height: fit-content;
	overflow: auto;
}


.class-panel-status{
	margin-top: auto;
}

.class-panel-status span{
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
		padding: 3px 3px;
		font-size: 14px;
        font-weight: bold;
      }

.button-wrap {
        position: relative;
      }
      
.button {
        display: inline-block;
        padding: 3px 3px 3px 3px;
		margin: 3px 3px 3px 3px;
        cursor: pointer;
        border-radius: 5px;
        background-color: var(--background-color);
        font-size: 14px;
        font-weight: bold;
        color: #fff;
      }

.container-table-div{
	display:block;
	height: 280px;
}

.image-table-div{
	display:block;
}
</style>
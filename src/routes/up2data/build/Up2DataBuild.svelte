<script lang="ts">
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import BuildTools from '../../../lib/components/InnerTabs/BuildTools.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import Up2DataEditor from '../../../lib/components/PageContents/Up2DataEditor.svelte'
  import {dataNavigation} from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
  import { _ } from 'svelte-i18n'

  let component = 'MainTabTools'
  let bgcolor ="#f4e2d2"
  let color = "#ac611b"

  let pages = $dataNavigation

  let page = $_('up2data_nav_build')

  let onBuddyClick = BuddyClick

let  onSysConfClick = SysConfClick

let  onLogoutClick = LogoutClick


// MENU MANAGEMENT
let graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}

const upload = async ()=>{
		try{
			let textFileUrl = null;
			//const jsontree = await getTreeFile($token,$currentcompany.name)
			const graphToSave = {nodes:graph.nodes,paths:graph.paths,svg:graph.svg}
			let fileData = new Blob([JSON.stringify(graphToSave)], {type: 'text/plain'});
			    if (textFileUrl !== null) {
					window.URL.revokeObjectURL(textFileUrl);
				}		
			textFileUrl = window.URL.createObjectURL(fileData);
			var a = document.createElement("a");
			a.href = textFileUrl
			a.download = 'TEST.json';
			a.click(); 
		}catch(error){
			console.log(error)
		}
   }

const menusave = ()=>{ }
const menuload = ()=>{ }
const menuimport = ()=>{
    const element = document.getElementById("file-graph-input")
    if(element)
	    element.click()
}
const menuexport = ()=>{
    upload()
}
const menuclear = ()=>{
    if(graph.gnodes && graph.gnodes.length >0){
		if( graph.gnodes[0]){
			graph.gnodes[0].remove()
		}
	}
    const panel = document.getElementById("editor-panel")
    if(panel)
        panel.style.visibility = 'hidden'
}

const menufunctions = {
    menusave: menusave,
    menuload: menuload,
    menuimport: menuimport,
    menuexport: menuexport,
    menuclear: menuclear
}

</script>

<main>
  <div class="main-content">
    <MainTab image="/ICO_UP2_DATA.png" title="{$_('up2data_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="page-container">
    <div class="page-horizontal">
        <div class="navigation-panel" style="--color:{color};">
            <NavigationBar {page} {color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="content-panel">
            <InnerTab component={BuildTools} options={menufunctions} {color} {bgcolor}/>
            <Up2DataEditor bind:graph={graph} menufunctions={menufunctions}/>
        </div>
    </div>
    </div>
  </div>
</main>

<style>
  .main-content{
      margin: 0;
  }
  .page-container{
      display:block;
  }
  .page-horizontal{
      display:flex;
  }
  .navigation-panel{
      display:block;
      min-height: clamp(200px,60vh,0vh); 
      min-width: clamp(100px,15vw,15vw);  
      /*border-left: 1px solid var(--color);
      border-right: 1px solid var(--color);
      border-bottom: 1px solid var(--color);*/
      background-color: #ffffff;
  }
  .content-panel{
      display:block;
      width:100%;
  }
</style>
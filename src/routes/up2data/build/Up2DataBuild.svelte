<script lang="ts">
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import BuildTools from '../../../lib/components/InnerTabs/BuildTools.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import Up2DataEditor from '../../../lib/components/PageContents/Up2DataEditor.svelte'
  import {dataNavigation,mock, navigating } from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
   import { graphDataVerify } from "../../../lib/script/verification/graphverify"
  import { _ } from 'svelte-i18n'
  import graphutils from '../../../lib/script/graphutils';
  import {getTrees, sleep} from '../../../lib/script/api.js'
  import LoadDialog from '../../../lib/components/Dialogs/DGraphLoadDialog.svelte'
  import SaveDialog from '../../../lib/components/Dialogs/DGraphSaveDialog.svelte'
  import DeleteDialog from '../../../lib/components/Dialogs/DGraphDeleteDialog.svelte'
  import {uploadFile} from '../../../lib/script/utils.js'


  let component = 'MainTabTools'
  let bgcolor ="#f4e2d2"
  let color = "#ac611b"
  let dialogComponent = null
  let dialogOptions = {data:null,selected:''}
  let trees = []
 

  let pages = $dataNavigation

  let page = $_('up2data_nav_build')

  let onBuddyClick = BuddyClick

  let  onSysConfClick = SysConfClick

  let  onLogoutClick = LogoutClick


// MENU MANAGEMENT
let graph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}

const upload = async ()=>{
            const graphToSave = {nodes:graph.nodes,paths:graph.paths,svg:graph.svg}		
            const filename = 'TEST.json'
            uploadFile(JSON.stringify(graphToSave),filename)
   }

const menusave = async ()=>{ 
    // CHECK GRAPH CONSISTENCY
    const verification = await graphDataVerify(graph)
    if(verification != "OK"){
        alert(verification)
        return
    }
    const tree = await graphutils.getTreeFromDGraph(graph,graph.nodes[0],null)
    console.log("T R E E ",tree)
   
    // CHECK SAVE
    dialogOptions = {data:{root:tree},selected:''}
    dialogComponent = SaveDialog
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog){
        dialog.style.display = 'block'
    }
}

const listener = async (e:any)=>{
    if(e.detail.treeUid && e.detail.treeUid != ''){
        const found = trees.find((item:any) => item.roottag == e.detail.treeUid)
        if(found){
            const element = document.getElementById("load-graph-redraw")
            let lgraph = {nodes:[],paths:[],svg:'',gnodes:[],gpaths:[]}
            lgraph = await graphutils.getDGraphFromTree(found.root,lgraph,0)
            element.setAttribute("data-graph",JSON.stringify(lgraph))
            element.click()
        }
    }
    removeEventListener("treeLoaded", listener)
}

const menuload = async ()=>{
    // REDRAW GRAPH
    const element = document.getElementById("load-graph-redraw")
    element.addEventListener("treeLoaded",listener)
    // POP UP LOAD PAGE
    // **** TBD LOAD TREES ******
    const response = await getTrees(null,$mock)
    // ***** END TBD *******
    trees = response.data
    dialogOptions = {data:response.data,selected:''}
    $navigating = {}
    dialogComponent = LoadDialog
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog){
        dialog.style.display = 'block'
    }
    await sleep(1000)
    $navigating = null
    
}

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

const menudelete = async ()=>{
    const process = await graphutils.getProcessFromGraph(graph)
    if(process){
        dialogOptions = {data:process,selected:''}
        dialogComponent = DeleteDialog
        const dialog = document.getElementById("build-tool-dialog")
        if(dialog){
            dialog.style.display = 'block'
        }
    }
}

const menufunctions = {
    menusave: menusave,
    menuload: menuload,
    menuimport: menuimport,
    menuexport: menuexport,
    menuclear: menuclear,
    menudelete: menudelete
}

</script>

<main>
  <div class="up2twin-main-content">
    <MainTab image="/ICO_UP2_DATA.png" title="{$_('up2data_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="up2twin-page-container">
    <div class="up2twin-page-horizontal">
        <div class="up2twin-navigation-panel" style="--color:{color};">
            <NavigationBar {page} {color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="up2twin-content-panel">
            <InnerTab component={BuildTools} bind:dialog={dialogComponent} bind:dialogOptions={dialogOptions} options={menufunctions} {color} {bgcolor}/>
            <Up2DataEditor bind:graph={graph} menufunctions={menufunctions}/>
        </div>
    </div>
    </div>
  </div>
</main>

<style global>
  
</style>
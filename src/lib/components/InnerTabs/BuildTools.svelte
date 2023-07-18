<script lang="ts">
import { _ } from 'svelte-i18n'

export let color="#0e0e0e"
export let options
export let dialog
export let dialogOptions = {data:[],selected:""}

const load = () =>{
    options.menuload()
}

const save = () =>{
    dialog=dialog
    options.menusave()
}

const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}

const menuDelete = async ()=>{
    console.log("**** DELETE PROCESS *****")
    await options.menudelete()
    await options.menuclear()
}
</script>

 <div class="main-tab-tool-class">
    <input type="button" class= "image-tool-component" on:click={save} value="{$_('up2_build_tool_save')}"/>
    <input type="button" class= "image-tool-component"  on:click={load} value="{$_('up2_build_tool_load')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuimport} value="{$_('up2_build_tool_import')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuexport} value="{$_('up2_build_tool_export')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuclear} value="{$_('up2_build_tool_clear')}" />
    <input type="button" class= "image-tool-component"  on:click={menuDelete} value="{$_('up2_build_tool_delete')}" />
 </div>

 <div id="build-tool-dialog">
     <svelte:component this={dialog} bind:dialogOptions={dialogOptions} {color}/>
 </div>

<style>
.main-tab-tool-class{
      display:flex;
      justify-content: left;
      margin-top: 10px;
      margin-right: 5px;
  }
  .image-tool-component{
      opacity: 0.8;
      color: var(--color);
      cursor: pointer;
      font-weight: bold ;
  }

  #build-tool-dialog{
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }
</style>
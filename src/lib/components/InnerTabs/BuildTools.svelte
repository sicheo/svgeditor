<script lang="ts">
import { _ } from 'svelte-i18n'

export let color="#0e0e0e"
export let options

const load = () =>{
    console.log("**** BUILD TOOLS LOAD ****")
    options.menuload()
}

const exitDialog = (event:any)=>{
    const dialog = document.getElementById("build-tool-dialog")
    if(dialog)
        dialog.style.display = 'none'
}
</script>

 <div class="main-tab-tool-class">
    <input type="button" class= "image-tool-component" on:click={options.menusave} value="{$_('up2_build_tool_save')}"/>
    <input type="button" class= "image-tool-component"  on:click={load} value="{$_('up2_build_tool_load')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuimport} value="{$_('up2_build_tool_import')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuexport} value="{$_('up2_build_tool_export')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuclear} value="{$_('up2_build_tool_clear')}" />
 </div>

 <div id="build-tool-dialog">
     <input type="image" class= "image-tool-component" src="/close.svg" on:click={exitDialog} alt="ALT IMAGE" height="25" />
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
  }

  #build-tool-dialog{
      display: none;
      position: absolute; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      width: 50%; /* Full width */
      min-width: 200px; /* Full width */
      height: auto; /* Full height */
      top: 100px;
      left: 200px;
      background-color: white ;
      border: 1px solid;
  }
</style>
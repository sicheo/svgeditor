<script lang="ts">
import { _ } from 'svelte-i18n'

export let color="#0e0e0e"
export let options
</script>

 <div class="main-tab-tool-class">
    <input type="button" class= "image-tool-component" on:click={options.menusave} value="{$_('up2_build_tool_save')}"/>
    <input type="button" class= "image-tool-component"  on:click={options.menuload} value="{$_('up2_build_tool_load')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuimport} value="{$_('up2_build_tool_import')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuexport} value="{$_('up2_build_tool_export')}" />
    <input type="button" class= "image-tool-component"  on:click={options.menuclear} value="{$_('up2_build_tool_clear')}" />
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
</style>
<script lang="ts">
import { _ } from 'svelte-i18n'

export let color="#0e0e0e"
export let options

const add = () =>{
    options.additem()
}


</script>

 <div class="main-tab-tool-class">
    <input type="button" class= "image-tool-component" on:click={add} value="{$_('up2_add_tool_add')}"/>
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
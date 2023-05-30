<script lang="ts">

export let color="#0e0e0e"
export let options
</script>

 <div class="main-tab-tool-class">
    <input type="button" class= "image-tool-component" on:click={options.menusave} value="SAVE"/>
    <input type="button" class= "image-tool-component"  on:click={options.menuload} value="LOAD" />
    <input type="button" class= "image-tool-component"  on:click={options.menuimport} value="IMPORT" />
    <input type="button" class= "image-tool-component"  on:click={options.menuexport} value="EXPORT" />
    <input type="button" class= "image-tool-component"  on:click={options.menuclear} value="CLEAR" />
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
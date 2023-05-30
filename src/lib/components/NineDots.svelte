<script lang="ts">

export let image:any
export let openModal:any
</script>

 <input type="image" id= "image-component-id" class= "image-component" src="{image}" on:click={openModal} alt="ALT IMAGE" height="30" />

<style>
.image-component{
      margin-top: 10px;
      margin-right: 3px;
      opacity: 0.5;
      height: 10;
      width: 10;
  }
</style>
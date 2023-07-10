<script lang="ts">
  import {findTreePath} from '../script/utils.js'

  export let items:any
  export let tree:any

  const onClick = (ev:any)=>{
      const target = ev.target
      console.log("**** BREADCRUMB CLICK ****",target.value)
      items = findTreePath(tree,target.value)
  }
</script>

<ul class="breadcrumb">
    {#each items as item, i}
        <li>
            {#if i === items.length - 1}
                {item}
            {:else}
                <input type="button" on:click={onClick} value={item}/>
            {/if}
        </li>
    {/each}
</ul>

<style>
    /* Style the list */
    ul.breadcrumb {
        padding: 10px 16px;
        list-style: none;
        background-color: white;
    }
    /* Display list items side by side */
    ul.breadcrumb li {
        display: inline;
        font-size: 14px;
    }
    /* Add a slash symbol (/) before/behind each list item */
    ul.breadcrumb li + li:before {
        padding: 8px;
        color: black;
        content: "/\00a0";
    }
    /* Add a color to all links inside the list */
    ul.breadcrumb li input {
        text-decoration: none;
        border: none;
        cursor: pointer;
    }
</style>
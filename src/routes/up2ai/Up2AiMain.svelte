<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor} from '../../lib/ustore.js'
  import { onMount} from "svelte";
  import { _ } from 'svelte-i18n'

  let component = 'NineDots'
  let bgcolor ="#edf5f7"
  let color = "#639db0"

  onMount(async () => {  
      $base = '/UP2AI'
      $extcolor = color
      $extbgcolor = bgcolor
  })
</script>

<main>
  <div class="main-content">
    <MainTab image="ICO_UP2_AI.png" title="{$_('up2ai_page_title')}" component="{component}" color="{color}" bgcolor={bgcolor}/>
    <div class="login-container">
        <Login color={color} bgcolor={bgcolor} > </Login>
    </div>
  </div>
</main>

<style>
 
  .login-container{
      display:block;
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 300px;
      height: 200px;
      background-color: #fff;
      border-radius: 3px;
  }
</style>
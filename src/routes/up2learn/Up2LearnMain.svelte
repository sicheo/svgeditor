<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor} from '../../lib/ustore.js'
  import { onMount} from "svelte";
  import { _ } from 'svelte-i18n'


  let component = 'NineDots'
  let bgcolor ="#eddeeb"
  let color = "#91618d"

  onMount(async () => {  
      $base = '/UP2LEARN'
      $extcolor = color
      $extbgcolor = bgcolor
  })
</script>

<main>
  <div class="main-content">
    <MainTab image="ICO_UP2_LEARN.png" title="{$_('up2learn_page_title')}" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="login-container">
        <Login color={color} bgcolor={bgcolor} ></Login>
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
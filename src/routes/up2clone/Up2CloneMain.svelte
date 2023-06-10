<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor,currentnavigation,cloneNavigation} from '../../lib/ustore.js'
  import { onMount} from "svelte";


  let component = 'NineDots'
  let bgcolor ="#d5e8d4"
  let color = "#007d35"

  onMount(async () => {  
      $base = '/UP2CLONE'
      $extcolor = color
      $extbgcolor = bgcolor
      $currentnavigation = $cloneNavigation
  })
</script>

<main>
  <div class="main-content">
    <MainTab image="ICO_UP2_CLONE.png" title="UP2CLONE CONFIGURATION AND MONITORING" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="login-container">
        <Login target="/UP2CLONE/MONITOR" color={color} bgcolor={bgcolor} ></Login>
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
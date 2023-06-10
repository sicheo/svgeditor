<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor,currentnavigation,dataNavigation} from '../../lib/ustore.js'
  import { onMount} from "svelte";

  let component = 'NineDots'
  let bgcolor ="#f4e2d2"
  let color = "#ac611b"

  onMount(async () => {  
      $base = '/UP2DATA'
      $extcolor = color
      $extbgcolor = bgcolor
      $currentnavigation = $dataNavigation
  })
</script>

<main>
  <div class="main-content">
   <MainTab image="ICO_UP2_DATA.png" title="UP2DATA CONFIGURATION AND MONITORING" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="login-container">
        <Login target="/UP2DATA/MONITOR" color={color} bgcolor={bgcolor} ></Login>
    </div>
  </div>
</main>

<style>
  .main-content{
      background-color: #ffffff;
      width:100%;
      height:100vh;
  }
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
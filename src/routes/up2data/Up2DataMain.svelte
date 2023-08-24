<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor,currentnavigation,dataNavigation} from '../../lib/ustore.js'
  import { onMount} from "svelte";
  import { _ } from 'svelte-i18n'

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
  <div class="up2twin-main-content">
   <MainTab image="ICO_UP2_DATA.png" title="{$_('up2data_page_title')}" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="up2twin-login-container">
        <Login target="/UP2DATA/MONITOR" color={color} bgcolor={bgcolor} ></Login>
    </div>
  </div>
</main>

<style global>
  
  
</style>
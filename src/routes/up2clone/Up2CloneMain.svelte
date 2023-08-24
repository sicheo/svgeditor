<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import Login from '../../lib/components/Login.svelte'
  import {base,extcolor,extbgcolor,currentnavigation,cloneNavigation} from '../../lib/ustore.js'
  import { onMount} from "svelte";
  import { _ } from 'svelte-i18n'

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
  <div class="up2twin-main-content">
    <MainTab image="ICO_UP2_CLONE.png" title="{$_('up2clone_page_title')}" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="up2twin-login-container">
        <Login target="/UP2CLONE/MONITOR" color={color} bgcolor={bgcolor} ></Login>
    </div>
  </div>
</main>

<style global>
 
</style>
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
  <div class="up2twin-main-content">
    <MainTab image="ICO_UP2_LEARN.png" title="{$_('up2learn_page_title')}" component="{component}" color={color} bgcolor={bgcolor}/>
    <div class="up2twin-login-container">
        <Login color={color} bgcolor={bgcolor} target="/UP2LEARN/MONITOR"></Login>
    </div>
  </div>
</main>

<style global>
 
 
</style>
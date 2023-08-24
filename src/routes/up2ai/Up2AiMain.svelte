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
  <div class="up2twin-main-content">
    <MainTab image="ICO_UP2_AI.png" title="{$_('up2ai_page_title')}" component="{component}" color="{color}" bgcolor={bgcolor}/>
    <div class="up2twin-login-container">
        <Login color={color} bgcolor={bgcolor} target="/UP2AI/MONITOR"> </Login>
    </div>
  </div>
</main>

<style global>
 
  
</style>
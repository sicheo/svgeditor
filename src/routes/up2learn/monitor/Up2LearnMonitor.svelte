<script lang="ts">
  import { navigate } from "svelte-routing";
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import NullComponent from '../../../lib/components/NullComponent.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import NullPage from '../../../lib/components/NullPage.svelte'
  import {learnNavigation} from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
  import { _ } from 'svelte-i18n'
 

  let component = 'MainTabTools'
  let bgcolor ="#eddeeb"
  let color = "#91618d"
  
  let pages = $learnNavigation

  let page = $_('up2learn_nav_monitor')

  let onBuddyClick = BuddyClick

let  onSysConfClick = SysConfClick

let  onLogoutClick = LogoutClick

</script>

<main>
  <div class="up2twin-main-content">
    <MainTab image="/ICO_UP2_LEARN.png" title="{$_('up2learn_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="up2twin-page-container">
    <div class="up2twin-page-horizontal">
        <div class="up2twin-navigation-panel" style="--color:{color};">
            <NavigationBar {page} color={color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="up2twin-content-panel">
            <InnerTab component={NullComponent} {color} {bgcolor}/>
            <NullPage bgcolor="#FFFFFF"/>
        </div>
    </div>
    </div>
  </div>
</main>

<style global>
 
</style>
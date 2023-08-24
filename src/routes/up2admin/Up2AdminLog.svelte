<script lang="ts">
  import MainTab from '../../lib/components/MainTab.svelte'
  import InnerTab from '../../lib/components/InnerTab.svelte'
  import NullComponent from '../../lib/components/NullComponent.svelte'
  import NavigationBar from '../../lib/components/NavigationBar.svelte'
  import Up2AdminLogMP from '../../lib/components/PageContents/Up2AdminLogMP.svelte'
  import {currentnavigation,extcolor, extbgcolor} from '../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../lib/script/menufuncs.js"
 
 
 

  let component = 'MainTabTools'
  let bgcolor = $extbgcolor
  let color = $extcolor
  

  let pages = $currentnavigation

  let page = "ADMIN"

  let onBuddyClick = BuddyClick

  let  onSysConfClick = SysConfClick

  let  onLogoutClick = LogoutClick

</script>

<main>
  <div class="up2twin-main-content">
    <MainTab image="/ICO_UP2_CLONE.png" title="UP2CLONE CONFIGURATION AND MONITORING" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="up2twin-page-container">
    <div class="up2twin-page-horizontal">
        <div class="up2twin-navigation-panel" style="--color:{color};">
            <NavigationBar {page} color={color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="up2twin-content-panel">
            <InnerTab component={NullComponent} color={color} bgcolor={bgcolor}/>
            <Up2AdminLogMP />
        </div>
    </div>
    </div>
  </div>
</main>

<style global>
  
</style>
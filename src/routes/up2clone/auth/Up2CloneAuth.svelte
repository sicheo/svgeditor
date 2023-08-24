<script lang="ts">
  import { navigate } from "svelte-routing";
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import NullComponent from '../../../lib/components/NullComponent.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import Up2CloneAuthMP from '../../../lib/components/PageContents/Up2CloneAuthMP.svelte'
  import {cloneNavigation} from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
  import { _ } from 'svelte-i18n'
 

  let component = 'MainTabTools'
  let bgcolor ="#d5e8d4"
  let color = "#007d35"
  

  let pages = $cloneNavigation
  let page = $_('up2clone_nav_auth')

  let onBuddyClick = BuddyClick

let  onSysConfClick = SysConfClick

let  onLogoutClick = LogoutClick

</script>

<main>
  <div class="up2twin-main-content">
    <MainTab image="/ICO_UP2_CLONE.png" title="{$_('up2clone_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="up2twin-page-container">
    <div class="up2twin-page-horizontal">
        <div class="up2twin-navigation-panel" style="--color:{color};">
            <NavigationBar {page} {color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="up2twin-content-panel">
            <InnerTab component={NullComponent} {color} {bgcolor}/>
            <Up2CloneAuthMP {color}/>
        </div>
    </div>
    </div>
  </div>
</main>

<style global>
  
</style>
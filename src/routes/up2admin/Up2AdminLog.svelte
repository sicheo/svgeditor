<script lang="ts">
  import { navigate } from "svelte-routing";
  import MainTab from '../../lib/components/MainTab.svelte'
  import InnerTab from '../../lib/components/InnerTab.svelte'
  import NullComponent from '../../lib/components/NullComponent.svelte'
  import NavigationBar from '../../lib/components/NavigationBar.svelte'
  import NullPage from '../../lib/components/NullPage.svelte'
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
  <div class="main-content">
    <MainTab image="/ICO_UP2_CLONE.png" title="UP2CLONE CONFIGURATION AND MONITORING" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="page-container">
    <div class="page-horizontal">
        <div class="navigation-panel" style="--color:{color};">
            <NavigationBar {page} color={color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="content-panel">
            <InnerTab component={NullComponent} color={color} bgcolor={bgcolor}/>
            <NullPage bgcolor="#FFFFFF"/>
        </div>
    </div>
    </div>
  </div>
</main>

<style>
  .main-content{
      margin: 0;
  }
  .page-container{
      display:block;
  }
  .page-horizontal{
      display:flex;
  }
  .navigation-panel{
      display:block;
      min-height: clamp(200px,60vh,0vh); 
      min-width: clamp(100px,15vw,15vw);  
      /*border-left: 1px solid var(--color);
      border-right: 1px solid var(--color);
      border-bottom: 1px solid var(--color);*/
      background-color: #ffffff;
  }
  .content-panel{
      display:block;
      width:100%;
  }
</style>
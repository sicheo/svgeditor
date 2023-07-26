<script lang="ts">
  import { navigate } from "svelte-routing";
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import NullComponent from '../../../lib/components/NullComponent.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import Up2CloneTempMP from "../../../lib/components/PageContents/Up2CloneTempMP.svelte";
  import {cloneNavigation} from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
  import { _ } from 'svelte-i18n'
  import { onMount} from "svelte";
  import {getDevices} from '../../../lib/script/api.js'
  import {mock} from '../../../lib/ustore.js'

 

   let component = 'MainTabTools'
  let bgcolor ="#d5e8d4"
  let color = "#007d35"
  
  let pages = $cloneNavigation

  let page = $_('up2clone_nav_template')

  let onBuddyClick = BuddyClick

let  onSysConfClick = SysConfClick

let  onLogoutClick = LogoutClick

let data = []

onMount(async ()=>{
       const response = await getDevices(null,$mock)
       data = response.data
   
    });
</script>

<main>
  <div class="main-content">
    <MainTab image="/ICO_UP2_CLONE.png" title="{$_('up2clone_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="page-container">
    <div class="page-horizontal">
        <div class="navigation-panel" style="--color:{color};">
            <NavigationBar {page} {color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="content-panel">
            <InnerTab component={NullComponent} {color} {bgcolor}/>
            <Up2CloneTempMP  color={color}/>
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
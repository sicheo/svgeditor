<script lang="ts">
  import MainTab from '../../../lib/components/MainTab.svelte'
  import InnerTab from '../../../lib/components/InnerTab.svelte'
  import AddTools from '../../../lib/components/InnerTabs/AddTools.svelte'
  import NavigationBar from '../../../lib/components/NavigationBar.svelte'
  import Up2DataConfMp from "../../../lib/components/PageContents/Up2DataConfMP.svelte";
  import {dataNavigation,mock} from '../../../lib/ustore.js'
  import { BuddyClick, LogoutClick, SysConfClick } from "../../../lib/script/menufuncs.js"
  import { _ } from 'svelte-i18n'
  import {getDevices} from '../../../lib/script/api.js'
  import { onMount} from "svelte";
  import { v4 as uuidv4 } from 'uuid';
  import {getLocalDate} from '../../../lib/script/utils.js'



 

  let component = 'MainTabTools'
  let bgcolor ="#f4e2d2"
  let color = "#ac611b"
  
  let pages = $dataNavigation

  let page = $_('up2data_nav_conf')

  let data = []

  
  const newrow = { 
        uid: uuidv4(),
        name: '',
        lastmodified: getLocalDate(new Date(Date.now())),
        description: "",
        localization: {
            plant: 0,
            department: 0,
            line: 0,
        },
        host: "",
        port: 3001,
        type: "VM",
        os: "MICROSOFT",
        userid: "",
        password: "",
        hwdetails: {
            mac: "",
            brand: "",
            model: "",
        },
    }
   

  const menufunctions = {
    newrow: newrow
    
}

  onMount(async ()=>{
       const response = await getDevices(null,$mock)
       data = response.data
   
    });

  let onBuddyClick = BuddyClick

let  onSysConfClick = SysConfClick

let  onLogoutClick = LogoutClick

</script>

<main>
  <div class="up2twin-main-content">
    <MainTab image="/ICO_UP2_DATA.png" title="{$_('up2data_page_title')}" component="{component}" color={color} bgcolor={bgcolor} {onLogoutClick} {onSysConfClick} {onBuddyClick}/>
    <div class="up2twin-page-container">
    <div class="up2twin-page-horizontal">
        <div class="up2twin-navigation-panel" style="--color:{color};">
            <NavigationBar {page} {color} bgcolor="#FFFFFF" {pages}/>
        </div>
        <div class="up2twin-content-panel">
            <InnerTab component={AddTools} options={menufunctions} bind:data={data} {color} {bgcolor}/>
            <Up2DataConfMp color={color} bind:data={data}/>
        </div>
    </div>
    </div>
  </div>
</main>

<style global>
  
</style>
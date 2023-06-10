<script lang="ts">
import {role,user,token} from '../ustore.js'

export let onBuddyClick:any

export let  onSysConfClick :any

export let  onLogoutClick:any

</script>

 <div class="main-tab-tool-class">
    <input type="text" class= "image-tool-component" value="{$user+' '+$role}"disabled/>
    <input type="image" class= "image-tool-component" src="/BUDDY.png" on:click={onBuddyClick} alt="ALT IMAGE" height="25" />
    <input type="image" class= "image-tool-component" src="/COG.svg" on:click={onSysConfClick} alt="ALT IMAGE" height="25" />
    <input type="image" class= "image-tool-component" style="opacity:1;" src="/LOGOUT.svg" on:click={onLogoutClick} alt="ALT IMAGE" height="25" />
 </div>

<style>
.main-tab-tool-class{
      display:flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-right: 5px;
  }
  .main-tab-tool-class input[type="image"]{
      opacity: 0.3;
      padding-left: 2px;
      cursor: pointer;
  }

  .main-tab-tool-class input[type="image"]:hover{
      background-color: rgba(44, 141, 247, 0.2);
  }

  input[type="text"] {
       opacity: 0.7;
  }
</style>
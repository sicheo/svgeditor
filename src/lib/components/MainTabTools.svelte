<script lang="ts">
import {role,user} from '../ustore.js'

export let onBuddyClick = (e:any)=>{

}

export let  onSysConfClick = (e:any)=>{

}

export let  onLogoutClick = (e:any)=>{
    $role = ""
}

</script>

 <div class="main-tab-tool-class">
    <input type="text" class= "image-tool-component" value="{$user+' '+$role}"disabled/>
    <input type="image" class= "image-tool-component" src="/BUDDY.png" on:click={onBuddyClick} alt="ALT IMAGE" height="30" />
    <input type="image" class= "image-tool-component" src="/COG.svg" on:click={onSysConfClick} alt="ALT IMAGE" height="30" />
    <input type="image" class= "image-tool-component" src="/LOGOUT.png" on:click={onLogoutClick} alt="ALT IMAGE" height="25" />
 </div>

<style>
.main-tab-tool-class{
      display:flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-right: 5px;
  }
  .image-tool-component{
      opacity: 0.3;
  }

  input[type="text"] {
       opacity: 0.7;
  }
</style>
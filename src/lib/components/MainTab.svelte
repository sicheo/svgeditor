<script lang="ts">
// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
// https://www.thisdot.co/blog/web-components-with-svelte/
import {onMount} from "svelte"
import { navigate } from 'svelte-routing';

import ModalApps from "./ModalApps.svelte";
import NineDots from "./NineDots.svelte"
import MainTabTools from "./MainTabTools.svelte"

export let image
export let height = 50
export let title = "INSERT TITLE"
export let component
export let color = "#007d35"
export let bgcolor = "#d5e8d4"

onMount(() => {
     const modal = document.getElementById("u2t-main-tab-modal-id")
     locit = items
  });

let items = [
    {image:"ICO_UP2_CLONE.png", tag:"UP2CLONE",height: 20,link:"UP2CLONE"},
    {image:"ICO_UP2_DATA.png",tag:"UP2DATA",height: 20,link:"UP2DATA"},
    {image:"ICO_UP2_AI.png",tag:"UP2AI",height: 20,link:"UP2AI"},
    {image:"ICO_UP2_LEARN.png",tag:"UP2LEARN",height: 20,link:"UP2LEARN"},
]

let toolitems = [
    {image:"/BUDDY.png", tag:"Users",height: 20,link:"UP2CLONE"},
    {image:"/LOG.svg",tag:"Logs",height: 20,link:"/UP2ADMIN/LOG"},
    {image:"/SYSCONF.png",tag:"System",height: 20,link:"UP2AI"},
]

let modalId = "u2t-main-tab-modal-id"
let toolModalId = "u2t-tool-modal-id"


let locit:any

const openModal = (e:any)=>{
    const element = e.target
    var rect = element.getBoundingClientRect();
    const modal = document.getElementById(modalId)
    if(modal)
        modal.style.display = "block";    
}

const goToHome = (e:any)=>{
    navigate('/', {replaceState:true}) 
}

export let onBuddyClick:any = ()=>{}

export let  onSysConfClick:any = ()=>{}

export let  onLogoutClick:any = ()=>{}
</script>


<div class="class-main-tab" style="--color:{color}; --background-color:{bgcolor}">
     <input type="image" src="{image}" alt="ALT IMAGE" height="{height}" on:click={goToHome}/>
     <span style="--color:{color};" >{title}</span>
     {#if component == "NineDots"}
        <NineDots image="DOTS9.PNG" {openModal} ></NineDots>
    {:else if component == "MainTabTools"}
        <MainTabTools {onBuddyClick} {onSysConfClick} {onLogoutClick} />
     {/if}
</div>

<div>
     <ModalApps  items={items} modalId="{modalId}"></ModalApps>
</div>
<div>
     <ModalApps  items={toolitems} modalId="{toolModalId}"></ModalApps>
</div>

<style>
  .class-main-tab {
      display:flex;
      justify-content: space-between;
      background-color: var(--background-color);
      color: var(--color) ;
  }
  .class-main-tab span{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: clamp(0.43rem, -0.187rem + 3.1vw, 1.8rem);
      color: var(--color);
      padding: 5px ;
      opacity: 0.7;
  }
  .class-main-tab input{
      margin-right: 20px ;
  }
  


</style>
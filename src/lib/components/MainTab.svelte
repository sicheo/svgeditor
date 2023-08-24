<script lang="ts">
// https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/
// https://www.thisdot.co/blog/web-components-with-svelte/
import {onMount} from "svelte"
import { navigate } from 'svelte-routing';

import ModalApps from "../components/Dialogs/ModalApps.svelte";
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


<div class="up2twin-class-main-tab" style="--color-main-tab:{color}; --background-color-main-tab:{bgcolor}">
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

<style global >
    .up2twin-class-main-tab {
    display: flex;
    justify-content: space-between;
    background-color: var(--background-color-main-tab);
    color: var(--color-main-tab);
}
</style>
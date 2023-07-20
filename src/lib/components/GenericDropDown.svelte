<script lang="ts">
import { onMount} from "svelte";
import { _ } from 'svelte-i18n'

export let data = []
export let selected = ''
export let placeholder = "Select your option"


let optionMenu, selectBtn ,options ,sBtn_text

onMount(async () => {  
  optionMenu = document.querySelector(".select-menu")
  selectBtn = optionMenu.querySelector(".select-btn")
  options = optionMenu.querySelectorAll(".option")
  sBtn_text = optionMenu.querySelector(".sBtn-text")

  selectBtn.addEventListener("click", () =>
    optionMenu.classList.toggle("active")
    );
  options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    let span = option.querySelector(".option-text");
    let uuid = span.getAttribute("data-uid")
    sBtn_text.innerText = selectedOption;
    selected = uuid
    optionMenu.classList.remove("active");
  });
});
})

const filterFunction = (event:any) =>{
    var input, filter, ul, li, a, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myDropdown");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        const txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
}

const getClass = (blocked:boolean)=>{
    let className = ""
    if(blocked)
        className = 'blocked'
    return(className)
}
</script>

<div class="select-menu active" id="select-menu-id">
  <div class="select-btn" id="select-btn-id">
    <span class="sBtn-text">{placeholder}</span>
    <i class="bx bx-chevron-down"></i>
  </div>
  <input type="text"  placeholder="{$_('dialog_search')}" id="myInput" on:keyup="{filterFunction}">
  <ul class="options" id="myDropdown">
     <!--input type="text" placeholder="{$_('dialog_search')}" id="myInput" on:keyup="{filterFunction}"-->
    {#each data as Item, index(Item.id)}
    <li class="option">
      <span class="option-text {getClass(Item.blocked)}" data-uid="{Item.id}">{Item.text} </span>
    </li>
    {/each}
  </ul>
</div>

<style>

.select-menu {
  max-width: 600px;
  /*margin: 50px auto;*/
  background: #e3f2fd;
}
.select-menu .select-btn {
  display: flex;
  background: #fff;
  padding: 5px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.select-menu .select-btn span{
    width:600;
}

.select-menu .options {
  position: absolute;
  width: 600px;
  overflow-y: auto;
  max-height: 150px;
  padding: 5px;
  margin-top: 10px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation-name: fadeInDown;
  -webkit-animation-name: fadeInDown;
  animation-duration: 0.35s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.35s;
  -webkit-animation-fill-mode: both;
}
.select-menu .options .option {
  display: flex;
  /*height: 55px;*/
  cursor: pointer;
  padding: 0 16px;
  border-radius: 8px;
  align-items: center;
  background: #fff;
}
.select-menu .options .option:hover {
  background: #f2f2f2;
}
.select-menu .options .option i {
  font-size: 15px;
  margin-right: 12px;
}
.select-menu .options .option .option-text {
  font-size: 15px;
  color: #333;
}

.select-menu .options .option .option-text.blocked{
  color: red;
}

.select-menu .options .option .option-text1 {
  font-size: 15px;
  color: #333;
  padding-left: 10px;
}

.select-menu .options .option .option-text2 {
  font-size: 15px;
  color: #333;
  padding-left: 10px;
}

.select-btn i {
  font-size: 15px;
  transition: 0.3s;
}

.select-menu.active .select-btn i {
  transform: rotate(-180deg);
}
.select-menu.active .options {
  display: block;
  opacity: 0;
  z-index: 10;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.4s;
  -webkit-animation-fill-mode: both;
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 30px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fadeInDown {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
  }
}

#myInput {
  box-sizing: border-box;
  background-image: url('../../../public/SEARCH.svg');
  background-size: 15px 15px;
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 15px;
  padding: 12px 72px 10px 105px;
  border: none;
  border-bottom: 1px solid #ddd;
  width:600px;
}

#myInput:focus {outline: 3px solid #ddd;}

</style>
<script lang="ts">
import gnode from "../classes/gnode"
import gmenu from "../classes/gmenu"
import SelectComponent from "./SelectComponent.svelte"

export let draw:any
export let graph:any
export let menubuild:any
export let contextname = "context-menu"
export let menuitems = []

let value = new Array(menuitems.length)

let  nodeoptions:any = {
				horizontal:true,
				vertical:false,
				shapetype:'RECT',
				width:120,
				height:50
			}
let choicedim = 60

const locmenubuild = (x:any,y:any,width:any,height:any,gnode:any) =>{
		const menuitems: any[] = [
			{ name: 'EDIT', image: '/edit.svg', item: null },
			{ name: 'EXIT', image: '/close.svg', item: null }
		]
		const mwidth = 10
		const mheigth = 20
		const mopts = {
			//x:x+width-mwidth*menuitems.length,
			x:x+width/2,
			y:y+mheigth/4,
			width:mwidth,
			heigth:mheigth,
			menuitems:menuitems,
		}
		let m = new gmenu(gnode.node,mopts)
		const menu = m.draw()
		// ADD LISTENERS
		for (let i = 0; i < menu.menuitems.length; i++) {
			menu.menuitems[i].item.on("mouseover", (ev: any) => {
				menu.scale(1.5,i)
			})
			menu.menuitems[i].item.on("mouseout", (ev: any) => {
				menu.scale(1, i)
			})
			menu.menuitems[i].item.on("click", (ev: any) => {
				ev.stopPropagation()
				switch (menu.menuitems[i].name) {
					case 'EXIT':
						gnode.remove()
						break
				}
			})
		}
		return(menu)
}

let addNode = (ev:any) =>{
	const type = ev.target.id
	let mbuild:any
	let retitem:any
	for(let i=0; i< value.length;i++){
		if(value[i] && value[i].type == type)
			retitem = value[i]
	}
	if(retitem){
		switch(type){
			case "context-menu-operation-node":
				nodeoptions.shapetype = 'RECT'
				nodeoptions.nnametext="NODE-"+graph.getNodenum()
				mbuild= menubuild,
				nodeoptions.data={
					level:retitem.level,
					type:'TASK',
					name:retitem.label,
					image:retitem.image,
					shape:'RECT',
					width:120,
					height:50,
					imgwidth:15,
					imgheight:15,
					params:{},
					tasks:[]
				}
				nodeoptions.ndescrtext= retitem.label
				nodeoptions.width = 120
				nodeoptions.height = 50
				nodeoptions.imagefile = retitem.image
				nodeoptions.imgwidth = 15
				nodeoptions.imgheight = 15
				break
			case "context-menu-choice-node":
				nodeoptions.shapetype = 'ELLIPSE'
				mbuild=locmenubuild
				nodeoptions.nnametext=""
				nodeoptions.data={
					level:retitem.level,
					type:'CHOICE',
					name:'CHOICE',
					image:"/CHOICE.svg",
					shape:'ELLIPSE',
					width:choicedim,
					height:choicedim,
					imgwidth:15,
					imgheight:15,
					params:{}
				}
				nodeoptions.ndescrtext= retitem.label
				nodeoptions.width= choicedim
				nodeoptions.height = choicedim
				nodeoptions.imagefile = retitem.image
				nodeoptions.imgwidth = 15
				nodeoptions.imgheight = 15
				break
			case "context-menu-master-node":
				nodeoptions.shapetype = 'RECT'
				nodeoptions.nnametext="PHASE-"+graph.getNodenum()
				mbuild= menubuild,
				nodeoptions.data={
					level:retitem.level,
					type:'MASTER',
					name:'MASTER',
					image:"/MASTER.svg",
					shape:'RECT',
					width:120,
					height:80,
					imgwidth:30,
					imgheight:30,
					params:{}
				}
				nodeoptions.ndescrtext= retitem.label
				nodeoptions.width = 120
				nodeoptions.height = 80
				nodeoptions.imagefile = retitem.image
				nodeoptions.imgwidth = 30
				nodeoptions.imgheight = 30
				break
			case "context-menu-phase-node":
				nodeoptions.shapetype = 'RECT'
				nodeoptions.nnametext="PHASE-"+graph.getNodenum()
				mbuild= menubuild,
				nodeoptions.data={
					level:retitem.level,
					type:'PHASE',
					name:retitem.label,
					image:retitem.image,
					shape:'RECT',
					width:120,
					height:80,
					imgwidth:30,
					imgheight:30,
					params:{}
				}
				nodeoptions.ndescrtext= retitem.label
				nodeoptions.width = 120
				nodeoptions.height = 80
				nodeoptions.imagefile = retitem.image
				nodeoptions.imgwidth = 30
				nodeoptions.imgheight = 30
				break
			case "context-menu-isa-node":
				nodeoptions.shapetype = 'RECT'
				nodeoptions.nnametext="NODE-"+graph.getNodenum()
				mbuild= menubuild,
				nodeoptions.data={
					level:retitem.level,
					type:retitem.value,
					name:retitem.label,
					image:retitem.image,
					shape:'RECT',
					width:120,
					height:80,
					imgwidth:30,
					imgheight:30,
					params:{}
				}
				nodeoptions.ndescrtext= retitem.label
				nodeoptions.width = 120
				nodeoptions.height = 80
				nodeoptions.imagefile = retitem.image
				nodeoptions.imgwidth = 30
				nodeoptions.imgheight = 30
				break
		}
		const point = draw.point(ev.clientX, ev.clientY)
		const options = {
			x:point.x,
			y:point.y,
			nodeid:"NODE-"+graph.getNodenum(),
			nodenum:graph.getNodenum(),
		}
		const nopts = {
			...nodeoptions,
			...options,
		}
		let nd:any
		nd = new gnode(draw,mbuild,graph,null,nopts)
		nd.draw()
		graph.addNode(nd.getNodeInfo(),nd,draw)
	}
	let contextMenu = document.getElementById(contextname);
	 contextMenu.style.visibility = "hidden";
	 
}


</script>

<div class="context-menu" id="{contextname}">
  {#each menuitems as Menu}
		
	  <SelectComponent bind:value={value[Menu.uid-1]} name={Menu.name} itemId={Menu.id} handleChange={addNode} items={Menu.items}/>
  {/each}
</div>

 
<style>
.context-menu {
 background-color: #ffffff;
 box-shadow: 0 0 20px rgba(37, 40, 42, 0.22);
 color: #1f194c;
 width:18em;
 padding: 0.8em 0.6em;
 font-size: 0.8rem;
 position: fixed;
 visibility: hidden;
 z-index: 9999;
}

</style>
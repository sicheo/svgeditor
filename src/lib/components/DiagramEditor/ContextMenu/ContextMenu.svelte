<script lang="ts">
import gnode from "../classes/gnode"
import gmenu from "../classes/gmenu"

export let draw:any
export let graph:any
export let menubuild:any
export let contextname = "context-menu"
export let menuitems = [
	{uid:1,id:'context-menu-node',name:'Add Operation'},
	{uid:2,id:'context-menu-choice',name:'Add Choice'},
]

let operations:any[] = [
    {uid:1,name:'Dispensing',image:'/DISPENSING.svg'},
    {uid:2,name:'Inertization',image:'/REACTION.svg'},
    {uid:3,name:'Solid Reagents Loading',image:'/WORKUP.svg'},
    {uid:4,name:'Liquids Loading',image:'/ISOLATION.svg'},
    {uid:5,name:'Thermoregulation',image:'/CLEANING.svg'},
    {uid:6,name:'Distillation (vacuum)',image:'/DRYING.svg'},
    {uid:7,name:'Distillation (atmospheric)',image:'/MILLING.svg'},
    {uid:8,name:'Vacuum',image:'/DISPENSING.svg'},
    {uid:9,name:'Pressuriation',image:'/REACTION.svg'},
    {uid:10,name:'Flush',image:'/WORKUP.svg'},
    {uid:11,name:'Degasing',image:'/ISOLATION.svg'},
    {uid:12,name:'Stirring (multistep)',image:'/CLEANING.svg'},
    {uid:13,name:'Filtration',image:'/DRYING.svg'},
    {uid:14,name:'Discharge',image:'/MILLING.svg'},
    {uid:15,name:'Dosing Reagents',image:'/REACTION.svg'},
    {uid:16,name:'Sampling ',image:'/WORKUP.svg'},
    {uid:17,name:'Transfer',image:'/ISOLATION.svg'},
    {uid:18,name:'Recycle',image:'/CLEANING.svg'},
    {uid:19,name:'Rinse',image:'/DRYING.svg'},
    {uid:20,name:'Storage',image:'/MILLING.svg'},

]

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
	let operation:any
	switch(type){
		case "context-menu-node":
		    operation = ev.target.value
			nodeoptions.shapetype = 'RECT'
			nodeoptions.nnametext="NODE-"+graph.getNodenum()
			mbuild= menubuild,
			nodeoptions.data={level:'level0',type:'TASK',name:''}
			nodeoptions.ndescrtext= 'OPERATION'
			nodeoptions.width = 120
			nodeoptions.height = 50
			nodeoptions.imagefile = "/TASK.svg"
			nodeoptions.imgwidth = 15
			nodeoptions.imgheight = 15
			break
		case "context-menu-choice":
			nodeoptions.shapetype = 'ELLIPSE'
			//nodeoptions.nnametext="CHOICE-"+graph.getNodenum()
			mbuild=locmenubuild
			nodeoptions.nnametext=""
			nodeoptions.data={level:'level0',type:'CHOICE',name:''}
			nodeoptions.ndescrtext= 'CHOICE'
			nodeoptions.width= choicedim
			nodeoptions.height = choicedim
			nodeoptions.imagefile = "/CHOICE.svg"
			nodeoptions.imgwidth = 15
			nodeoptions.imgheight = 15
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
	let contextMenu = document.getElementById(contextname);
	 contextMenu.style.visibility = "hidden";
}


</script>

<div class="context-menu" id="{contextname}">
  <!--select id="context-menu-node" type="sourcedriver" name="select" on:change={addNode}>
	                <option value=""></option>
					{#each operations as Operation, index(Operation.uid)}
						<option value={Operation.name}>{Operation.name}</option>
					{/each}
 </!--select-->
  {#each menuitems as Menu}
	  <div class="item" id="{Menu.id}" on:click={addNode}>{Menu.name}</div>
  {/each}
</div>


<style>
.context-menu {
 background-color: #ffffff;
 box-shadow: 0 0 20px rgba(37, 40, 42, 0.22);
 color: #1f194c;
 width: 10em;
 padding: 0.8em 0.6em;
 font-size: 1rem;
 position: fixed;
 visibility: hidden;
}

.item {
 padding: 0.3em 1.2em;
}

.item:hover {
 background-color: rgba(44, 141, 247, 0.2);
 cursor: pointer;
}
</style>
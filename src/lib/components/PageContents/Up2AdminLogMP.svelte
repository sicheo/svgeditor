<script lang="ts">
import { onMount} from "svelte";
import SvelteTable from "svelte-table";
import InputComponent from "../TaskEditor/InputComponent.svelte";
import {getLogs} from '../../script/api.js'
import {mock} from '../../ustore.js'


let rows = []

onMount(async ()=>{
   const response = await getLogs($mock)
   rows = response.data
   console.log("****** Up2CloneLogMP ******",rows)

 });

 const onInputComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
    //console.log("*** ON INPUT COMPONENT ****", index,tag,value)
     if(index > -1)
        rows[index][tag] = value
}


 const  columns = [
  {
    key: "user",
    title: "USER",
    value: (v:any) => v.user,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.user.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.user.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"user",onInputComponent },
      },
  },
  {
    key: "action",
    title: "ACTION",
    value: (v:any) => v.action,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.action.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.action.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"action",onInputComponent },
      },
  },
  {
    key: "date",
    title: "DATE",
    value: (v:any) => v.date,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.date.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.date.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"date",onInputComponent },
      },
  },
  {
    key: "details",
    title: "DETAILS",
    value: (v:any) => v.details,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.details.charAt(0)
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase(),
          }
      })
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o:any, [k, v]) => ((o[k] = v), o), {})
      return Object.values(letrs)
    },
    filterValue: (v:any) => v.details.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"details",onInputComponent },
      },
  },
  
  
]

</script>
	
	<div class= "class-panel-row">
		<SvelteTable columns="{columns}" bind:rows="{rows}"/>
	</div>


<style>
.class-panel-row {
  display: block;
  justify-content:left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  font-weight: bold;
}

.table-header-class{
     text-align: left;
     color: red;
}
</style>
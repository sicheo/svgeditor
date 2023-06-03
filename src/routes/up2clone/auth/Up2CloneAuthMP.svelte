<script lang="ts">
import { onMount} from "svelte";
import SvelteTable from "svelte-table";
import EditComponent from "../../../lib/components/TaskEditor/EditComponent.svelte";
import SelectComponent from "../../../lib/components/TaskEditor/SelectComponent.svelte";
import InputComponent from "../../../lib/components/TaskEditor/InputComponent.svelte";
import TextAreaComponent from "../../../lib/components/TaskEditor/TextAreaComponent.svelte";
import {getMasters} from '../../../lib/script/api.js'



let rows = []

onMount(async ()=>{
   const response = await getMasters(null,true)
   rows = response.data
   console.log("****** Up2CloneAuthMP ******",rows)

 });

 const onInputComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
    //console.log("*** ON INPUT COMPONENT ****", index,tag,value)
     if(index > -1)
        rows[index][tag] = value
}

const onTextAreaComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
     if(index > -1)
        rows[index][tag] = value
}

const onSelectComponent = (row:any,tag:any,value:any) =>{
    const index = rows.findIndex((item:any) => { return (item.id == row.id ) })
     if(index > -1)
        rows[index][tag] = value
}

let statusOptions = [
    {id: 1,name:"AUTH"},
    {id:2,name:"NOAUTH"}
]

let optionsArray = [
    {name: "status", options: statusOptions}
]

 const  columns = [
  {
    key: "id",
    title: "ID",
    value: (v:any) => v.uid,
    sortable: true,
    selectOnClick:true,
    headerClass: "table-header-class",
  },
  {
    key: "description",
    title: "DESCRIPTION",
    value: (v:any) => v.description,
    sortable: false,
     renderComponent: {
        component: TextAreaComponent,
        props: { typeTag:"description",onTextAreaComponent },
      },
  },
  {
    key: "doc",
    title: "DOCUMENT",
    value: (v:any) => v.doc,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.doc.charAt(0)
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
    filterValue: (v:any) => v.doc.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"doc",onInputComponent },
      },
  },
  {
    key: "status",
    title: "STATUS",
    value: (v:any) => v.status,
    sortable: true,
    //renderValue: (v:any) => v.checkType.toUpperCase(),
    filterOptions: ["AUTH","NOAUTH"],
    renderComponent: {
        component: SelectComponent,
        props: { typeTag:"status",optionsArray, onSelectComponent },
      },
  },
  {
    key: "authdate",
    title: "DATE",
    value: (v:any) => v.authdate,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.authdate.charAt(0)
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
    filterValue: (v:any) => v.authdate.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"authdate",onInputComponent },
      },
  },
  {
    key: "product",
    title: "PRODUCT",
    value: (v:any) => v.product,
    sortable: true,
    filterOptions: (rows:any) => {
      // use first letter of last_name to generate filter
      let letrs:any = {}
      rows.forEach((row:any) => {
        let letr = row.product.charAt(0)
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
    filterValue: (v:any) => v.product.charAt(0).toLowerCase(),
    renderComponent: {
        component: InputComponent,
        props: { typeTag:"product",onInputComponent },
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
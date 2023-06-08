<script lang="ts">
import { onMount} from 'svelte';

export let node:any ={
    data:{
        params:{}
    }
}
export let color = "Teal"
       
onMount(async ()=>{
      //console.log("***** MASTER PANEL ****",node)

  });





</script>

<div class="class-panel-content">
    <div class = "class-parameter-list">
	    <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    Doc Code
	                <input type="text" name="name"  bind:value="{node.data.params.doccode}" class="panel-input panel-input-text">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    Product Code
	                <input type="text" name="name"  bind:value="{node.data.params.prodcode}"  class="panel-input panel-input-text">
                </label>
        </div>
        <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    Project Code
	                <input type="text" name="name"  bind:value="{node.data.params.projcode}"  class="panel-input panel-input-text">
                </label>
        </div>
         <div class= "class-panel-row">
                <label class= "class-panel-cell">
                    SAP Code
	                <input type="text" name="name"  bind:value="{node.data.params.sapcode}"  class="panel-input panel-input-text">
                </label>
        </div>
    </div>
</div>

<style>
.panel-input-text{
	 width: auto;
}

.panel-input{
	 max-width: 100px;
     font-size: smaller;
     color: teal;
}

.class-panel-content {
  display: flexbox;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(50px, auto);
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  font-weight: bold;
  padding-top: 10px;
}

.class-parameter-list {
  overflow: auto;
 
}

.class-panel-row {
  display: flex;
  justify-content:left;
  font-size: smaller;
}


label {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  width: 200px;
  line-height: 22px;
  margin-bottom: 10px;
}

input {
  height: 20px;
  flex: 0 0 80px;
  margin-left: 5px;
}

</style>
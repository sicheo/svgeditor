<script lang="ts">


export let node = null
export let color
export let paramsCols=[]
export let paramName = ""
export let paramType = ""
export let paramRows=[]


const exitPage = (ev:any)=>{
	const div = document.getElementById("modal-master-params-div-id")
    if(div)
        div.style.display = 'none'
}

const saveObj = (ptype:any)=>{
	const objtype = Object.prototype.toString.call(node.data.params[ptype])
	if(objtype == '[object Array]'){
		node.data.params[paramType] = []
		for(let i=0; i< paramRows.length; i++){
			let row = {}
			for(let j=0;j<paramsCols.length;j++){
				row[paramsCols[j].name] = paramRows[i][j]
			}
			node.data.params[ptype].push(row)
		}
	}
	if(objtype == '[object Object]'){
		let row = {}
		for(let j=0;j<paramsCols.length;j++){
			row[paramsCols[j].name] = paramRows[j]
		}
		node.data.params[ptype] = row
	}
	console.log("*** SAVE OBJTYPE ***",objtype,node.data.params[ptype],paramRows )
}

const Save = (ev:any)=>{
	// Back from paramsRows to node.data
	saveObj(paramType)
}

const Add = (ev:any)=>{
	const row = new Array(paramsCols.length)
	paramRows.push(row)
	paramRows = paramRows
}

const deleteRow = (ev:any)=>{
	const target = ev.target
	const index = target.parentElement.parentElement.rowIndex
	paramRows.splice(index, 1)
	paramRows = paramRows
}

const editRow = (ev:any)=>{
	const target = ev.target
	const row = target.parentElement.parentElement
	for (var i = 0; i < row.childNodes.length; i++) {
		if (row.childNodes[i].className && row.childNodes[i].className.includes("input-cell")) {
		  const inputs = row.childNodes[i].childNodes
		  for(let j=0; j< inputs.length;j++){
			  if(inputs[j].disabled)
				inputs[j].disabled = false
			  else
				inputs[j].disabled = true
		  }
		}        
	}
}

</script>

    <div class="sign-dialog-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				{paramName.toLocaleUpperCase()}
				<div class="class-last-item">
					<input type="image" src="/add.svg" on:click={Add} alt="Submit" width="25" height="25"> 
					<input type="image" src="/SAVE.svg" on:click={Save} alt="Submit" width="25" height="25"> 
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body">
			<table id="params-table-id">
				<thead>
					{#each paramsCols as param}
						<th style="--background-color:{color};">
							 {param.header}
						</th>
					 {/each}
				</thead>
				<tbody>
					{#each paramRows as row}
					   <tr>
						{#each row as field,i}
							<td class="input-cell">
								{#if paramsCols[i].type == "string"}
									<input size={(paramsCols[i].size?paramsCols[i].size:12)} type="text" value={field} disabled/>
								{:else if paramsCols[i].type == "boolean"}
								    <input size={(paramsCols[i].size?paramsCols[i].size:12)} type="checkbox" checked={field} disabled/>
								{:else if paramsCols[i].type == "date"}
									<input size={(paramsCols[i].size?paramsCols[i].size:12)} type="datetime-local" value={field} disabled/>
								{:else if paramsCols[i].type == "password"}
									<input size={(paramsCols[i].size?paramsCols[i].size:12)} type="password" value={field} disabled/>
								{:else if paramsCols[i].type == "number"}
									<input size={(paramsCols[i].size?paramsCols[i].size:8)} style="width: 70px;" type="number" value={field} disabled/>
								{/if}
							</td>
						{/each}
							<td>
								<input  type="image" alt="image" width=20 height=20 src="/edit.svg"  on:click={editRow}/>
							</td>
							<td>
								<input  type="image" alt="image" width=20 height=20 src="/DELETE.svg"  on:click={deleteRow}/>
							</td>
					    </tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

<style>

.sign-dialog-class{
	font-family: Arial, Helvetica, sans-serif;
	color: #777777;
	background-color: white ;
	width: 100%;
	min-height: 300px;
	height: 100%;
	margin: auto;
}

.class-panel-header {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

.class-panel-body {
  display: flex;
  justify-content: space-between;
  color: var(--color);
  font-weight: bold ;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
  color: white ;
  background-color: var(--background-color) ;
  opacity: 0.5 ;
  font-size: 15px;
}

</style>
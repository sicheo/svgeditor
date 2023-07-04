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
</script>

    <div class="sign-dialog-class">
		<div class="class-panel-header" style="border-bottom: 1px solid;--color:{color};">
				{paramName.toLocaleUpperCase()}
				<div class="class-last-item">
					<input type="image" src="/EXIT.svg" on:click={exitPage} alt="Submit" width="25" height="25"> 
				</div>
		</div>
		<div class="class-panel-body">
			<table id="params-table-id">
				<thead>
					{#each paramsCols as param}
					 <th style="--background-color:{color}">
						 {param.header}
					</th>
					 {/each}
				</thead>
				<tbody>
					{#each paramRows as row}
					   <tr>
						{#each row as field}
							<td>
								<input size=14 type="text" value={field} disabled/>
							</td>
						{/each}
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
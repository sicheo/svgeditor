<script lang="ts">
// https://jsgrids.statico.io/
 import {
    createSvelteTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
  } from '@tanstack/svelte-table'
    import { writable } from 'svelte/store'


  export let data:any
  export let columns:any
  export let color:any

  let sorting = []

  const setSorting = updater => {
    if (updater instanceof Function) {
      sorting = updater(sorting)
    } else {
      sorting = updater
    }
    options.update(old => ({
      ...old,
      state: {
        ...old.state,
        sorting,
      },
    }))
  }

  const setRowSelection = ()=>{
      console.log("SET ROW SELECTION")
  }
  const options = writable(
    {
      data,
      columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
      debugRows: true,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
    }
  )
  const refreshData = () => {
    console.info('refresh')
    options.update(prev => ({
      ...prev,
      data: data,
    }))
  }
  const rerender = () => {
    options.update(options => ({
      ...options,
      data,
    }))
  }
  const table = createSvelteTable(options)
</script>

<div class="p-2">
  <div class="h-2" />
  <table>
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th style="--color:{color};">
              {#if !header.isPlaceholder}
                <svelte:component
                  this={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                />
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $table.getRowModel().rows.slice(0, 10) as row}
        <tr>
          {#each row.getVisibleCells() as cell}
            <td>
              <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
    <tfoot>
      
    </tfoot>
  
</div>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
  color: var(--color) ;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
</style>
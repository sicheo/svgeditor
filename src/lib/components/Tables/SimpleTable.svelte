<script lang="ts">
// https://jsgrids.statico.io/
// https://www.npmjs.com/package/gridjs

 import { onMount} from "svelte";

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
  export let tableOptions = {pagination:true}

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
    console.info('rerender')
    options.update(options => ({
      ...options,
      data,
    }))
  }
  let table = createSvelteTable(options)

  const onGoToPage = (e:any) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              $table.setPageIndex(page)
            }
  const onSelect = (e:any) => {
              $table.setPageSize(Number(e.target.value))
            }
</script>

<div class="p-2">
  <div class="h-2" />
  <table id="tanstack-table-id">
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th style="--background-color:{color}">
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
    </table>
    {#if tableOptions.pagination}
    <div class="pagination-tool-class">
        <input type="button" class="" value="<<" on:click={() => $table.setPageIndex(0)}>
        <input type="button" class="" value="<" on:click={() => $table.previousPage()}>
        <input type="button" class="" value=">" on:click={() => $table.nextPage()}>
        <input type="button" class="" value=">>" on:click={() => $table.setPageIndex($table.getPageCount() - 1)}>
        <span class="flex items-center gap-1">
          Page
          <strong>
            {$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}
          </strong>
        </span>
        <span>
            | Go to Page:
            <input type="number" class="" value="{$table.getState().pagination.pageIndex + 1}" on:change={onGoToPage}>
        </span>
        <select value={$table.getState().pagination.pageSize} on:change={onSelect}>
            <option value=10>Show 10</option>
            <option value=20>Show 20</option>
            <option value=30>Show 30</option>
            <option value=40>Show 40</option>
        </select>
    </div>
    {/if}
  
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
  color: white ;
  background-color: var(--background-color) ;
  opacity: 0.5 ;
  font-size: 15px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
.pagination-tool-class{
    margin-top: 15px;
}
</style>
<script lang="ts">
// https://jsgrids.statico.io/
// https://www.npmjs.com/package/gridjs

 import { onMount} from "svelte";

 import {
    createSvelteTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
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
      etPaginationRowModel: getPaginationRowModel(),
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
      console.log("**** SELECT *****",e.target.value)
              $table.setPageSize(Number(e.target.value))
              refreshData()
            }
  const onFirstPage = (e:any) =>{
      $table.setPageIndex(0)
      refreshData()
  }
  const onPrevPage = (e:any) =>{
      $table.previousPage()
      refreshData()
  }
  const onNextPage = (e:any) =>{
      
      if($table.getState().pagination.pageIndex < ($table.getPageCount()-1))
        $table.nextPage()
      refreshData()
  }
  const onLastPage = (e:any) =>{
      $table.setPageIndex($table.getPageCount() - 1)
      refreshData()
  }
</script>

<div class="p-2">
  <div class="h-2" />
  <table id="tanstack-table-id">
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th style="--background-color:{color};cursor:pointer;">
              {#if !header.isPlaceholder}
              <div class:cursor-pointer={header.column.getCanSort()} class:select-none={header.column.getCanSort()} on:click={header.column.getToggleSortingHandler()}>
                <svelte:component this={flexRender( header.column.columnDef.header, header.getContext())}/>
                {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted().toString()] ?? ''}
                </div>
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $table.getPaginationRowModel().rows.slice($table.getState().pagination.pageIndex*$table.getState().pagination.pageSize, ($table.getState().pagination.pageIndex+1)*$table.getState().pagination.pageSize) as row}
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
        <input type="button" class="" value="<<" on:click={onFirstPage}>
        <input type="button" class="" value="<" on:click={onPrevPage}>
        <input type="button" class="" value=">" on:click={onNextPage}>
        <input type="button" class="" value=">>" on:click={onLastPage}>
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
        <select  on:change={onSelect}>
            <option value=2>Show 10</option>
            <option value=3>Show 20</option>
            <option value=4>Show 30</option>
            <option value=5>Show 40</option>
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
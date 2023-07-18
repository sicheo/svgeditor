<script lang="ts">
// https://jsgrids.statico.io/
// https://www.npmjs.com/package/gridjs

 import { onMount} from "svelte";
 import {sleep} from '../../script/api.js'
 import { _ } from 'svelte-i18n'




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
  export let refreshDataExt:any

 
  let sorting = []

  const getLocalData = ()=>{
      return data
  }

  const refreshListener = async (ev:any)=>{
           console.log("EV LISTENER",ev.detail)
           data = ev.detail
           refreshDataExt()
        }

  onMount(async ()=>{
       const div = document.getElementById("tanstack-table-id")
       div.addEventListener("refreshtable",refreshListener)
    });

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
      data:data,
      columns:columns,
      state: {
        sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: false,
      debugRows: false,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
    }
  )
  const refreshData = () => {
    options.update(prev => ({
      ...prev,
      data: getLocalData(),
    }))
  }

  
  refreshDataExt = async()=>{
      //await sleep(500)
      //$table.setPageIndex($table.getPageCount() - 1)
      $table.setPageIndex($table.getPageCount() - 1)
      await sleep(300)
      refreshData()
  }

  const rerender = () => {
    options.update(options => ({
      ...options,
      data,
    }))
  }
  let table = createSvelteTable(options)

  const onGoToPage = (e:any) => {
              const page = e.target.value
              if(page > 0 && page <= $table.getPageCount())
                $table.setPageIndex(page-1)
            }
  const onSelect = (e:any) => {
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
          {$_("table-page")}
          <strong>
            {$table.getState().pagination.pageIndex + 1} {$_("table-page-of")} {$table.getPageCount()}
          </strong>
        </span>
        <span>
            | {$_("table-gotopage")}
            <input type="number" class="" min=1 max={$table.getPageCount()} value="{$table.getState().pagination.pageIndex + 1}" on:change={onGoToPage}>
        </span>
        <select  on:change={onSelect}>
            <option value=5>{$_("table-option-show")} 5</option>
            <option value=10>{$_("table-option-show")} 10</option>
            <option value=15>{$_("table-option-show")} 15</option>
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
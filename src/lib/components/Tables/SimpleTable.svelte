<script lang="ts">
// https://jsgrids.statico.io/
// https://www.npmjs.com/package/gridjs

 import { onMount} from "svelte";
 import {sleep} from '../../script/api.js'
 import { _ } from 'svelte-i18n'
 import TableFilter from './TableFilter.svelte'



 import {
    createSvelteTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    flexRender
  } from '@tanstack/svelte-table'
    import { writable } from 'svelte/store'

  

  export let data:any
  export let columns:any
  export let color:any
  export let tableOptions = {pagination:true}
  export let refreshDataExt:any
  export let viewOptions = { showGotoPage:true,showPageSize:true}
  export let fontsize = '15px'
  export let pagesize = '10'

 
  let sorting = []
  let rowselection = []
  let columnFilters = []
  let paginationState = {
                pageIndex: 0,
                pageSize: 5
            }

  const getLocalData = ()=>{
      return data
  }

  const refreshListener = async (ev:any)=>{
           data = ev.detail
           refreshDataExt()
        }

  onMount(async ()=>{
       const div = document.getElementById("tanstack-table-id")
       if(div)
            div.addEventListener("refreshtable",refreshListener)
        $table.setPageSize(Number(pagesize))
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

  const setColumnFilters = updater => {
    if (updater instanceof Function) {
      columnFilters = updater(columnFilters)
    } else {
      columnFilters = updater
    }
    options.update(old => ({
      ...old,
      state: {
        ...old.state,
        columnFilters,
      },
    }))
  }

 /* const setPaginationState = updater => {
    if (updater instanceof Function) {
      initialState = updater(initialState)
    } else {
      initialState = updater
    }
    options.update(old => ({
      ...old,
      state: {
        ...old.state,
        initialState,
      },
    }))
  }*/

  const setRowSelection = updater => {
    if (updater instanceof Function) {
      rowselection = updater(rowselection)
    } else {
      rowselection = updater
    }
    options.update(old => ({
      ...old,
      state: {
        ...old.state,
        rowselection,
      },
    }))
  }



  const options = writable(
    {
      data:data,
      columns:columns,
      state: {
        sorting,
        columnFilters
      },
      initialState: {
          paginationState
      },
      onColumnFiltersChange: setColumnFilters,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      debugTable: false,
      debugRows: false,
      enableRowSelection: true,
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
  
  const selectOptions = [
      {value:5},
      {value:10},
      {value:15}
  ]
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
            <th style="--background-color:{color};cursor:pointer;--font-size:{fontsize}">
              {#if !header.isPlaceholder}
                  <div class:cursor-pointer={header.column.getCanSort()} class:select-none={header.column.getCanSort()} on:click={header.column.getToggleSortingHandler()}>
                    <svelte:component this={flexRender( header.column.columnDef.header, header.getContext())}/>
                    {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted().toString()] ?? ''}
                   </div>
                  {#if header.column.getCanFilter() }
                    <div class="tablefilter">
                        <TableFilter column={header.column} table={$table} />
                    </div>
                  {/if}
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $table.getRowModel().rows as row}
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
        {#if viewOptions.showGotoPage}
            <span>
                | {$_("table-gotopage")}
                <input type="number" class="" min=1 max={$table.getPageCount()} value="{$table.getState().pagination.pageIndex + 1}" on:change={onGoToPage}>
            </span>
        {/if}
        {#if viewOptions.showPageSize}
        <select  on:change={onSelect} >
            {#each selectOptions as Option}
                {#if Option.value == $table.getState().pagination.pageSize}
                    <option value={Option.value} selected>{$_("table-option-show")} {Option.value}</option>
                {:else}
                    <option value={Option.value}>{$_("table-option-show")} {Option.value}</option>
                {/if}
            {/each}
        </select>
        {/if}
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
  opacity: 0.6 ;
  font-size: var(--font-size);
  text-align: center;
  vertical-align: top;
  
}

.tablefilter{
    width: 100%;
    background-color: #eeeeee ;
}
tfoot {
  color: gray;
}

.pagination-tool-class{
    margin-top: 15px;
}
</style>
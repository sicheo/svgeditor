<script lang="ts">
// https://jsgrids.statico.io/
// https://www.npmjs.com/package/gridjs

 import { onMount} from "svelte";
 import {sleep} from '../../script/api.js'
 import { _ } from 'svelte-i18n'
 import TableFilter from './TableFilter.svelte'
 import {dragElement} from '../../script/utils.js'


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
  export let viewOptions = { showGotoPage:true,showPageSize:true,paginationBgColor:"#FFFFFF",paginationColor:"#777777",border:'none'}
  export let fontsize = '16px'
  export let pagesize = '10'
  export let title = ""
  export let id = ""

 
  let sorting = []
  let rowselection = []
  let columnFilters = []
  let paginationState = {
                pageIndex: 0,
                pageSize: 5
            }
  
  let footcols = 3

  const getLocalData = ()=>{
      return data
  }

  const refreshListener = async (ev:any)=>{
           data = ev.detail
           refreshDataExt()
        }

  onMount(async ()=>{
       const div = document.getElementById("tanstack-table-id"+id)
       if(div)
            div.addEventListener("refreshtable",refreshListener)
        $table.setPageSize(Number(pagesize))
        const headerGroup = $table.getHeaderGroups()
        if(headerGroup.length >0)
            footcols = headerGroup[0].headers.length
        const dragable = document.getElementById("tanstack-table-id"+id);
		const dragzone = document.getElementById("dragzone"+id);
		dragElement(dragable, dragzone);
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

<div class="up2twin-table-class" >
  <div class="h-2-table-class" />
  <table id="{'tanstack-table-id'+id}">
    <thead id="{'dragzone'+id}">
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          <th id="headercols" colspan={footcols} style="--font-size:{fontsize}">
              <div class="tabletoolbar">{title}</div>
         </th>
        </tr>
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
        <th id="footercols" colspan={footcols}>
            {#if tableOptions.pagination}
                <div class="pagination-tool-class" style="--border:{viewOptions.border};--background-color:{viewOptions.paginationBgColor};--color:{viewOptions.paginationColor}">
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
        </th>
    </tfoot>
    </table>
  
</div>

<style global>


</style>
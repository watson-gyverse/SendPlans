import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import styled from 'styled-components'
import type { AgingData } from './AgingType'
import TableHeader from './TableHeader'
import columns from './Column'

function NewTable(props: { data: AgingData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data: props.data,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div>
      <table className='inline-block border border-black shadow rounded'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader header={header} table={table} key={header.id} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ textAlign: 'center' }}>
              {row.getVisibleCells().map((cell) => (
                <TableData key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableData>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewTable

const TableData = styled.td`
  max-width: 10rem;
  white-space: normal;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
`

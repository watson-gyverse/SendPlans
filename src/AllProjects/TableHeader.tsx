import { flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'
import styled from 'styled-components'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { Filter } from './Filter'

function TableHeader({ header, table }) {
  return (
    <TableHeaderStyle key={header.id} colSpan={header.colSpan}>
      <div>
        <Sorter
          width={header.getSize()}
          isSortable={header.column.getCanSort()}
          onClick={header.column.getToggleSortingHandler()}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {
            {
              asc: <FaSortUp />,
              desc: <FaSortDown />,
            }[header.column.getIsSorted()]
          }
          {header.column.getCanSort() && !header.column.getIsSorted() ? (
            <FaSort />
          ) : null}
        </Sorter>
        <ColumnFilter>
          {header.column.getCanFilter() ? (
            <div>
              <Filter column={header.column} table={table} />
            </div>
          ) : null}
        </ColumnFilter>
      </div>
    </TableHeaderStyle>
  )
}

export default TableHeader

const TableHeaderStyle = styled.th`
  padding: 5px 10px 5px 10px;
  border-bottom: solid 3px salmon;
  background-color: #1f3864;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
`
const ColumnFilter = styled.div`
  select {
    border: none;
    background-color: transparent;
  }
`
const Sorter = styled.div<ISorter>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.isSortable ? 'pointer' : 'default')};
`

interface ISorter {
  width: number
  isSortable: boolean
}

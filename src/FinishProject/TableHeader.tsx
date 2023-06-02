import { flexRender } from '@tanstack/react-table'
import styled from 'styled-components'

function TableHeader({ header }) {
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
        </Sorter>
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
const Sorter = styled.div<ISorter>`
  width: ${(props) => props.width};
  cursor: ${(props) => (props.isSortable ? 'pointer' : 'default')};
`

interface ISorter {
  width: number
  isSortable: boolean
}

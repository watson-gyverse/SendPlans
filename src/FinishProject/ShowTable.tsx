import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import FinishModal from './FinishModal'
import { Mobile, PC } from '../MediaQuery'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FinishAgingData } from './AgingType'
import TableHeader from './TableHeader'

function ShowTable(props) {
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [IsFinishModalOpen, setFinishModalOpen] = useState(false)
  const [values, setValues] = useState()
  const [disabled, setDisabled] = useState(false)

  const style = { width: '6rem', height: '100%' }

  const columns = useMemo<ColumnDef<FinishAgingData>[]>(
    () => [
      {
        header: () => (
          <p style={{ width: '8rem', height: '100%' }}>숙성 종료하기</p>
        ),
        accessorKey: 'finish',
        cell: (value) => {
          return (
            <div>
              <StyledButton
                onClick={() => handleModalOpenClick(value)}
                disabled={disabled}
              >
                숙성종료
              </StyledButton>
            </div>
          )
        },
      },
      {
        header: () => <p style={style}>시작일</p>,
        accessorKey: 'startDate', // accessor is the "key" in the data
      },
      {
        header: '위치',
        columns: [
          {
            header: () => <p style={style}>냉장고번호</p>,
            accessorKey: 'fridgeNum',
          },
          {
            header: () => <p style={{ width: '1.5rem', height: '100%' }}>층</p>,
            accessorKey: 'machineNum',
          },
        ],
      },
      {
        header: '고기정보',
        columns: [
          {
            header: () => <p style={style}>육종</p>,
            accessorKey: 'species',
          },
          {
            header: () => <p style={style}>부위</p>,
            accessorKey: 'cut',
          },
          {
            header: () => <p style={style}>등급</p>,
            accessorKey: 'grade',
          },
          {
            header: () => (
              <p style={style}>
                숙성 전<br />
                무게(g)
              </p>
            ),
            accessorKey: 'beforeWeight',
          },

          {
            header: () => (
              <p style={{ width: '4rem', height: '100%' }}>
                단가
                <br />
                (원/100g)
              </p>
            ),
            accessorKey: 'price',
          },
          {
            header: () => (
              <p style={{ width: '100%', height: '100%' }}>이력번호</p>
            ),
            accessorKey: 'meatNumber',
          },
        ],
      },
      {
        header: '세팅 정보',
        columns: [
          {
            header: () => <p style={style}>설정 온도</p>,
            accessorKey: 'initTemp',
            cell: (props) => {
              return props.getValue() === -100 ? <></> : <>{props.getValue()}</>
            },
          },
          {
            header: () => <p style={style}>설정 습도</p>,
            accessorKey: 'initHumid',
            cell: (props) => {
              return props.getValue() === -1 ? <></> : <>{props.getValue()}</>
            },
          },
          {
            header: () => <p style={style}>설정 팬 속도</p>,
            accessorKey: 'fanSpeed',
            cell: (props) => {
              return props.getValue() === -1 ? <></> : <>{props.getValue()}</>
            },
          },
        ],
      },

      {
        header: () => (
          <span style={{ display: 'inline-block', width: '200px' }}>메모</span>
        ),
        accessorKey: 'memo',
      },
    ],
    []
  )

  function handleClickSubmit() {
    props.onRefresh()
    setIsModalOpen(false)
    setFinishModalOpen(true)
  }

  function handleClickCancel() {
    setIsModalOpen(false)
  }
  function handleFinishModalClickCancel() {
    setFinishModalOpen(false)
  }

  function handleModalOpenClick(value) {
    setValues(value.row.original)
    setIsModalOpen(true)
  }

  const table = useReactTable({
    data: props.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <PC>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} header={header} />
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
      </PC>
      <Mobile>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} header={header} />
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
      </Mobile>

      <FinishModal
        data={values}
        isOpen={IsModalOpen}
        onSubmit={handleClickSubmit}
        onCancel={handleClickCancel}
      />
      <ReactModal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            width: '30%',
            height: '20%',
            top: '30%',
            left: '30%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
        }}
        isOpen={IsFinishModalOpen}
        onRequestClose={handleFinishModalClickCancel}
      >
        <h4>완료처리되었습니다</h4>
        <CloseButton onClick={handleFinishModalClickCancel}>확인</CloseButton>
      </ReactModal>
    </div>
  )
}

export default ShowTable

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
`

const CloseButton = styled.button`
  width: 60%;
  height: 45%;
  margin: 0 20% 0 20%;
`
const TableData = styled.td`
  max-width: 10rem;
  white-space: normal;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
`

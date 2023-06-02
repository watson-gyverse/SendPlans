import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import ReactModal from 'react-modal'

type SortBy = {
  id: string
  desc: boolean
}

function ShowTable(props) {
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [IsFinishModalOpen, setFinishModalOpen] = useState(false)
  const [values, setValues] = useState()
  const [disabled, setDisabled] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy[]>([])
  useEffect(() => {
    setDisabled(props.fridgeNumber === '')
  }, [])

  const onHeaderClick = (column) => {
    const isSorted = sortBy.findIndex((sort) => sort.id === column.id) > -1

    const newSortBy = isSorted
      ? sortBy.map((sort) =>
          sort.id === column.id
            ? {
                ...sort,
                desc: !sort.desc,
              }
            : sort
        )
      : // 현재 정렬 순서에 없는 경우에는 새로운 열을 정렬 순서에 추가
        [
          ...sortBy,
          {
            id: column.id,
            desc: false,
          },
        ]
    // 정렬 순서 업데이트
    setSortBy(newSortBy)
  }

  const style = { width: '8rem', height: '100%' }
  const style100 = { width: '100%', height: '100%' }

  const columns = useMemo(
    () => [
      {
        Header: () => <p style={style}>시작일</p>,
        accessor: 'startDate', // accessor is the "key" in the data
        sortingFn: 'auto',
      },

      {
        Header: () => <p style={style}>냉장고번호</p>,
        accessor: 'fridgeNum',
      },
      {
        Header: () => <p style={style}>층</p>,
        accessor: 'machineNum',
      },
      {
        Header: () => <p style={style}>육종</p>,
        accessor: 'species',
      },
      {
        Header: () => <p style={style}>부위</p>,
        accessor: 'cut',
      },
      {
        Header: () => <p style={{ width: '10rem' }}>등급</p>,
        accessor: 'grade',
        Cell: (props) => {
          return props.value === '등외(무등급)' ? <>등외</> : <>{props.value}</>
        },
      },
      {
        Header: () => <p style={style100}>숙성 전 무게(g)</p>,
        accessor: 'beforeWeight',
      },
      {
        Header: () => <p style={style100}>숙성 후 무게(g)</p>,
        accessor: 'afterWeight',
      },
      {
        Header: () => <p style={style}>설정 온도</p>,
        accessor: 'initTemp',
        Cell: (props) => {
          return props.value === -100 ? <></> : <>{props.value}</>
        },
      },
      {
        Header: () => <p style={style}>설정 습도</p>,
        accessor: 'initHumid',
        Cell: (props) => {
          return props.value === -1 ? <></> : <>{props.value}</>
        },
      },
      {
        Header: () => <p style={style}>설정 팬 속도</p>,
        accessor: 'fanSpeed',
        Cell: (props) => {
          return props.value === -1 ? <></> : <>{props.value}</>
        },
      },
      {
        Header: () => <p style={style}>단가(원/㎏)</p>,
        accessor: 'price',
      },
      {
        Header: () => (
          <p
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            이력번호
          </p>
        ),
        accessor: 'meatNumber',
      },
      {
        Header: () => <p style={style}>종료일</p>,
        accessor: 'endDate',
      },
      {
        Header: () => <p style={{ width: '100%', height: '100%' }}>메모</p>,
        accessor: 'memo',
        disableSortBy: true,

        Cell: (props) => {
          return props.value === -100 ? <></> : <>{props.value}</>
        },
      },
    ],
    []
  )
  const data = useMemo(() => props.data, [props.data])
  console.log(data)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        manualSortBy: true,
        disableMultiSort: true,
        initialState: { sortBy },
      },
      useSortBy
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

  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                    </span>
                  </div>
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableData {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableData>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

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
  margin: 0.5rem 0.2rem 0.2rem;
`

const CloseButton = styled.button`
  width: 60%;
  height: 45%;
  margin: 0 20% 0 20%;
`

const TableHeader = styled.th`
  padding: 5px 10px 5px 10px;
  border-bottom: solid 3px salmon;
  background-color: #1f3864;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
`
const TableData = styled.td`
  height: 1.2rem;
  text-align: center;
  padding: 4px 10px 4px 10px;
  border: solid 1px gray;
  background-color: #bfbfbf;
`

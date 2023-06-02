import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { AgingData } from './AgingType'
import { ThreeStepComma } from '../Style/const'

const columnHelper = createColumnHelper<AgingData>()
const columns = [
  columnHelper.group({
    header: '일자',
    columns: [
      columnHelper.accessor('startDate', {
        id: 'startDate',
        cell: (info) => info.getValue(),
        header: () => '시작일',
      }),
      columnHelper.accessor('endDate', {
        cell: (info) => info.getValue(),
        header: () => <span>종료일</span>,
      }),
    ],
  }),
  columnHelper.group({
    id: 'Fridge',
    header: '기기 위치',
    columns: [
      columnHelper.accessor('fridgeNum', {
        header: '냉장고번호',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('machineNum', {
        header: '층',
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'Meat',
    header: '고기 정보',
    columns: [
      columnHelper.accessor('species', {
        header: '육종',
        cell: (info) => info.getValue(),
        filterFn: 'equalsString',
      }),
      columnHelper.accessor('cut', {
        header: '부위',
        cell: (info) => info.getValue(),
        filterFn: 'equalsString',
      }),
      columnHelper.accessor('grade', {
        header: '등급',
        enableColumnFilter: false,
        cell: (info) => {
          return <p style={{ width: '6rem' }}>{info.getValue()}</p>
        },
      }),
      columnHelper.accessor('beforeWeight', {
        header: '숙성 전 무게(g)',
        cell: (info) => ThreeStepComma(info.getValue().toString()) + 'g',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('afterWeight', {
        header: '숙성 후 무게(g)',
        cell: (info) =>
          info.getValue() === '숙성 중'
            ? info.getValue()
            : ThreeStepComma(info.getValue()) + 'g',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('finalWeight', {
        header: '손질 후 무게(g)',
        cell: (info) =>
          !info.getValue() ? '' : ThreeStepComma(info.getValue()) + 'g',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('loss', {
        header: '수분감량(g)',
        cell: (info) =>
          !info.getValue() ? '' : ThreeStepComma(info.getValue()) + 'g',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('finalLoss', {
        header: '최종감량(g)',
        cell: (info) =>
          !info.getValue()
            ? ''
            : ThreeStepComma(info.getValue().toString()) + 'g',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('lossP', {
        header: '수분감량(%)',
        cell: (info) =>
          !info.getValue() ? '' : info.getValue().toFixed(2) + '%',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('finalLossP', {
        header: '최종감량(%)',
        cell: (info) =>
          !info.getValue() ? '' : info.getValue().toFixed(2) + '%',
        enableColumnFilter: false,
      }),
      columnHelper.accessor('price', {
        header: '단가(원/100g)',
        cell: (info) =>
          !info.getValue() ? '' : ThreeStepComma(info.getValue()),
        enableColumnFilter: false,
      }),
      columnHelper.accessor('meatNumber', {
        header: '이력번호',
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      }),
    ],
  }),
  columnHelper.group({
    id: 'Settings',
    header: '세팅 정보',
    columns: [
      columnHelper.accessor('initTemp', {
        header: '설정 온도',
        cell: (info) => {
          return info.getValue() === -100 ? (
            <></>
          ) : (
            <span>{info.getValue()}</span>
          )
        },
        enableColumnFilter: false,
      }),
      columnHelper.accessor('initHumid', {
        header: '설정 습도',
        cell: (info) => {
          return info.getValue() === -1 ? <></> : <span>{info.getValue()}</span>
        },
        enableColumnFilter: false,
      }),
      columnHelper.accessor('fanSpeed', {
        header: '설정 팬속도',
        cell: (info) => {
          return info.getValue() === -1 ? <></> : <span>{info.getValue()}</span>
        },
        enableColumnFilter: false,
      }),
    ],
  }),
  columnHelper.accessor('memo', {
    header: () => {
      return (
        <span style={{ display: 'inline-block', width: '200px' }}>메모</span>
      )
    },
    cell: (info) => info.getValue(),
    enableSorting: false,
    enableColumnFilter: false,
  }),
]

export default columns

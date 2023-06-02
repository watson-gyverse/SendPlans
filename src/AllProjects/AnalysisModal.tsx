import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import type { AgingData } from './AgingType'
import { BeefCuts, PorkCuts } from '../Style/const'
import {
  BasicTableStyle,
  BasicTdStyle,
  BasicThStyle,
} from '../Style/MainStyledComponents'
import moment from 'moment'

type ChartProps = {
  data: AgingData[]
  isOpen: boolean
  onCancel: any
}

function AnalysisModal({ data, isOpen, onCancel }: ChartProps) {
  const notThis = '숙성 중'
  const [species, setSpecies] = useState('')
  const [cut, setCut] = useState('')
  const [isBeef, setIsBeef] = useState(true)
  const cutList = isBeef ? BeefCuts : PorkCuts

  function onSpeciesChanges(e: string) {
    if (e == '소') {
      setIsBeef(true)
      setSpecies('소')
    } else {
      setIsBeef(false)
      setSpecies('돼지')
    }
  }
  function onCutChanges(e: string) {
    setCut(e)
  }

  const handleClickCancel = () => {
    onCancel()
  }
  const filteredData = data.filter(
    (item) =>
      item.cut === cut && item.species === species && item.endDate !== notThis
  )

  //숙성일
  const sumDate = filteredData.reduce(function add(sum, currValue) {
    let s = moment(currValue.startDate, 'YYYY. MM. DD').utcOffset(9)
    let e = moment(currValue.endDate, 'YYYY. MM. DD').utcOffset(9)
    return sum + moment.duration(e.diff(s)).asDays()
  }, 0)

  const deviDateSum = filteredData.reduce(function add(sum, currValue) {
    let s = moment(currValue.startDate, 'YYYY. MM. DD').utcOffset(9)
    let e = moment(currValue.endDate, 'YYYY. MM. DD').utcOffset(9)
    let diff = moment.duration(e.diff(s)).asDays()
    return sum + Math.pow(diff - sumDate / filteredData.length, 2)
  }, 0)

  //수분감량
  const sumHumLoss = filteredData.reduce(function add(sum, currValue) {
    return sum + (currValue.beforeWeight - Number(currValue.afterWeight))
  }, 0)

  const deviHumLossSum = filteredData.reduce(function add(sum, currValue) {
    return sum + Math.pow(currValue.loss - sumHumLoss / filteredData.length, 2)
  }, 0)

  //수분감량%
  const sumHumLossP = filteredData.reduce(function add(sum, currValue) {
    let v =
      ((currValue.beforeWeight - Number(currValue.afterWeight)) * 100) /
      currValue.beforeWeight
    return sum + v
  }, 0)

  const deviHumLossPSum = filteredData.reduce(function add(sum, currValue) {
    let v =
      ((currValue.beforeWeight - Number(currValue.afterWeight)) * 100) /
      currValue.beforeWeight
    return sum + Math.pow(v - sumHumLossP / filteredData.length, 2)
  }, 0)

  //원가
  const sumPrice = filteredData.reduce(function add(sum, currValue) {
    let v = Number(currValue.price)
    return sum + v
  }, 0)

  const deviPriceSum = filteredData.reduce(function add(sum, currValue) {
    let v = Number(currValue.price)
    return sum + Math.pow(v - sumPrice / filteredData.length, 2)
  }, 0)

  //온도
  const filteredTempData = data.filter(
    (item) =>
      item.cut === cut &&
      item.species === species &&
      item.endDate !== notThis &&
      typeof item.initTemp !== 'undefined' &&
      item.initTemp !== -100
  )

  const sumTemp = filteredTempData.reduce(function add(sum: number, currValue) {
    if (
      currValue.initTemp === -100 ||
      typeof currValue.initTemp === 'undefined'
    )
      return sum
    let v = currValue.initTemp
    return Number(sum) + Number(v)
  }, 0)

  const deviTempSum = filteredTempData.reduce(function add(sum, currValue) {
    if (
      currValue.initTemp === -100 ||
      typeof currValue.initTemp === 'undefined'
    )
      return sum

    let v = currValue.initTemp
    return (
      Number(sum) + Math.pow(Number(v) - sumTemp / filteredTempData.length, 2)
    )
  }, 0)
  const filteredHumidData = data.filter(
    (item) =>
      item.cut === cut &&
      item.species === species &&
      item.endDate !== notThis &&
      item.initHumid !== -1 &&
      typeof item.initHumid !== 'undefined'
  )
  const sumHumid = filteredHumidData.reduce(function add(
    sum: number,
    currValue
  ) {
    if (
      currValue.initHumid === -1 ||
      typeof currValue.initHumid === 'undefined'
    )
      return sum
    let v = currValue.initHumid
    return Number(sum) + Number(v)
  },
  0)

  const deviHumidSum = filteredHumidData.reduce(function add(sum, currValue) {
    if (
      currValue.initHumid === -1 ||
      typeof currValue.initHumid === 'undefined'
    )
      return sum
    let v = currValue.initHumid
    return (
      Number(sum) + Math.pow(Number(v) - sumHumid / filteredHumidData.length, 2)
    )
  }, 0)
  const filteredFanData = data.filter(
    (item) =>
      item.cut === cut &&
      item.species === species &&
      item.endDate !== notThis &&
      typeof item.fanSpeed !== 'undefined' &&
      item.fanSpeed !== -1
  )
  const sumFan = filteredFanData.reduce(function add(sum: number, currValue) {
    if (currValue.fanSpeed === -1 || typeof currValue.fanSpeed === 'undefined')
      return sum
    let v = currValue.fanSpeed
    console.log(Number(sum) + Number(v))
    console.log(filteredFanData)
    return Number(sum) + Number(v)
  }, 0)

  const deviFanSum = filteredFanData.reduce(function add(sum, currValue) {
    if (currValue.fanSpeed === -1 || typeof currValue.fanSpeed === 'undefined')
      return sum
    let v = currValue.fanSpeed
    return (
      Number(sum) + Math.pow(Number(v) - sumFan / filteredFanData.length, 2)
    )
  }, 0)
  return (
    <ReactModal
      ariaHideApp={false}
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
          width: '60%',
          height: '70%',
          top: '15%',
          left: '15%',
          right: 0,
          bottom: 0,
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
      isOpen={isOpen}
      onRequestClose={handleClickCancel}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20rem' }}>
          <h3>숙성 횟수</h3>
          <div style={{ display: 'flex' }}>
            <BasicTableStyle>
              <tr>
                <BasicThStyle>소</BasicThStyle>
                <BasicTdStyle>
                  {
                    data.filter(
                      (item) =>
                        item.species === '소' && item.endDate !== notThis
                    ).length
                  }
                  회
                </BasicTdStyle>
              </tr>
              <tr>
                <BasicThStyle>돼지</BasicThStyle>
                <BasicTdStyle>
                  {
                    data.filter(
                      (item) =>
                        item.species === '돼지' && item.endDate !== notThis
                    ).length
                  }
                  회
                </BasicTdStyle>
              </tr>
            </BasicTableStyle>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button onClick={() => onSpeciesChanges('소')}>조회하기</button>
              <button onClick={() => onSpeciesChanges('돼지')}>조회하기</button>
            </div>
          </div>
        </div>
        <div style={{ width: '20rem' }}>
          <h3>숙성 부위별 횟수</h3>
          <BasicTableStyle
            style={{ display: species === '' ? 'none' : 'block' }}
          >
            {cutList.map((it) => {
              return (
                <tr>
                  <BasicThStyle>{it}</BasicThStyle>
                  <BasicTdStyle>
                    {data.filter(
                      (item) =>
                        item.cut === it &&
                        item.species === species &&
                        item.endDate !== notThis
                    ).length + '회'}
                  </BasicTdStyle>
                  <button onClick={() => onCutChanges(it)}>조회하기</button>
                </tr>
              )
            })}
          </BasicTableStyle>
        </div>
        <div>
          <h3>부위 별 통계</h3>
          <BasicTableStyle style={{ display: cut === '' ? 'none' : 'block' }}>
            <tr>
              <BasicThStyle>항목</BasicThStyle>
              <BasicThStyle>값</BasicThStyle>
              <BasicThStyle>표준편차</BasicThStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 숙성일</BasicThStyle>
              <BasicTdStyle>
                {(sumDate / filteredData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviDateSum / filteredData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 수분감량</BasicThStyle>
              <BasicTdStyle>
                {(sumHumLoss / filteredData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviHumLossSum / filteredData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 수분감량률</BasicThStyle>
              <BasicTdStyle>
                {(sumHumLossP / filteredData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviHumLossPSum / filteredData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 원가</BasicThStyle>
              <BasicTdStyle>
                {(sumPrice / filteredData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviPriceSum / filteredData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 숙성 온도</BasicThStyle>
              <BasicTdStyle>
                {(sumTemp / filteredTempData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviTempSum / filteredTempData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 숙성 습도</BasicThStyle>
              <BasicTdStyle>
                {(sumHumid / filteredHumidData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviHumidSum / filteredHumidData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
            <tr>
              <BasicThStyle>평균 숙성 풍속</BasicThStyle>
              <BasicTdStyle>
                {(sumFan / filteredFanData.length).toFixed(2)}
              </BasicTdStyle>
              <BasicTdStyle>
                {Math.sqrt(deviFanSum / filteredFanData.length).toFixed(2)}
              </BasicTdStyle>
            </tr>
          </BasicTableStyle>
        </div>
      </div>
    </ReactModal>
  )
}

export default AnalysisModal

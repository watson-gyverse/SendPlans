import { useEffect, useState } from 'react'
import { Mobile, PC } from '../MediaQuery'
import styled from 'styled-components'
import DropDown from '../Dropdown'
import {
  StyledH2,
  StyledInput,
  MobileCategory,
  MobileInput,
  StyledMeMo,
  StyledMemoInput,
} from '../Style/MainStyledComponents'
import { Axios } from 'axios'
import LoadingIcons from 'react-loading-icons'

export interface OtherSettings {
  setSpecies: (n: string) => void
  setIsBeef: (n: boolean) => void
  setWhere: (n: string) => void
  setIsLocal: (n: boolean) => void
  setCountry: (n: string) => void
  setGrade: (n: string) => void
  memo: string
  setMemo: (n: string) => void
  setFridgeNumber: (n: number) => void
  setFloorNumber: (n: number) => void
  weight: number
  setWeight: (n: number) => void
  price: number
  setPrice: (n: number) => void
  meatNumber: string
  setMeatNumber: (n: string) => void
  initTemp: number | undefined
  setTemp: (n: number) => void
  initHumid: number | undefined
  setHumid: (n: number) => void
  fanSpeed: number | undefined
  setFanSpeed: (n: number) => void
  showMgOptions: boolean
  setShowMgOptions: (n: boolean) => void
}

function SetOtherSettings({ props }: { props: OtherSettings }) {
  const fridgeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const floorList = [1, 2, 3, 4, 5]
  const fanSpeedList = [0, 1, 2, 3]

  const nInitTemp = props.initTemp
  const nInitHumid = props.initHumid

  const showMe = '미트가이버 옵션 보기'
  const hideMe = '미트가이버 옵션 숨기기'
  const [buttonText, setButtonText] = useState(hideMe)

  useEffect(() => {
    if (props.showMgOptions) {
      setButtonText(hideMe)
    } else {
      setButtonText(showMe)
    }
  }, [props.showMgOptions])

  const onMemoChange = (e: any) => {
    const limit = 1200
    props.setMemo(e.target.value.slice(0, limit))
  }

  const onInitTempChange = (e: any) => {
    const limit = 3
    props.setTemp(e.target.value.slice(0, limit))
  }
  const onInitHumidChange = (e: any) => {
    const limit = 2

    props.setHumid(e.target.value.slice(0, limit))
  }
  const openMgOptions = () => {
    console.log('열어봐')
    props.setShowMgOptions(!props.showMgOptions)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <PC>
        <div style={{ display: 'flex', height: '400px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              justifyContent: 'space-evenly',
            }}
          >
            <StyledH2>냉장고 번호 :</StyledH2>
            <StyledH2>기기 위치(층) :</StyledH2>
            <StyledH2>냉장고 온도(℃) :</StyledH2>
            <StyledH2>습도 입력(%) :</StyledH2>
            <StyledH2>팬 속도 :</StyledH2>
            <StyledMeMo>메모 :</StyledMeMo>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-evenly',
              width: '600px',
            }}
          >
            <DropDown onChange={props.setFridgeNumber}>{fridgeList}</DropDown>
            <div>
              <DropDown onChange={props.setFloorNumber}>{floorList}</DropDown>
              <h4
                style={{
                  fontWeight: '400',
                  margin: '0 0 0 20px',
                }}
              >
                ※ 숙성고 내 선반 맨 아래칸 부터 1층으로 지정합니다.
              </h4>
            </div>
            <StyledInput
              type='number'
              name='initTemp'
              placeholder=''
              value={nInitTemp === -100 ? '' : nInitTemp}
              onChange={onInitTempChange}
            />
            <StyledInput
              type='number'
              name='initHumid'
              placeholder=''
              value={nInitHumid === -1 ? '' : nInitHumid}
              onChange={onInitHumidChange}
            />
            <DropDown onChange={props.setFanSpeed}>{fanSpeedList}</DropDown>
            <StyledMemoInput
              inputMode='text'
              type='text'
              name='memo'
              placeholder=''
              value={props.memo || ''}
              onChange={onMemoChange}
            />
          </div>
          {/* <h4>
          ※ 프로젝트를 등록하실 때 아래 옵션창을 닫으셨다면, 해당 옵션이 함께
          등록되지 않습니다.
        </h4> */}
        </div>

        {/* <MGOptionButton onClick={openMgOptions}>{buttonText}</MGOptionButton>
        <MeatGyverOptions expanded={props.showMgOptions}>
          <StyledH2>
            냉장고 온도 입력(℃)
            <StyledInput
              type='number'
              name='initTemp'
              placeholder=''
              value={nInitTemp === -100 ? '' : nInitTemp}
              onChange={onInitTempChange}
            />
          </StyledH2>
          <StyledH2>
            습도 입력(%)
            <StyledInput
              type='number'
              name='initHumid'
              placeholder=''
              value={nInitHumid === -1 ? '' : nInitHumid}
              onChange={onInitHumidChange}
            />
          </StyledH2>
          <StyledH2>
            팬 속도{' '}
            <DropDown onChange={props.setFanSpeed}>{fanSpeedList}</DropDown>
          </StyledH2>
        </MeatGyverOptions> */}
      </PC>
      <Mobile>
        <div style={{ display: 'flex', height: '300px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '140px',
              justifyContent: 'space-evenly',
            }}
          >
            <MobileCategory>냉장고 번호 :</MobileCategory>
            <MobileCategory>기기 위치(층) :</MobileCategory>
            <MobileCategory>냉장고 온도(℃) :</MobileCategory>
            <MobileCategory>습도 입력(%) :</MobileCategory>
            <MobileCategory>팬 속도 :</MobileCategory>
            <MobileCategory>메모 :</MobileCategory>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'space-evenly',
              width: '600px',
            }}
          >
            <DropDown onChange={props.setFridgeNumber}>{fridgeList}</DropDown>
            <div style={{ height: '2rem' }}>
              <DropDown onChange={props.setFloorNumber}>{floorList}</DropDown>
              <h5
                style={{
                  fontWeight: '400',
                  margin: '0 0 0 20px',
                }}
              >
                ※ 숙성고 내 선반 맨 아래칸부터 1층으로 지정합니다.
              </h5>
            </div>
            <MobileInput
              type='number'
              name='initTemp'
              placeholder=''
              value={nInitTemp}
              onChange={onInitTempChange}
            />
            <MobileInput
              type='number'
              name='initHumid'
              placeholder=''
              value={nInitHumid}
              onChange={onInitHumidChange}
            />{' '}
            <DropDown onChange={props.setFanSpeed}>{fanSpeedList}</DropDown>
            <StyledMemoInput
              inputMode='text'
              type='text'
              name='memo'
              placeholder=''
              value={props.memo || ''}
              onChange={onMemoChange}
            />
          </div>
        </div>
      </Mobile>
    </div>
  )
}

export default SetOtherSettings
const MeatGyverOptions = styled.div<{ expanded }>`
  display: ${(p) => (p.expanded ? 'flex' : 'none')};
  flex-direction: column;
  margin: 0;
  padding-left: 0;
`

const MGOptionButton = styled.button`
  width: 15rem;
  font-size: 1.3rem;
`
const MobileMGOptionButton = styled.button`
  width: 15rem;
  font-size: 1.3rem;
`

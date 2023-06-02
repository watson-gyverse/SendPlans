import styled from 'styled-components'
import { Mobile, PC } from '../MediaQuery'
import { MobileTitle, Body, MobileBody } from '../Style/MainStyledComponents'
const titleText = (
  <>
    지금 숙성 중인 고기 딱 세개만, 우선 등록해보세요!
    <br />
    사장님 업장만의 특별한 숙성레시피, 이제부터 시작입니다.{' '}
  </>
)

const bodyText = (
  <>
    안녕하세요 <br /> 숙성 기술과 솔루션을 개발하는
    <br />
    부산의 스타트업 (주)가이버스 입니다. <br />
    <br />
    보다 많은 사장님들께서 주먹구구식 숙성이 아닌, <br />
    숙성을 관리하고 기록하며
    <br />
    보다 체계적인 우리 업장만의 숙성 시스템을 만들어
    <br />
    맛있고 균일한 맛의 숙성 프로세스로
    <br />
    사장님의 번거로움은 줄이고,
    <br />
    손님의 만족은 높이는 데에
    <br />
    많은 도움이 되었으면 합니다.
  </>
)

function Intro() {
  return (
    <Background>
      <PC>
        <Title>{titleText}</Title>
        <Body>
          <StyledH3>{bodyText}</StyledH3>
        </Body>
      </PC>
      <Mobile>
        <MobileTitle>{titleText}</MobileTitle>
        <MobileBody>
          <StyledH3>{bodyText}</StyledH3>
        </MobileBody>
      </Mobile>
    </Background>
  )
}

const Background = styled.div`
  background-color: #f2f2f2;
  margin: 0;
  min-height: 90vh;
  padding-right: 2rem;
`

const Title = styled.h1`
  background-color: #d8d8d8;
  padding: 8px 2rem 8px 8px;
  margin: 0;
  height: 5.5rem;
`

const StyledH3 = styled.h3`
  padding: 0;
  margin: 0;
`
export default Intro

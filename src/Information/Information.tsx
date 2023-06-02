import React from 'react'
import styled from 'styled-components'
import QR_HOME from '../Images/qrcode_gyverse.png'
import QR_KAKAO from '../Images/qrcode_kakao.png'
import QR_INSTA from '../Images/qrcode_instagram.png'
import { Mobile, PC } from '../MediaQuery'
import { Background } from '../Style/MainStyledComponents'
function Information() {
  return (
    <Background>
      <PC>
        <Title>무엇이든 물어보세요!</Title>
        <Body>
          <h2 style={{ fontWeight: '500' }}>
            미트가이버는 드라이 에이징 숙성고를 자체 개발하고
            <br />
            숙성 기술을 연구/개발하는 스타트업 입니다.
            <br />
            <br />
            고기와 숙성을 사랑하는 분들의 많은 관심과 의견 부탁드립니다.
            <br />
            <br />
            아래 카카오톡 오픈채팅방 등을 통해
            <br />
            숙성 관련 질문을 남겨 주시면,
            <br />
            집단 지성을 통해 보다 정확한 답변을 드릴 수 있을 겁니다.
            <br />
            <br />꼭 숙성이 아니더라도, 축산업 관련 분들의 참여도 환영합니다!
          </h2>
          <h3>바로가기를 클릭하시면 이동합니다.</h3>
          <HorizonDiv>
            <VerticalDiv>
              <a href='https://open.kakao.com/o/g1FXH3Zc' target='_blank'>
                <LinkButton>바로가기</LinkButton>
              </a>
              <StyledImg src={QR_KAKAO}></StyledImg>
              <h3>오픈채팅방</h3>
            </VerticalDiv>
            <VerticalDiv>
              <a href='https://www.instagram.com/meat.gyver/' target='_blank'>
                <LinkButton>바로가기</LinkButton>
              </a>
              <StyledImg src={QR_INSTA}></StyledImg>
              <h3>인스타그램</h3>
            </VerticalDiv>
            <VerticalDiv>
              <a href='http://gyverse.com/' target='_blank'>
                <LinkButton>바로가기</LinkButton>
              </a>
              <StyledImg src={QR_HOME}></StyledImg>
              <h3>홈페이지</h3>
            </VerticalDiv>
          </HorizonDiv>
        </Body>
      </PC>
      <Mobile>
        <MobileTitle>무엇이든 물어보세요!</MobileTitle>
        <MobileBody>
          <h4 style={{ fontWeight: '500' }}>
            미트가이버는 드라이 에이징 숙성고를 자체 개발하고 숙성 기술을
            연구/개발하는 스타트업 입니다.
            <br />
            <br />
            고기와 숙성을 사랑하는 분들의 많은 관심과 의견 부탁드립니다.
            <br />
            <br />
            아래 카카오톡 오픈채팅방 등을 통해
            <br />
            숙성 관련 질문을 남겨 주시면,
            <br />
            집단 지성을 통해 보다 정확한 답변을 드릴 수 있을 겁니다.
            <br />
            <br />꼭 숙성이 아니더라도, 축산업 관련 분들의 참여도 환영합니다!
          </h4>
          <h4>아래 링크로 이동하실 수 있습니다.</h4>

          <VerticalDiv>
            <a
              style={{ marginBottom: '1rem' }}
              href='https://open.kakao.com/o/g1FXH3Zc'
              target='_blank'
            >
              <LinkButton>오픈채팅방</LinkButton>
            </a>
            <a
              style={{ marginBottom: '1rem' }}
              href='https://www.instagram.com/meat.gyver/'
              target='_blank'
            >
              <LinkButton>인스타그램</LinkButton>
            </a>
            <a href='http://gyverse.com/' target='_blank'>
              <LinkButton>가이버스</LinkButton>
            </a>
          </VerticalDiv>
        </MobileBody>
      </Mobile>
    </Background>
  )
}

export default Information

const Title = styled.h1`
  background-color: #d8d8d8;
  padding: 8px 8px 8px 1rem;
  margin: 0;
  height: 5vh;
`
const Body = styled.div`
  padding: 12px 20px;
  margin: 0;
`

const MobileTitle = styled.h2`
  font-size: 1.2rem;
  background-color: #d8d8d8;
  margin: auto;
  padding: 10px 0 10px 10px;
`
const MobileBody = styled.div`
  padding-left: 12px;
  margin: 0;
`
const LinkButton = styled.button`
  width: 10rem;
  height: 2rem;
  font-size: 1.2rem;
  background-color: #ffffff;
`

const HorizonDiv = styled.div`
  display: flex;
`

const VerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
`

const StyledImg = styled.img`
  min-height: 8rem;
  width: 8rem;
`

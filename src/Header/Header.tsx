import React from 'react'
import styled from 'styled-components'
import Logo from '../Images/Logo.png'
import { PC, Mobile } from '../MediaQuery'
function Header() {
  return (
    <StyledBorder>
      <PC>
        <StyledH1>미트가이버 숙성 관리 시스템</StyledH1>
        <StyledImg src={Logo}></StyledImg>
        {/* <InsertStoreName storeName={storeName} /> */}
      </PC>
      <Mobile>
        <StyledH2>
          미트가이버
          <br />
          숙성 관리 시스템
        </StyledH2>
        <MobileImg src={Logo}></MobileImg>
      </Mobile>
    </StyledBorder>
  )
}

export default Header

const StyledBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: #ffffff;
  margin: 0;
  width: 100vw;
`

const StyledH1 = styled.h1`
  display: inline-block;
  width: 60rem;
  height: 50%;
  margin-left: 1.5rem;
`
const StyledH2 = styled.h2`
  margin-right: 4rem;
  margin-left: 1rem;
  height: 50%;
  font-size: 1.2rem;
  width: 90%;
`

const StyledImg = styled.img`
  height: 8vh;
  min-height: 2rem;
  width: 5rem;
  margin-left: auto;
  margin-right: 5rem;
`

const MobileImg = styled.img`
  height: 8vh;
  min-height: 1rem;
  width: 3rem;
  margin-left: auto;
  margin-right: 1rem;
`

import RadioContext from './RadioContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { Mobile, PC } from '../../MediaQuery'
import { Constant } from '../../Style/const'

function BlueRadio({ children, value }) {
  const group = useContext(RadioContext)

  return (
    <StyledSpan>
      <PC>
        <StyledBlueInput
          id={value}
          type='radio'
          value={value}
          checked={
            group.value !== undefined ? value === group.value : undefined
          }
          onChange={(e) => group.onChange && group.onChange(e.target.value)}
        />
        <StyledLabel htmlFor={value}>{children}</StyledLabel>
      </PC>
      <Mobile>
        <MobileBlueInput
          id={value}
          type='radio'
          value={value}
          checked={
            group.value !== undefined ? value === group.value : undefined
          }
          onChange={(e) => group.onChange && group.onChange(e.target.value)}
        />
        <MobileLabel htmlFor={value}>{children}</MobileLabel>
      </Mobile>
    </StyledSpan>
  )
}

const StyledSpan = styled.span``

const StyledLabel = styled.label`
  padding: 10px 20px 10px 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  display: inline-block;
  background-color: #aaa;
  color: white;
  font-size: 1.3rem;
`

const StyledBlueInput = styled.input.attrs({ type: 'radio' })`
  display: none;
  &:checked + ${StyledLabel} {
    background-color: ${Constant.MG_Blue};
  }
`

const MobileLabel = styled.label`
  padding: 4px 8px 4px 8px;
  margin-right: 8px;
  margin-bottom: 5px;
  display: inline-block;
  background-color: #aaa;
  color: white;
  font-size: 1.3rem;
`

const MobileBlueInput = styled.input.attrs({ type: 'radio' })`
  display: none;
  &:checked + ${MobileLabel} {
    background-color: ${Constant.MG_Blue};
  }
`

export default BlueRadio

import RadioContext from './RadioContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { Mobile, PC } from '../../MediaQuery'

function Radio({ children, value }) {
  const group = useContext(RadioContext)

  return (
    <StyledSpan>
      <PC>
        <StyledInput
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
        <MobileInput
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

const StyledInput = styled.input.attrs({ type: 'radio' })`
  display: none;
  &:checked + ${StyledLabel} {
    background-color: red;
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

const MobileInput = styled.input.attrs({ type: 'radio' })`
  display: none;
  &:checked + ${MobileLabel} {
    background-color: red;
  }
`

export default Radio

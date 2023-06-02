import { useState } from 'react'
import styled from 'styled-components'

function Dropdown(props) {
  const [category, setCategory] = useState<any>()

  const handleCategoryChange = (category) => {
    props.onChange(category)
    setCategory(category)
    console.log(category)
  }
  return (
    <StyledDropDown
      name='category'
      value={category}
      onChange={(e) => handleCategoryChange(e.currentTarget.value)}
    >
      {props.children.map((n: string, index: React.Key) => (
        <StyledDropDownItems key={index} id={n}>
          {n}
        </StyledDropDownItems>
      ))}
    </StyledDropDown>
  )
}

const StyledDropDown = styled.select`
  width: 120px;
  height: 2rem;
  margin-left: 1rem;
  font-size: 24px;
`

const StyledDropDownItems = styled.option`
  font-size: 20px;
`

export default Dropdown

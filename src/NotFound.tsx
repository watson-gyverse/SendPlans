import React, { useState } from 'react'
import styled from 'styled-components'
import { useStoreContext } from './StoreContext'
function NotFound() {
  const [newStoreName, setNewStoreName] = useState('')
  const { setStoreName } = useStoreContext()
  const onStoreNameChange = (e) => {
    setNewStoreName(e.target.value)
    setStoreName(e.target.value)
  }

  return (
    <StyledBorder>
      <h1>Not Found 051</h1>
      <h2>유효하지않은 주소입니다</h2>
      <h2>아래에 매장명을 입력하고 상단 버튼을 클릭해 이동해주세요</h2>
      <StyledInput
        type='text'
        value={newStoreName}
        onChange={onStoreNameChange}
      />
    </StyledBorder>
  )
}

export default NotFound
const StyledBorder = styled.div`
  padding-top: 20px;
  margin-left: 20px;
`

const StyledInput = styled.input`
  width: 80%;
  height: 3rem;
  font-size: 2rem;
`

import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStoreContext } from '../StoreContext'
import { Mobile, PC } from '../MediaQuery'
import {
    Background,
    Title,
    Body,
    MobileTitle,
    MobileBody,
} from '../Style/MainStyledComponents'
import { setUrl } from '../Style/const'

function Main() {
    const [newStoreName, setNewStoreName] = useState('')
    const { setStoreName } = useStoreContext()
    const onStoreNameChange = (e: any) => {
        setNewStoreName(e.target.value)
    }
    const onClickButtons = (newStoreName: string) => {
        setStoreName(newStoreName)
    }
    // useEffect(() => {
    //   setStoreName('')
    // }, [])

    return (
        <Background>
            <PC>
                <Title>관리 매장 등록/조회</Title>
                <Body>
                    <h2>
                        아래에 매장명을 입력하고 하단 버튼을 클릭해 이동해주세요
                    </h2>
                    <PCInput
                        type='text'
                        value={newStoreName}
                        onChange={onStoreNameChange}
                    />
                    <h3 style={{ fontWeight: '500' }}>
                        ※ 한 번 등록된 매장명은 변경하기 어렵습니다.
                    </h3>
                    <h3 style={{ fontWeight: '500' }}>
                        ※ 기억하기 쉽고 간단한 매장명을 추천합니다.
                    </h3>
                    <h3 style={{ fontWeight: '500' }}>
                        ※ 타 매장과 중복되지 않도록, 매장명 뒤에 자주 사용하는
                        숫자 등으로 구별하는 것을 추천합니다.
                    </h3>
                    <h3 style={{ fontWeight: '500' }}>
                        ※이미 입력을 하셨었다면, 왼쪽 사이드메뉴에서 이동할 수
                        있습니다.
                    </h3>
                    <div style={{ display: `flex` }}>
                        <Link to={setUrl(`/create/${newStoreName}`)}>
                            <PCButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                생성하러
                                <br />
                                가기
                            </PCButton>
                        </Link>
                        <Link to={setUrl(`/finish/${newStoreName}`)}>
                            <PCButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                종료처리
                                <br />
                                하기
                            </PCButton>
                        </Link>

                        <Link to={setUrl(`/all/${newStoreName}`)}>
                            <PCButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                모두
                                <br />
                                조회하기
                            </PCButton>
                        </Link>
                    </div>
                </Body>
            </PC>
            <Mobile>
                <MobileTitle>관리 매장 등록/조회</MobileTitle>
                <MobileBody>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>
                        아래에 매장명을 입력하고<br></br>하단 버튼을 클릭해
                        이동해주세요
                    </h3>
                    <MobileInput
                        type='text'
                        value={newStoreName}
                        onChange={onStoreNameChange}
                    />
                    <div style={{ display: `flex` }}>
                        <Link to={setUrl(`/create/${newStoreName}`)}>
                            <MobileButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                시작
                            </MobileButton>
                        </Link>
                        <Link to={setUrl(`/finish/${newStoreName}`)}>
                            <MobileButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                완료
                            </MobileButton>
                        </Link>
                        <Link to={setUrl(`/all/${newStoreName}`)}>
                            <MobileButton
                                disabled={newStoreName.length < 2}
                                onClick={() => onClickButtons}
                            >
                                조회
                            </MobileButton>
                        </Link>
                    </div>
                    <h4 style={{ fontWeight: '500' }}>
                        ※ 한 번 등록된 매장명은 변경하기 어렵습니다.
                    </h4>
                    <h4 style={{ fontWeight: '500' }}>
                        ※ 기억하기 쉽고 간단한 매장명을 추천합니다.
                    </h4>
                    <h4 style={{ fontWeight: '500' }}>
                        ※ 타 매장과 중복되지 않도록, 매장명 뒤에 자주 사용하는
                        숫자 등으로 구별하는 것을 추천합니다.
                    </h4>
                    <h4 style={{ fontWeight: '500' }}>
                        ※이미 입력을 하셨었다면, 왼쪽 사이드메뉴에서 이동할 수
                        있습니다.
                    </h4>
                </MobileBody>
            </Mobile>
        </Background>
    )
}
export default Main

const PCInput = styled.input`
    width: 80%;
    height: 3rem;
    font-size: 2rem;
`

const MobileInput = styled.input`
    width: 90%;
    height: 2.5rem;
    font-size: 1.2rem;
`

const PCButton = styled.button`
    width: 6rem;
    height: 4rem;
    font-size: 1.2rem;
    margin: 10px;
`

const MobileButton = styled.button`
    width: 3rem;
    height: 2rem;
    font-size: 0.8rem;
    margin: 6px;
`

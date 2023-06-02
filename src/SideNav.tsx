import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useStoreContext } from './StoreContext'
import { PC, Mobile } from './MediaQuery'
import { useEffect } from 'react'
import { setUrl } from './Style/const'

function SideNav() {
    const { storeName, setStoreName } = useStoreContext()
    useEffect(() => {
        console.log(storeName + '!')
    }, [storeName])

    return (
        <div>
            <PC>
                <PCBar>
                    <PCLink to={setUrl('/intro')}>소개</PCLink>
                    <PCLink to={setUrl('/main')}>메인</PCLink>
                    <UList expanded={storeName.length > 1}>
                        <PCLink to={setUrl(`/create/${storeName}`)}>
                            생성하기
                        </PCLink>
                        <PCLink to={setUrl(`/finish/${storeName}`)}>
                            종료하기
                        </PCLink>
                        <PCLink to={setUrl(`/all/${storeName}`)}>
                            전부 조회
                        </PCLink>
                    </UList>
                    <PCLink to={setUrl('/info')}>숙성 질문</PCLink>
                </PCBar>
            </PC>
            <Mobile>
                <MobileBar>
                    <MobileLink to={setUrl('/intro')}>소개</MobileLink>
                    <MobileLink to={setUrl('/main')}>메인</MobileLink>
                    <UList expanded={storeName.length > 1}>
                        <MobileLink to={setUrl(`/create/${storeName}`)}>
                            생성<br></br>하기
                        </MobileLink>
                        <MobileLink to={setUrl(`/finish/${storeName}`)}>
                            종료<br></br>하기
                        </MobileLink>
                        <MobileLink to={setUrl(`/all/${storeName}`)}>
                            전부<br></br>조회
                        </MobileLink>
                    </UList>
                    <MobileLink to={setUrl('/info')}>
                        숙성<br></br>질문
                    </MobileLink>
                </MobileBar>
            </Mobile>
        </div>
    )
}

const PCBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 2px;
    height: 100%;
    width: 15vw;
    background-color: #262626;
`

const PCLink = styled(NavLink)`
    font-size: 1.4rem;
    text-align: center;

    display: block;
    margin-bottom: 2px;
    padding: 8px 0px;
    outline: 2px solid #000000;
    color: #ffffff;
    background-color: #262626;
    text-decoration: none;
    &:hover {
        color: #e86500;
        background-color: #ffffff;
    }
    &.active {
        background-color: #7f7f7f;
    }
`

const MobileBar = styled.div`
    justify-content: center;
    margin: 2px;
    height: 100%;
    width: 18vw;
    background-color: #262626;
`

const MobileLink = styled(NavLink)`
    font-size: 1rem;
    text-align: center;

    display: block;
    margin-bottom: 2px;
    padding: 8px 6px;
    outline: 2px solid #000000;
    color: #ffffff;
    background-color: #262626;
    text-decoration: none;
    &:hover {
        color: #e86500;
        background-color: #ffffff;
    }
    &.active {
        color: #ffffff;
        background-color: #7f7f7f;
    }
`

const UList = styled.ul<{ expanded: boolean }>`
    display: ${(p) => (p.expanded ? 'flex' : 'none')};
    flex-direction: column;
    margin: 0;
    padding-left: 0;
`
export default SideNav

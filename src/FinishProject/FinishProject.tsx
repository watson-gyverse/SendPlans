import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import initializeApp from '../Firebase'
import ShowTable from './ShowTable'
import {
    collection,
    query,
    getFirestore,
    where,
    getDocs,
    orderBy,
    Timestamp,
} from 'firebase/firestore'
import { useStoreContext } from '../StoreContext'
import { useParams } from 'react-router-dom'
import { Mobile, PC } from '../MediaQuery'
import { ThreeStepComma } from '../Style/const'

function FinishProject() {
    const { storeName: storeName } = useParams()
    const { setStoreName } = useStoreContext()

    useEffect(() => {
        if (storeName !== undefined) {
            setStoreName(storeName)
        }
    }, [storeName])

    const db = getFirestore(initializeApp)
    const dbRef = collection(db, 'AgingPlans')
    const q = query(
        dbRef,
        where('place', '==', storeName),
        orderBy('startDate')
    )

    const [dataArray, setDataArray] = useState([{}])
    const handleButtonClick = async () => {
        GetData(q, setDataArray)
    }

    return (
        <div>
            <PC>
                <Background>
                    <Title>▶현재 매장명 : {storeName}</Title>
                    <Body>
                        <HorizonDiv>
                            <>
                                <h3>
                                    현재 진행 중인 숙성과정을 종료처리 할 수
                                    있습니다
                                    <br />
                                    (※조회가 안 될 경우, '조회'버튼을 한 번 더
                                    클릭해주세요)
                                </h3>

                                <StyledButton onClick={handleButtonClick}>
                                    조회하기
                                </StyledButton>
                            </>
                        </HorizonDiv>

                        {
                            <ShowTable
                                data={dataArray}
                                onRefresh={handleButtonClick}
                            ></ShowTable>
                        }
                    </Body>
                </Background>
            </PC>
            <Mobile>
                <MobileBackground>
                    <MobileTitle>
                        ▶현재 매장명 : <br></br>
                        {storeName}
                    </MobileTitle>
                    <MobileBody>
                        <MobileButton onClick={handleButtonClick}>
                            조회하기
                        </MobileButton>
                        <HorizonDiv>
                            <>
                                <h4>
                                    현재 진행 중인 숙성과정을<br></br>종료처리
                                    할 수 있습니다
                                    <br />
                                    (※조회가 안 될 경우, <br></br>'조회'버튼을
                                    한 번 더 클릭해주세요)
                                </h4>
                            </>
                        </HorizonDiv>

                        {/* <h2>{storeName}</h2> */}

                        {
                            <ShowTable
                                data={dataArray}
                                onRefresh={handleButtonClick}
                            ></ShowTable>
                        }
                    </MobileBody>
                </MobileBackground>
            </Mobile>
        </div>
    )
}

export default FinishProject

async function GetData(
    q: any,
    setDataArray: React.Dispatch<React.SetStateAction<{}[]>>
) {
    const result = await getDocs(q)
    setDataArray([])
    result.forEach((doc: any) => {
        let id = doc.id
        let data = doc.data()
        if (data.afterWeight === 0) {
            setDataArray((arr: any) => [
                ...arr,
                {
                    ...data,
                    price: ThreeStepComma(data.price.toString()),
                    beforeWeight:
                        ThreeStepComma(data.beforeWeight.toString()) + 'g',
                    startDate: new Date(
                        data.startDate.seconds * 1000
                    ).toLocaleDateString('ko-Kr', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        // hour: '2-digit',
                        // minute: 'numeric',
                    }),
                    initHumid: data.initHumid + '%',
                    initTemp: data.initTemp + '℃',
                    id: id,
                },
            ])
        }
    })
}

const Background = styled.div`
    background-color: #f2f2f2;
    margin: 0;
    min-height: 90vh;
    width: 100%;
`
const MobileBackground = styled.div`
    background-color: #f2f2f2;
    margin: 0;
    min-height: 90vh;
    width: 100%;
`

const Title = styled.h1`
    background-color: #d8d8d8;
    padding: 8px;
    margin: 0;
    height: 5vh;
`
const Body = styled.div`
    padding: 12px 20px;
    margin: 0;
`

const StyledButton = styled.button`
    margin: auto 0 1rem 1rem;
    width: 10rem;
    height: 5rem;
`
const HorizonDiv = styled.div`
    display: flex;
`

const MobileTitle = styled.h2`
    font-size: 1.2rem;
    background-color: #d8d8d8;
    margin: auto;
    padding: 10px 0 10px 10px;
`
const MobileBody = styled.div`
    padding: 12px 20px;
    margin: 0;
`
const MobileButton = styled.button`
    margin: auto 0 1rem 1rem;
    width: 10rem;
    height: 5rem;
`
interface FinishData {
    fridgeNum: number
    machineNum: number
    species: string
    cut: string
    grade: string
    startDate: Timestamp
    beforeWeight: number
    afterWeight: number
    price: number
    meatNumber: string
}

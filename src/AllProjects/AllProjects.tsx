import { useState } from 'react'
import styled from 'styled-components'
import initializeApp from '../Firebase'
import {
    collection,
    query,
    getFirestore,
    where,
    getDocs,
    orderBy,
} from 'firebase/firestore'
import { useStoreContext } from '../StoreContext'
import { useParams } from 'react-router-dom'
import { Mobile, PC } from '../MediaQuery'
import NewTable from './NewTable'
import type { AgingData } from './AgingType'
import AnalysisModal from './AnalysisModal'

function AllProjects() {
    const { storeName: storeName } = useParams()
    const { setStoreName } = useStoreContext()
    const [hasData, setHasData] = useState(false)
    const [isChartModalOpen, setIsChartModalOpen] = useState(false)

    if (storeName !== undefined) {
        setStoreName(storeName)
        console.log('all init' + storeName)
    }

    const db = getFirestore(initializeApp)
    const dbRef = collection(db, 'AgingPlans')
    const q = query(
        dbRef,
        where('place', '==', storeName),
        orderBy('startDate')
    )

    const [dataArray, setDataArray] = useState<AgingData[]>([])

    const handleButtonClick = async () => {
        GetData(q, setDataArray)
        setHasData(true)
    }

    const handleOpenChartModal = () => {
        setIsChartModalOpen(true)
    }

    function handleClickCancel() {
        setIsChartModalOpen(false)
    }

    return (
        <div>
            <PC>
                <Background>
                    <Title>▶현재 매장명 : {storeName}</Title>

                    <Body>
                        <HorizonDiv>
                            <div>
                                <h2>
                                    종료 여부 관계없이 등록한 모든 숙성일지를
                                    표시합니다.
                                </h2>
                                <h3>
                                    (※ 조회가 안 될 경우, '조회'버튼을 한 번 더
                                    클릭해주세요)
                                    <br />
                                    (※ 진행 중인 프로젝트는 숙성 후 무게와
                                    종료일이 표시되지 않습니다.)
                                </h3>
                            </div>
                            <StyledButton onClick={handleButtonClick}>
                                조회하기
                            </StyledButton>
                            <StyledButton
                                style={{ display: hasData ? 'block' : 'none' }}
                                onClick={handleOpenChartModal}
                            >
                                통계
                            </StyledButton>
                        </HorizonDiv>

                        {<NewTable data={dataArray}></NewTable>}
                        <AnalysisModal
                            data={dataArray}
                            isOpen={isChartModalOpen}
                            onCancel={handleClickCancel}
                        />
                    </Body>
                </Background>
            </PC>
            <Mobile>
                <MobileBackground>
                    <MobileTitle>
                        ▶현재 매장명 : <br />
                        {storeName}
                    </MobileTitle>
                    <MobileBody>
                        <MobileButton onClick={handleButtonClick}>
                            조회하기
                        </MobileButton>
                        <MobileButton
                            style={{ display: hasData ? 'block' : 'none' }}
                            onClick={handleOpenChartModal}
                        >
                            통계
                        </MobileButton>
                        <h3>
                            종료 여부 관계없이 <br />
                            등록한 모든 숙성일지를 표시합니다.
                        </h3>
                        <h4>
                            (※ 조회가 안 될 경우, '조회'버튼을 한 번 더
                            클릭해주세요)
                            <br />
                            (※ 진행 중인 프로젝트는 숙성 후 무게와 종료일이
                            표시되지 않습니다.)
                        </h4>

                        {<NewTable data={dataArray}></NewTable>}
                        <AnalysisModal
                            data={dataArray}
                            isOpen={isChartModalOpen}
                            onCancel={handleClickCancel}
                        />
                    </MobileBody>
                </MobileBackground>
            </Mobile>
        </div>
    )
}

export default AllProjects

async function GetData(q, setDataArray) {
    const result = await getDocs(q)
    setDataArray([])
    result.forEach((doc: any) => {
        if (doc.exists) {
            var id = doc.id
            var data = doc.data()
            console.log(data)
            if (data.afterWeight === 0) {
                setDataArray((arr) => [
                    ...arr,
                    {
                        ...data,
                        startDate: new Date(
                            data.startDate.seconds * 1000
                        ).toLocaleString('ko-Kr', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        }),
                        afterWeight: '숙성 중',
                        endDate: '숙성 중',
                        id: id,
                    },
                ])
            } else {
                setDataArray((arr) => [
                    ...arr,
                    {
                        ...data,
                        startDate: new Date(
                            data.startDate.seconds * 1000
                        ).toLocaleString('ko-Kr', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        }),
                        endDate: new Date(
                            data.endDate.seconds * 1000
                        ).toLocaleString('ko-Kr', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                        }),
                        id: id,
                        loss: (
                            data.beforeWeight - Number(data.afterWeight)
                        ).toString(),
                        lossP:
                            ((data.beforeWeight - Number(data.afterWeight)) *
                                100) /
                            data.beforeWeight,
                        finalWeight: data.finalWeight ?? data.afterWeight,
                        finalLoss:
                            data.beforeWeight -
                            (data.finalWeight ?? data.afterWeight),
                        finalLossP:
                            ((data.beforeWeight -
                                (data.finalWeight ?? data.afterWeight)) *
                                100) /
                            data.beforeWeight,
                        price: data.price,
                    },
                ])
            }
        } else {
            console.log('데이터없음')
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

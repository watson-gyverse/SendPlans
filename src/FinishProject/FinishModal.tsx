import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { getFirestore } from 'firebase/firestore'
import initializeApp from '../Firebase'
import DatePickerComponent from '../CreateProject/Datepicker'
import styled from 'styled-components'

const FinishModal = ({ data, isOpen, onSubmit, onCancel }) => {
    const [afterWeight, setAfterWeight] = useState(0)
    const [finalWeight, setFinalWeight] = useState(0)
    const [endDate, setEndDate] = useState(new Date())
    const db = getFirestore(initializeApp)
    const [newMemo, setNewMemo] = useState<string>(
        data === undefined ? '' : data.memo
    )

    const checkValues =
        data === undefined
            ? {
                  fridgeNum: '',
                  machineNum: '',
                  species: '',
                  cut: '',
                  grade: '',
                  freeze: '',
                  where: '',
                  country: '',
                  startDate: '',
                  beforeWeight: '',
                  id: '',
                  price: '',
                  memo: '',
              }
            : data

    useEffect(() => {
        setNewMemo(checkValues.memo)
    }, [checkValues])

    const handleClickSubmit = async () => {
        if (afterWeight > 0 && finalWeight > 0) {
            await updateDoc(doc(db, 'AgingPlans', checkValues.id), {
                afterWeight: afterWeight,
                finalWeight: finalWeight,
                endDate: endDate,
                memo: newMemo,
            }).then(() => {
                console.log('처리 완료')
                setAfterWeight(0)
                onSubmit()
            })
        }
    }

    const handleClickCancel = () => {
        onCancel()
    }

    const onAfterWeightChange = (e) => {
        const limit = 6
        setAfterWeight(e.target.value.slice(0, limit))
    }
    const onCrustWeightChange = (e) => {
        const limit = 6
        setFinalWeight(e.target.value.slice(0, limit))
    }

    const onMemoChange = (e) => {
        setNewMemo(e.target.value)
    }

    return (
        <ReactModal
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                },
                content: {
                    position: 'absolute',
                    width: '60%',
                    height: '70%',
                    top: '15%',
                    left: '15%',
                    right: 0,
                    bottom: 0,
                    border: '1px solid #ccc',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                },
            }}
            isOpen={isOpen}
            onRequestClose={handleClickCancel}
        >
            <div>
                <h1>[숙성 완료 처리하기]</h1>
                <h3>숙성시작일 : {checkValues.startDate}</h3>
                <HorizonDiv>
                    <h3 style={{ margin: '0', width: '16rem' }}>
                        숙성종료일 설정 :{' '}
                    </h3>
                    <DatePickerComponent
                        style={{ marginLeft: '4rem' }}
                        setTargetDate={setEndDate}
                    />
                </HorizonDiv>

                <h3>
                    냉장고: {checkValues.fridgeNum} , 층:{' '}
                    {checkValues.machineNum}
                </h3>
                <h3>
                    {checkValues.species} , {checkValues.cut} ,{' '}
                    {checkValues.country} , {checkValues.grade + '(등급)'}
                </h3>
                <h3>Kg 단가 : {checkValues.price}원/㎏</h3>
                <h3>숙성 전 무게 : {checkValues.beforeWeight}g</h3>
                <h3>숙성 후 무게를 입력해주세요(g)</h3>
                <input
                    type='number'
                    name='afterWeight'
                    placeholder=''
                    value={afterWeight || ''}
                    onChange={onAfterWeightChange}
                />
                <h3>손질 후 최종 무게를 입력해주세요(g)</h3>
                <input
                    type='number'
                    name='crustWeight'
                    placeholder=''
                    value={finalWeight || ''}
                    onChange={onCrustWeightChange}
                />
                <h3>메모</h3>
                <textarea
                    name='memo'
                    placeholder=''
                    value={newMemo || ''}
                    onChange={onMemoChange}
                    style={{ width: '20rem', height: '6rem' }}
                />
                <br />
                <br />
                <HorizonDiv>
                    <StyledButton onClick={handleClickSubmit}>
                        제출
                    </StyledButton>
                    <StyledButton onClick={handleClickCancel}>
                        닫기
                    </StyledButton>
                </HorizonDiv>
                <br />
            </div>
        </ReactModal>
    )
}

export default FinishModal

const HorizonDiv = styled.div`
    display: flex;
    align-items: center;
`

const StyledButton = styled.button`
    width: 4rem;
    height: 2rem;
    margin-right: 1rem;
`

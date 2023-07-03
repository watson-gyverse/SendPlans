import { useState } from 'react'
import { Mobile, PC } from '../MediaQuery'
import styled from 'styled-components'
import {
    StyledH2,
    StyledInput,
    MobileCategory,
    MobileInput,
} from '../Style/MainStyledComponents'
import LoadingIcons from 'react-loading-icons'
import DatePickerComponent from './Datepicker'
import { Constant } from '../Style/const'
import axios from 'axios'

export interface MeatInfo {
    startDate: Date
    setStartDate: React.Dispatch<React.SetStateAction<Date>>
    setSpecies: (n: string) => void
    setIsBeef: (n: boolean) => void
    setWhere: (n: string) => void
    setIsLocal: (n: boolean) => void
    setCountry: (n: string) => void
    setGrade: (n: string) => void
    weight: number
    setWeight: (n: number) => void
    price: number
    setPrice: (n: number) => void
    meatNumber: string
    setMeatNumber: (n: string) => void
}

function SetMeatInfo({ props }: { props: MeatInfo }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isFailed, setIsFailed] = useState(false)

    const onWeightChange = (e: any) => {
        const limit = 6
        props.setWeight(e.target.value.slice(0, limit))
    }
    const onPriceChange = (e: any) => {
        const limit = 6
        const filtered = e.target.value.slice(0, limit).replace(/[^0-9]/g, '')
        props.setPrice(filtered)
    }

    const onMeatNumberChange = (e: any) => {
        const limit = 15
        props.setMeatNumber(e.target.value.slice(0, limit))
    }

    async function getMeatData() {
        const key = decodeURIComponent(
            'qwnHAfTHRhXpsJbU92MCjWQX2RSdtMsps3N2jT7sb%2F0%2FPNam4JyHegYeahkr%2BLvUw34onIXUbGUO0H1wDawX6w%3D%3D'
        )
        const url =
            'https://wnxfrgkleb.us18.qoddiapp.com/http://data.ekape.or.kr/openapi-data/service/user/animalTrace/traceNoSearch'
        setIsLoading(true)
        try {
            await axios
                .get(url, {
                    params: {
                        ServiceKey: key,
                        traceNo: props.meatNumber,
                    },
                    responseType: 'json',
                })
                .then((response) => {
                    var a =
                        response['data']['response']['body']['items']['item']
                    console.log(a)
                    switch (a[0]['traceNoType']) {
                        case 'CATTLE|CATTLE_NO': {
                            //소 개체 (소, 국산, 성별, 등급)
                            props.setSpecies('소')
                            props.setIsBeef(true)
                            props.setWhere('국산')
                            props.setIsLocal(true)
                            let s = a[0]['sexNm']
                            console.log(s)
                            if (s === '암') {
                                props.setCountry('한우 암소')
                            } else {
                                props.setCountry('한우 거세')
                            }
                            for (let i = 0; i < a.length; i++) {
                                if (a[i].hasOwnProperty('gradeNm')) {
                                    let g = a[i].gradeNm
                                    props.setGrade(g + '')
                                    break
                                }
                            }
                            break
                        }
                        case 'CATTLE|LOT_NO': {
                            //소 묶음, 예상되는 소 이력번호 깔아주기?
                            props.setSpecies('소')
                            props.setIsBeef(true)
                            props.setWhere('국산')
                            props.setIsLocal(true)
                            console.log(Object.keys(a).length)
                            var set = new Set()
                            for (let i = 1; i < Object.keys(a).length; i++) {
                                set.add(a[i]['cattleNo'])
                            }
                            console.log(set)
                            console.log(set[0])
                            break
                        }
                        case 'PIG|PIG_NO':
                        case 'PIG|LOT_NO': {
                            // 얘는 걍 돼지임
                            props.setSpecies('돼지')
                            props.setIsBeef(false)
                            props.setWhere('국산')
                        }
                    }
                    console.log(a)
                    console.log(typeof a)
                })
            setIsFailed(false)
        } catch (e) {
            console.error(e)
            setIsFailed(true)
        }
        setIsLoading(false)
    }

    return (
        <div style={{ marginBottom: '20px' }}>
            <PC>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '200px',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <StyledH2>숙성 시작일 설정 : </StyledH2>
                        <StyledH2>무게 입력(g) : </StyledH2>
                        <StyledH2>단가(원/100g) : </StyledH2>
                        <StyledH2>이력번호 입력 : </StyledH2>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'space-evenly',
                            width: '600px',
                            height: '200px',
                            marginLeft: '1rem',
                        }}
                    >
                        <DatePickerComponent
                            targetDate={props.startDate}
                            setTargetDate={props.setStartDate}
                        />
                        <div>
                            <StyledInput
                                inputMode='numeric'
                                type='number'
                                name='weight'
                                placeholder=''
                                value={props.weight || ''}
                                onChange={onWeightChange}
                            />
                        </div>
                        <div>
                            <StyledInput
                                type='number'
                                name='price'
                                placeholder=''
                                value={props.price || ''}
                                onChange={onPriceChange}
                            />
                        </div>
                        <div>
                            <StyledInput
                                type='text'
                                name='meatNumber'
                                placeholder=''
                                value={props.meatNumber}
                                onChange={onMeatNumberChange}
                            />
                            <MGOptionButton
                                style={{
                                    backgroundColor: Constant.MG_Blue,
                                    fontSize: '1.2rem',
                                    color: 'white',
                                    marginLeft: '1rem',
                                }}
                                onClick={() => getMeatData()}
                            >
                                정보 조회
                            </MGOptionButton>
                            <LoadingIcons.TailSpin
                                style={{
                                    display: isLoading ? 'block' : 'none',
                                }}
                                stroke='#8e1313'
                                strokeOpacity={1}
                            />
                        </div>
                    </div>
                </div>
                <h6
                    style={{
                        display: isFailed ? 'block' : 'none',
                        color: '#8e1313',
                    }}
                >
                    조회에 실패했습니다. 번호를 다시 한번 확인해주세요
                </h6>
            </PC>
            <Mobile>
                <div style={{ display: 'flex', height: '160px' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '140px',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <MobileCategory>숙성 시작일 설정</MobileCategory>
                        <MobileCategory>무게 입력(g) :</MobileCategory>
                        <MobileCategory>단가(원/㎏) :</MobileCategory>
                        <MobileCategory>이력번호 입력 :</MobileCategory>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'space-evenly',
                            width: '600px',
                            marginLeft: '1rem',
                        }}
                    >
                        <DatePickerComponent
                            style={{ marginLeft: '1rem' }}
                            targetDate={props.startDate}
                            setTargetDate={props.setStartDate}
                        />
                        <MobileInput
                            type='number'
                            name='weight'
                            placeholder=''
                            value={props.weight || ''}
                            onChange={onWeightChange}
                        />
                        <MobileInput
                            type='number'
                            name='price'
                            placeholder=''
                            value={props.price || ''}
                            onChange={onPriceChange}
                        />
                        <div>
                            <MobileInput
                                type='text'
                                name='meatNumber'
                                placeholder=''
                                value={props.meatNumber || ''}
                                onChange={onMeatNumberChange}
                            />
                            <MGOptionButton
                                style={{
                                    width: '8rem',
                                    height: '2rem',
                                    marginLeft: '10px',
                                    backgroundColor: Constant.MG_Blue,
                                    fontSize: '1.2rem',
                                    color: 'white',
                                }}
                                onClick={() => getMeatData()}
                            >
                                정보 조회
                            </MGOptionButton>
                        </div>
                    </div>
                </div>

                <LoadingIcons.TailSpin
                    style={{ display: isLoading ? 'block' : 'none' }}
                    stroke='#8e1313'
                    strokeOpacity={1}
                />
                <h6
                    style={{
                        display: isFailed ? 'block' : 'none',
                        color: '#8e1313',
                    }}
                >
                    조회에 실패했습니다. 번호를 다시 한번 확인해주세요
                </h6>
            </Mobile>
        </div>
    )
}

export default SetMeatInfo
const MeatGyverOptions = styled.div<{ expanded }>`
    display: ${(p) => (p.expanded ? 'flex' : 'none')};
    flex-direction: column;
    margin: 0;
    padding-left: 0;
`

const MGOptionButton = styled.button`
    width: 10rem;
    font-size: 1.3rem;
`
const MobileMGOptionButton = styled.button`
    width: 15rem;
    font-size: 1.3rem;
`

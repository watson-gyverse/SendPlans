import { useState, useEffect } from 'react'
import Radio from './Radio/Radio'
import RadioGroup from './Radio/RadioGroup'
import CutRadioMaker from './Radio/CutRadioMaker'
import CountryMaker from './Radio/CountryRadioMaker'
import GradeMaker from './Radio/GradeRadioMaker'
import ReactModal from 'react-modal'
import initializeApp from '../Firebase'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { useStoreContext } from '../StoreContext'
import DatePickerComponent from './Datepicker'
import { Mobile, PC } from '../MediaQuery'
import SetOtherSettings, { OtherSettings } from './OtherSettings'
import {
    Title,
    Body,
    MobileTitle,
    MobileBody,
    StyledFooter,
    StyledComfirmButton,
    Background,
} from '../Style/MainStyledComponents'
import SetMeatInfo, { MeatInfo } from './MeatInform'
import { Constant } from '../Style/const'
import BlueRadio from './Radio/BlueRadio'

function CreateProject() {
    const db = getFirestore(initializeApp)

    const { storeName: storeName } = useParams()
    const { setStoreName } = useStoreContext()

    useEffect(() => {
        if (storeName !== undefined) {
            setStoreName(storeName)
        }
    }, [storeName])

    const [species, setSpecies] = useState('소')
    const [isBeef, setIsBeef] = useState(true)
    const [freeze, setFreeze] = useState('냉장')
    const [where, setWhere] = useState('국산')
    const [isLocal, setIsLocal] = useState(true)
    const [cut, setCut] = useState('')
    const [country, setCountry] = useState('')
    const [grade, setGrade] = useState('')

    const [memo, setMemo] = useState('')
    const [fridgeNumber, setFridgeNumber] = useState(1)
    const [floorNumber, setFloorNumber] = useState(1)
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [meatNumber, setMeatNumber] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    //MG Options
    const [showMgOptions, setShowMgOptions] = useState(false)
    const [initTemp, setTemp] = useState(-100)
    const [initHumid, setHumid] = useState(-1)
    const [fanSpeed, setFanSpeed] = useState(-1)

    const [IsModalOpen, setIsModalOpen] = useState(false)

    const Fun = () => {
        setCut(() => '')
        setCountry(() => '')
        setGrade(() => '')
    }

    // useEffect(() => {
    //   Fun()
    // }, [species, where])

    useEffect(() => {
        // setGrade(() => '')
    }, [country])

    useEffect(() => {}, [grade])

    useEffect(() => {
        if (showMgOptions === false) {
            setTemp(-100)
            setHumid(-1)
            setFanSpeed(-1)
        }
    }, [showMgOptions])

    const handleSpeciesChange = (e: string) => {
        setSpecies(e)
        if (e === '소') {
            setIsBeef(true)
        } else {
            setIsBeef(false)
        }
        Fun()
    }

    const handleWhereChange = (e: string) => {
        setWhere(e)
        if (e === '국산') {
            setIsLocal(true)
        } else {
            setIsLocal(false)
        }
        Fun()
    }
    const handleModalCloseClick = () => {
        setIsModalOpen(false)
    }
    const handleButtonClick = async () => {
        if (
            storeName!.length !== 0 &&
            species.length !== 0 &&
            freeze.length !== 0 &&
            where.length !== 0 &&
            cut.length !== 0 &&
            country.length !== 0 &&
            grade.length !== 0 &&
            price > 100 &&
            weight > 100
        ) {
            await addDoc(collection(db, 'AgingPlans'), {
                memo: memo,
                place: storeName,
                afterWeight: 0,
                beforeWeight: weight * 1,
                country: country,
                cut: cut,
                endDate: 0,
                freeze: freeze,
                fridgeNum: fridgeNumber * 1,
                grade: grade,
                machineNum: floorNumber * 1,
                meatNumber: meatNumber,
                price: price,
                species: species,
                startDate: startDate,
                where: where,
                initTemp: initTemp,
                initHumid: initHumid,
                fanSpeed: fanSpeed,
            })
                .then(() => {
                    setIsModalOpen(true)
                    setSpecies('소')
                    setIsBeef(true)
                    setFreeze('냉장')
                    setWhere('국산')
                    setIsLocal(true)
                    setCut('')
                    setCountry('')
                    setGrade('')
                    setWeight(0)
                    setMeatNumber('')
                    setPrice(0)
                    setTemp(-100)
                    setHumid(-1)
                    setFanSpeed(-1)
                })
                .catch((error) => {
                    console.log('등록 실패 오류 : ' + error)
                })
        } else {
            console.log(
                '등록 실패-\n' +
                    '매장명: ' +
                    storeName +
                    ' 육종: ' +
                    species +
                    ' 냉장?: ' +
                    freeze +
                    ' 어디: ' +
                    where +
                    ' 부위: ' +
                    cut +
                    ' 상세: ' +
                    country +
                    ' 등급: ' +
                    grade +
                    ' 냉장고 :' +
                    fridgeNumber +
                    ' 층: ' +
                    floorNumber +
                    ' 무게: ' +
                    weight +
                    ' 가격: ' +
                    price
            )
        }
    }

    const initProps: OtherSettings = {
        setSpecies: handleSpeciesChange,
        setIsBeef,
        setWhere: handleWhereChange,
        setIsLocal,
        setCountry,
        setGrade,
        memo,
        setMemo,
        setFridgeNumber,
        setFloorNumber,
        weight,
        setWeight,
        price,
        setPrice,
        meatNumber,
        setMeatNumber,
        initTemp,
        setTemp,
        initHumid,
        setHumid,
        fanSpeed,
        setFanSpeed,
        showMgOptions,
        setShowMgOptions,
    }

    const meatInfoProps: MeatInfo = {
        startDate,
        setStartDate,
        setSpecies: handleSpeciesChange,
        setIsBeef,
        setWhere: handleWhereChange,
        setIsLocal,
        setCountry,
        setGrade,
        weight,
        setWeight,
        price,
        setPrice,
        meatNumber,
        setMeatNumber,
    }

    return (
        <Background>
            <PC>
                <Title>▶현재 매장명 : {storeName}</Title>
                <Body>
                    <SetMeatInfo props={meatInfoProps}></SetMeatInfo>
                    <fieldset
                        style={{
                            width: '80%',
                            borderColor: Constant.MG_Blue,
                            borderStyle: 'solid',
                        }}
                    >
                        <legend
                            style={{ fontSize: '1.2rem', fontWeight: '600' }}
                        >
                            이력번호 입력시 자동
                        </legend>
                        <RadioGroup
                            label='육종'
                            value={species}
                            onChange={handleSpeciesChange}
                        >
                            <BlueRadio value='소'>소</BlueRadio>
                            <BlueRadio value='돼지'>돼지</BlueRadio>
                        </RadioGroup>
                        <StyledFooter>{'->' + species}</StyledFooter>
                        <RadioGroup
                            label='국산/수입'
                            value={where}
                            onChange={handleWhereChange}
                        >
                            <BlueRadio value='국산'>국산</BlueRadio>
                            <BlueRadio value='수입'>수입</BlueRadio>
                        </RadioGroup>
                        <StyledFooter>{'->' + where}</StyledFooter>
                        <CountryMaker
                            label='세부'
                            value={country}
                            onChange={setCountry}
                            isBeef={isBeef}
                            isLocal={isLocal}
                        ></CountryMaker>
                        <StyledFooter>{'->' + country}</StyledFooter>

                        <GradeMaker
                            label='등급'
                            value={grade}
                            onChange={setGrade}
                            isBeef={isBeef}
                            whichCountry={country}
                        ></GradeMaker>
                        <StyledFooter>{'->' + grade}</StyledFooter>
                    </fieldset>
                    <br />
                    <fieldset style={{ width: '80%', borderColor: 'red' }}>
                        <legend
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                            }}
                        >
                            직접 입력
                        </legend>
                        <CutRadioMaker
                            label='부위'
                            value={cut}
                            onChange={setCut}
                            isBeef={isBeef}
                        ></CutRadioMaker>
                        <StyledFooter>{'->' + cut}</StyledFooter>
                        <RadioGroup
                            label='냉장/냉동'
                            value={freeze}
                            onChange={setFreeze}
                        >
                            <Radio value='냉장'>냉장</Radio>
                            <Radio value='냉동'>냉동</Radio>
                        </RadioGroup>
                        <StyledFooter>{'->' + freeze}</StyledFooter>
                    </fieldset>

                    <SetOtherSettings props={initProps}></SetOtherSettings>

                    <StyledComfirmButton onClick={handleButtonClick}>
                        등록
                    </StyledComfirmButton>
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
                                width: '30%',
                                height: '20%',
                                top: '30%',
                                left: '30%',
                                border: '1px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px',
                            },
                        }}
                        isOpen={IsModalOpen}
                        onRequestClose={handleModalCloseClick}
                    >
                        <div>등록되었습니다</div>
                    </ReactModal>
                </Body>
            </PC>
            <Mobile>
                <MobileTitle>
                    ▶현재 매장명 : <br />
                    {storeName}
                </MobileTitle>
                <MobileBody>
                    <SetMeatInfo props={meatInfoProps}></SetMeatInfo>
                    <fieldset
                        style={{
                            width: '70%',
                            borderColor: Constant.MG_Blue,
                            borderStyle: 'solid',
                        }}
                    >
                        <legend
                            style={{ fontSize: '1.2rem', fontWeight: '600' }}
                        >
                            이력번호 입력시 자동
                        </legend>
                        <RadioGroup
                            label='육종'
                            value={species}
                            onChange={handleSpeciesChange}
                        >
                            <BlueRadio value='소'>소</BlueRadio>
                            <BlueRadio value='돼지'>돼지</BlueRadio>
                        </RadioGroup>
                        <StyledFooter>{'->' + species}</StyledFooter>
                        <RadioGroup
                            label='국산/수입'
                            value={where}
                            onChange={handleWhereChange}
                        >
                            <BlueRadio value='국산'>국산</BlueRadio>
                            <BlueRadio value='수입'>수입</BlueRadio>
                        </RadioGroup>
                        <StyledFooter>{'->' + where}</StyledFooter>
                        <CountryMaker
                            label='세부'
                            value={country}
                            onChange={setCountry}
                            isBeef={isBeef}
                            isLocal={isLocal}
                        ></CountryMaker>
                        <StyledFooter>{'->' + country}</StyledFooter>
                        <GradeMaker
                            label='등급'
                            value={grade}
                            onChange={setGrade}
                            isBeef={isBeef}
                            whichCountry={country}
                        ></GradeMaker>
                        <StyledFooter>{'->' + grade}</StyledFooter>
                    </fieldset>
                    <fieldset style={{ width: '70%', borderColor: 'red' }}>
                        <legend
                            style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                            }}
                        >
                            직접 입력
                        </legend>
                        <CutRadioMaker
                            label='부위'
                            value={cut}
                            onChange={setCut}
                            isBeef={isBeef}
                        ></CutRadioMaker>
                        <StyledFooter>{'->' + cut}</StyledFooter>
                        <RadioGroup
                            label='냉장/냉동'
                            value={freeze}
                            onChange={setFreeze}
                        >
                            <Radio value='냉장'>냉장</Radio>
                            <Radio value='냉동'>냉동</Radio>
                        </RadioGroup>
                        <StyledFooter>{'->' + freeze}</StyledFooter>
                    </fieldset>

                    <SetOtherSettings props={initProps}></SetOtherSettings>
                    <StyledComfirmButton onClick={handleButtonClick}>
                        등록
                    </StyledComfirmButton>
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
                                width: '30%',
                                height: '20%',
                                top: '30%',
                                left: '30%',
                                border: '1px solid #ccc',
                                background: '#fff',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px',
                            },
                        }}
                        isOpen={IsModalOpen}
                        onRequestClose={handleModalCloseClick}
                    >
                        <div>등록되었습니다</div>
                    </ReactModal>
                </MobileBody>
            </Mobile>
        </Background>
    )
}

export default CreateProject

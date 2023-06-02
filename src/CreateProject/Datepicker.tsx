import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

type Props = {
  value: any
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const DatePickerComponent = (props: any) => {
  const [date, setDate] = useState<Date>(
    setHours(setMinutes(new Date(), 0), new Date().getHours())
  )
  useEffect(() => {
    props.setTargetDate(date)
    console.log(date)
  }, [date])
  const CustomInput = forwardRef(
    ({ value, onClick }: Props, ref: ForwardedRef<any>) => (
      <StyledButton
        className='example-custom-input'
        onClick={onClick}
        ref={ref}
      >
        {value}
      </StyledButton>
    )
  )
  return (
    <DatePicker
      selected={date}
      onChange={(date: Date) => setDate(date)}
      customInput={React.createElement(CustomInput)}
      dateFormat='yyyy/MM/dd'
      // showTimeSelect
      // timeIntervals={60}
      // minTime={setHours(setMinutes(new Date(), 0), 0)}
      // maxTime={setHours(setMinutes(new Date(), 30), 23)}
    />
  )
}

export default DatePickerComponent

const StyledButton = styled.button`
  margin: '0 0 0 1rem';
  width: 8rem;
  height: 2rem;
  font-size: 1.2rem;
`

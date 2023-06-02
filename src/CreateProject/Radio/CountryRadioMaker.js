import { useState } from 'react'
import BlueRadio from './BlueRadio'
import RadioGroup from './RadioGroup'

function CountryMaker(props) {
  const onChange = props.onChange
  const country = props.value
  const list = props.isLocal
    ? props.isBeef
      ? ['한우 암소', '한우 거세']
      : ['암퇘지', '한돈 거세']
    : ['미국', '호주', '캐나다', '멕시코', '칠레', '스페인']

  const countryList = list.map((country, index) => (
    <BlueRadio key={index} value={country} name='countries'>
      {country}
      <br />
    </BlueRadio>
  ))
  return (
    <RadioGroup label='세부' value={country} onChange={onChange}>
      <>{countryList}</>
    </RadioGroup>
  )
}

export default CountryMaker

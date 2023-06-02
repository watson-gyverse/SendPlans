import { useEffect, useState } from 'react'
import BlueRadio from './BlueRadio'
import RadioGroup from './RadioGroup'

function GradeMaker(props) {
  const [list, setList] = useState(['1++', '1+', '1', '2', '3', '등외(무등급)'])
  const onChange = props.onChange
  const grade = props.value
  useEffect(() => {
    if (props.isBeef) {
      switch (props.whichCountry) {
        case '한우 암소':
        case '한우 거세': {
          setList(['1++', '1+', '1', '2', '3', '등외(무등급)'])
          break
        }
        case '미국': {
          setList(['프라임', '초이스', '셀렉트', '등외'])
          break
        }
        case '호주': {
          setList(['MB 7/8/9', 'MB 4/5/6', 'MB 1/2/3', 'GF', 'S', 'A'])
          break
        }
        case '캐나다': {
          setList(['프라임', 'AAA', 'AA', 'A', '등외(무등급)'])
          break
        }
        case '멕시코': {
          setList(['등외(무등급)'])
          break
        }
        case '칠레': {
          setList(['프리고오소노', '테무코'])
          break
        }
        case '스페인': {
          setList(['베요타', '세보데캄보', '세보'])
          break
        }
      }
    } else {
      setList(['1+', '1 ', '2 ', '등외(무등급)'])
      switch (props.whichCountry) {
        case '암퇘지':
        case '한돈 거세': {
          setList(['1+', '1 ', '2 ', '등외(무등급)'])
          break
        }
        case '미국':
        case '호주':
        case '캐나다':
        case '멕시코':
        case '칠레':
        case '스페인': {
          setList(['등외(무등급)'])
          break
        }
      }
    }
  }, [props.whichCountry, props.isBeef])

  const gradeList = list.map((grade, index) => (
    <BlueRadio key={index} value={grade} name='grades'>
      {grade}
      <br />
    </BlueRadio>
  ))

  return (
    <RadioGroup label='등급' value={props.value} onChange={onChange}>
      <>{gradeList}</>
    </RadioGroup>
  )
}

export default GradeMaker

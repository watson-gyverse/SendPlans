import Radio from './Radio'
import RadioGroup from './RadioGroup'

function CutMaker(props, ...rest) {
  const onChange = props.onChange
  const cut = props.value
  const list = props.isBeef
    ? [
        '윗등심',
        '아랫등심',
        '토마호크',
        '채끝',
        '티본',
        '목심',
        '갈비',
        '양지',
        '우둔',
        '설도',
        '안심',
      ]
    : [
        '목살',
        '삼겹살',
        '돈등심',
        '돈안심',
        '갈비',
        '앞다리',
        '뒷다리',
        '돈마호크',
      ]
  const cutList = list.map((cut, index) => (
    <Radio key={index} value={cut} name='cuts'>
      {cut}
      <br />
    </Radio>
  ))
  return (
    <RadioGroup label='부위' value={cut} onChange={onChange}>
      <>{cutList}</>
    </RadioGroup>
  )
}

export default CutMaker

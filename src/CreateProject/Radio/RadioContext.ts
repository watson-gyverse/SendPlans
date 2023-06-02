import { createContext } from 'react'

type RadioType = {
  value: any
  disabled: boolean
  onChange?: any
}

const IRadioType = {
  value: undefined,
  disabled: false,
}

const RadioContext = createContext<RadioType>(IRadioType)

export default RadioContext

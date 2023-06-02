import RadioContext from './RadioContext'
import styled from 'styled-components'
import { Mobile, PC } from '../../MediaQuery'
import {
  StyledFieldset,
  MobileFieldset,
} from '../../Style/MainStyledComponents'
function RadioGroup({ label, children, ...rest }) {
  return (
    <div>
      <PC>
        <StyledFieldset>
          <legend style={{ fontWeight: '600' }}>{label}</legend>
          <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
        </StyledFieldset>
      </PC>
      <Mobile>
        <MobileFieldset>
          <legend>{label}</legend>
          <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
        </MobileFieldset>
      </Mobile>
    </div>
  )
}

export default RadioGroup

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './practiceEx1/App'
import UserName from './practiceEx1/InputField'
import CheckBoxes from './practiceEx1/CheckBoxes'
import RadioButton from './RadioButton'
import Clock from './Clock'
import InlineStyle from './InlineStyling'
import ExternalStyle from './ExternalStyle'
import DerivedState from './DerivedState'
import User from './ObjectState'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <UserName /> */}
    {/* <CheckBoxes /> */}
    {/* <RadioButton /> */}

    {/* <Clock /> */}

    {/* <InputRef />

    <ExternalStyle />

    <InlineStyle /> */}
    {/* <DerivedState/> */}

    <User/>
  </StrictMode>,
)
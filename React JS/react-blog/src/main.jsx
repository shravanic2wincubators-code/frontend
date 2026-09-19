import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './practiceEx1/App'
import UserName from './practiceEx1/InputField'
import CheckBoxes from './practiceEx1/CheckBoxes'
import RadioButton from './RadioButton'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
    <UserName /> */}
    {/* <CheckBoxes /> */}

    <RadioButton/>
  </StrictMode>,
)
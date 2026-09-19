import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './practiceEx1/App'
import UserName from './practiceEx1/InputField'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <UserName />
  </StrictMode>,
)
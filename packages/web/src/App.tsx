import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import General from "./settingsPage/General";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <General/>
    </>
  )
}

export default App

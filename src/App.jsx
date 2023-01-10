import { useState, useEffect } from 'react'
import { FaPause, FaChevronUp, FaChevronDown, FaUndo, FaPlay } from "react-icons/fa";
import Timer from './Timer';

function App() {
const [breakCount, setBreakCount] = useState()
const [sessionCount, setSessionCount] = useState()

useEffect(() => {
  setBreakCount(5)
  setSessionCount(25)  
}, [])


const handleCountPlusBreak = () => { 
  if (breakCount == 60) {
    return 
  } else {
    setBreakCount((prev) => prev + 1)
  }
}

const handleCountMinusBreak = () => {
  if (breakCount == 1) {
    return
  } else {
    setBreakCount((prev) => prev - 1)
  }
}

const handleCountPlusSession = () => {
  if (sessionCount == 60) {
    return
  } else {
    setSessionCount((prev) => prev + 1)
  }
}

const handleCountMinusSession = () => {
  if (sessionCount == 1) {
    return
  } else {
    setSessionCount((prev) => prev - 1)
  }
}

const handleReset = () => {
  setBreakCount(5)
  setSessionCount(25)
}

  return (
    <div className="App">
      <div className='wrapper'>
        <h2> 25 + 5 Clock</h2>
        <Timer />
      </div>
    </div>
  )
}

export default App

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
        <div className='container'>
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className='break-session-wrap'>
              <button id="break-increment" onClick={handleCountPlusBreak}><FaChevronUp /></button>
              <p id="break-length">{breakCount}</p>
              <button id="break-decrement" onClick={handleCountMinusBreak}><FaChevronDown /></button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className='break-session-wrap'>
              <button id="session-increment" onClick={handleCountPlusSession}><FaChevronUp /></button>
              <p id="session-length">{sessionCount}</p>
              <button id="session-decrement" onClick={handleCountMinusSession}><FaChevronDown /></button>
            </div>
          </div>
        </div>
        <div className='timer'>
          <div className='timer-wrap'>
            <Timer sTime={sessionCount} bTime={breakCount}/>
          </div>
        </div>
            <button id="reset" style={{marginRight:'5px'}} onClick={handleReset}><FaUndo/></button>
            <button id="start_stop"><FaPlay/><span></span><FaPause /></button>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import { FaPause, FaChevronUp, FaChevronDown, FaUndo, FaPlay } from "react-icons/fa";

function App() {

  return (
    <div className="App">
      <div className='wrapper'>
        <h2> 25 + 5 Clock</h2>
        <div className='container'>
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className='break-session-wrap'>
              <button id="break-increment"><FaChevronUp /></button>
              <p id="break-length">Break Counter 5</p>
              <button id="break-decrement"><FaChevronDown /></button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className='break-session-wrap'>
              <button id="session-increment"><FaChevronUp /></button>
              <p id="session-length">Session Counter 25</p>
              <button id="session-decrement"><FaChevronDown /></button>
            </div>
          </div>
        </div>
        <div className='timer'>
          <div className='timer-wrap'>
            <p id="timer-label">Session</p>
            <p id="time-left" style={{fontSize: '40px'}}>Time Left</p>
          </div>
        </div>
            <button id="reset" style={{marginRight:'5px'}}><FaUndo/></button>
            <button id="start_stop"><FaPlay/><span></span><FaPause /></button>
      </div>
    </div>
  )
}

export default App

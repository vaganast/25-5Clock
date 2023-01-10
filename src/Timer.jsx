import React, { useState, useRef, useEffect } from 'react'

const Timer = ({ sTime, bTime }) => {
  //sTime=25m bTime=5m
  let sessionMinutes = sTime * 60
  let breakMinutes = bTime * 60

	// The state for our timer
	const [timer, setTimer] = useState();
  const [mode, setMode] = useState('work'); // work/break/null

  const modeRef = useRef(mode);
  const timerId = useRef();

  // formation for time via props
  const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = time % 60   
     return (
      (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds)
       )
      }

  //update the display time
  useEffect(() => {  
   setTimer(sessionMinutes)
  }, [sessionMinutes])	

  //start / stop / reset functions
  const startCount = () => {
    timerId.current = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
  }

  const stopCount = () => {
    clearInterval(timerId.current)
    timerId.current = 0
  }

  const resetCount = () => {
    stopCount()
    if (timer) {
      setTimer(sessionMinutes)
    }
  }

	return (
		<>
     <p id="timer-label">Session / break </p>
     <p id="time-left" style={{fontSize: '40px'}}>{formatTime(timer)}</p>
     <button onClick={startCount}>test count button</button>
     <button onClick={stopCount}>test stop count button</button>
     <button onClick={resetCount}>test reset count button</button>
    </>
	)
}

export default Timer

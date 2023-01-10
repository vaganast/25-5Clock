import React, { useState, useRef, useEffect } from 'react'
import { FaPause, FaChevronUp, FaChevronDown, FaUndo, FaPlay } from "react-icons/fa";
import alarm from './assets/alarm.mp3'

const Timer = () => {
  // set timers
  const [breakCount, setBreakCount] = useState(5)
  const [sessionCount, setSessionCount] = useState(0.1) //25 0.1 for testing
  const [timer, setTimer] = useState(1500); //displaying time
  const [timerOn, setTimerOn] = useState(false) //help to disable button if timer is on
  const [playSound, setPlaySound] = useState(new Audio(alarm)) 
  const [play, setPlay] = useState(true) // play pause state

  //if we are on break timer
  const [onBreak, setOnBreak] = useState(false)

  const timerId = useRef();
  
  const playAlarm = () => {
    playSound.currentTime = 1
    playSound.play()
  }
  // formation for time displaying mm:ss
  const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = time % 60   
     return (
      (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds)
       )
      }

  //update the display time
  useEffect(() => {  
   if(!timerOn){
    setTimer(sessionCount*60)
   }
  }, [sessionCount])	  

  //start / pause functions
  const startCount = () => {      
    let onBreakVariable = onBreak
    console.log({onBreakVariable});
    if(play) {
     timerId.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <=0 && !onBreakVariable) {  
            setOnBreak(true)
            playAlarm()          
            onBreakVariable=true
            console.log({onBreak});
            return breakCount*60;
          } else if (prev <=0 && onBreakVariable) { 
            playAlarm()           
            onBreakVariable=false
            setOnBreak(false)
            return sessionCount*60;
          } else
          return prev - 1})
      }, 1000)      
      setPlay(!play)  
      setTimerOn(!timerOn)   
    }     
    if(!play) {
      clearInterval(timerId.current)
      timerId.current = 0
      setPlay(!play)
      setTimerOn(!timerOn) 
    }    
  }
      // into the else statement above for the pause
  // const stopCount = () => {
  //   clearInterval(timerId.current)
  //   timerId.current = 0
  // }

  //reset function
  const resetCount = () => {
    clearInterval(timerId.current)
     timerId.current = 0  
     setBreakCount(5)
  setSessionCount(25) 
  setTimerOn(false)
    if (timer) {
      setTimer(1500) //25 * 60
    }
  }

  //handlers + - session break
const handleCountPlusBreak = () => { 
  if (breakCount == 60 ) {
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
	return (
		<>
    <div className='container'>
          <div>
            <h3 id="break-label">Break Length</h3>
            <div className='break-session-wrap'>
              <button id="break-increment" disabled={timerOn} onClick={handleCountPlusBreak}><FaChevronUp/></button>
              <p id="break-length">{breakCount}</p>
              <button id="break-decrement" disabled={timerOn} onClick={handleCountMinusBreak}><FaChevronDown /></button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div className='break-session-wrap'>
              <button id="session-increment" disabled={timerOn} onClick={handleCountPlusSession}><FaChevronUp /></button>
              <p id="session-length">{sessionCount}</p>
              <button id="session-decrement" disabled={timerOn} onClick={handleCountMinusSession}><FaChevronDown /></button>
            </div>
          </div>
        </div>
        <div className='timer'>
          <div className='timer-wrap'>
          <p id="timer-label"> {onBreak ? 'Break' : 'Session'}</p>
     <p id="time-left" style={{fontSize: '40px'}}>{formatTime(timer)}</p>   
          </div>
        </div>
            <button id="reset" style={{marginRight:'5px'}} onClick={resetCount}><FaUndo/></button>
            <button id="start_stop" onClick={startCount}>{play ? <FaPlay /> : <FaPause />}</button>
    </>
	)
}

export default Timer

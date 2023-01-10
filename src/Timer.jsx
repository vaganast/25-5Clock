import React, { useState, useRef, useEffect } from 'react'
import { FaPause, FaChevronUp, FaChevronDown, FaUndo, FaPlay } from "react-icons/fa";
import alarm from './assets/alarm.mp3'

const Timer = () => {
  // set timers
  const [breakCount, setBreakCount] = useState(5) // 5 0.3 for testing
  const [sessionCount, setSessionCount] = useState(25) //25 0.1 for testing
  const [timer, setTimer] = useState(1500); //displaying time
  const [timerOn, setTimerOn] = useState(false) //help to disable button if timer is on
  const [play, setPlay] = useState(true) // play pause state, should put false but i continue with true
  const [onBreak, setOnBreak] = useState(false)  //if we are on break timer to change between break and session
  //refs to keep the time with play/pause
  const timerId = useRef();
  const audioRef = useRef(null); 

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

  //start / pause functions should use useEffect
  // const startCount = () => {      
  //   let onBreakVariable = onBreak    
  //   if(play) {
  //    timerId.current = setInterval(() => {
  //       setTimer((prev) => {
  //         if (prev <=0 && !onBreakVariable) {  
  //           setOnBreak(true)
  //           playAlarm()          
  //           onBreakVariable=true
  //           console.log({onBreak});
  //           return breakCount*60;
  //         } else if (prev <=0 && onBreakVariable) { 
  //           playAlarm()           
  //           onBreakVariable=false
  //           setOnBreak(false)
  //           return sessionCount*60;
  //         } else
  //         return prev - 1})
  //     }, 1000)      
  //     setPlay(!play)  
  //     setTimerOn(!timerOn)   
  //   }     
  //   if(!play) {
  //     clearInterval(timerId.current)
  //     timerId.current = 0
  //     setPlay(!play)
  //     setTimerOn(!timerOn) 
  //   }    
  // }
      // into the else statement above for the pause
  // const stopCount = () => {
  //   clearInterval(timerId.current)
  //   timerId.current = 0
  // }
  useEffect(() => {
    let interval = null;
    if (!play) {
      interval = setInterval(() => {
        if (timer === 0) {
          audioRef.current.play()
          if (onBreak) {
            setOnBreak(false)
            setTimer(sessionCount * 60)            
          } else {
            setOnBreak(true)
            setTimer(breakCount * 60)            
          }
        } else {
          setTimer((seconds) => seconds - 1)          
        }
      }, 1000);
    } else {
      clearInterval(interval)      
    }
    return () => clearInterval(interval)
  }, [play, timer, onBreak, breakCount, sessionCount]);

  useEffect(() => {
    if (timer === 0) {
      audioRef.current.play()
    }
  }, [timer]);

  const startCount = () => {
    setPlay(!play)
    setTimerOn(!timerOn)
  }

  //reset function
  const resetCount = () => {
    setPlay(true)
    setOnBreak(false)
    audioRef.current.pause()
    audioRef.current.currentTime = 0
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
          <div className='timer-wrap' id="timer-label">
          <div id="timer-label">{onBreak ? 'Break' : 'Session'}</div>
          <p id="time-left" style={{fontSize: '40px'}}>{formatTime(timer)}</p>   
          </div>
        </div>
            <button id="reset" style={{marginRight:'5px'}} onClick={resetCount}><FaUndo/></button>
            <button id="start_stop" onClick={startCount}>{play ? <FaPlay /> : <FaPause />}</button>
            <audio id="beep" type="audio/mpeg" ref={audioRef} src={alarm} />
    </>
	)
}
export default Timer

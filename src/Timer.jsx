import React, { useState, useRef, useEffect } from 'react'

const Timer = ({ sTime, bTime }) => {
  //sTime=25m bTime=5m
  let sesTime = sTime * 60
  let breTime = bTime * 60
	// We need ref in this, because we are dealing
	// with JS setInterval to keep track of it and
	// stop it when needed
	const Ref = useRef(null);

	// The state for our timer
	const [timer, setTimer] = useState();
  const [counting, setCounting] = useState(false)

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
   setTimer(sesTime)
  }, [sesTime])	

  const startCount = () => {
    // if (Ref.current) clearInterval(Ref.current);
    if (!counting) {
		let ses = setInterval(() => {
			setTimer((prev) => prev - 1)
		}, 1000)
    //store for pause resume
    localStorage.clear()
    localStorage.setItem('interval-id', ses)    
    }
     if (counting) {

     }
  }

	return (
		<>
     <p id="timer-label">Session / break </p>
     <p id="time-left" style={{fontSize: '40px'}}>{formatTime(timer)}</p>
     <button onClick={startCount}>test count button</button>
    </>
	)
}

export default Timer

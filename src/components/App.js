import React, { useState, useEffect } from 'react'
import ReactFcctest from 'react-fcctest'

import { useInterval } from '../hooks/useInterval'

import TimeSet from './TimeSet'
import Timer from './Timer'
import Controls from './Controls'

const App = () => {
  const [breakVal, setBreakVal] = useState(5)
  const [sessionVal, setSessionVal] = useState(25)
  const [mode, setMode] = useState('session')
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [active, setActive] = useState(false)

  useInterval(() => setTime(time - 1000), active ? 1000 : null)

  const handleReset = () => {
    setActive(false)
    setMode('session')
    setBreakVal(5)
    setSessionVal(25)
    setTime(25 * 60 * 1000)
  }

  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])

  useEffect(() => {
    if (time === 0 && mode === 'session') {
      setMode('break')
      setTime(breakVal * 60 * 1000)
    } else if (time === 0 && mode === 'break') {
      setMode('session')
      setTime(sessionVal * 60 * 1000)
    }
  }, [time, breakVal, sessionVal, mode])

  return (
    <div className="container">
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <main>
        <TimeSet type={'Break'} value={[breakVal, setBreakVal]} />
        <TimeSet type={'Session'} value={[sessionVal, setSessionVal]} />
        <Timer currentMode={[mode, setMode]} currentTime={[time, setTime]} />
        <Controls
          activeStatus={[active, setActive]}
          handleReset={handleReset}
        />
      </main>
      <ReactFcctest />
    </div>
  )
}

export default App


import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'

function App() {

  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <>
     <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Light/Dark Mode</Button>
    </>
  )
}

export default App

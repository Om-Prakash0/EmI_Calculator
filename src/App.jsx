/**
 * App – root component; wires dark mode, header, calculator, footer
 */
import React from 'react'
import { useDarkMode } from './hooks/useDarkMode'
import Header from './components/Header'
import EMICalculator from './components/EMICalculator'
import Footer from './components/Footer'

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <div className="min-h-screen flex flex-col">
      <Header dark={dark} setDark={setDark} />
      <main className="flex-1">
        <EMICalculator />
      </main>
      <Footer />
    </div>
  )
}

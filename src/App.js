import React from 'react';
import './app.css';
import { Hangman, Header } from './containers'
import Footer from './containers/footer/Footer.tsx';
import { Stats, AddWord } from './components'
import { StatsProvider } from './contexts/statsContext/StatsContext'

const App = () => {
  return (
    <div className="App">
      <Header />
      <StatsProvider>
        <Hangman />
        <Stats />
      </StatsProvider>
      <AddWord />
      <Footer author="Jakub Lewkowicz" year={2023} />
    </div>
  )
}

export default App
import AnimalGame from './components/AnimalGame.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

function App() {


  return (
    <div className='Wrapper'>
      <div className='AnimalGame-wrapper'>
        <Header />
        <AnimalGame />
      </div>
      <Footer />
    </div>
  )
}

export default App

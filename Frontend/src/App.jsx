import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Component/Header';
import Footer from './Component/Footer';

function App() {
  return (
    <>
      <Header />

      <main className='min-h-[80vh]'>
          <Outlet/>
      </main>
      <Footer/>
    </>

  )
}

export default App

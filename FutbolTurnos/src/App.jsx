import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Turnos from './components/Turnos'
import QRPage from './components/QRPage'
import Home from './components/Home'
import Login from './components/Login'
import MisTurnos from './components/MisTurnos'
import LoginForm from './components/LoginForm'


function App() {

  return (
    <Router>
      <Routes>
         <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/turnos' element={<Turnos />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/qr/:id' element={<QRPage />} />
        

      </Routes>
    </Router>
  )
}

export default App

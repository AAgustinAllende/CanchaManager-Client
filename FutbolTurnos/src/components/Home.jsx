import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import loader from '../assets/futbol.gif'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const timer = setTimeout(() => {
            navigate("/turnos")
        },4000)

        return () => clearTimeout(timer)
    },[navigate])

  return (
    <div>
      <img
      className='img-principal'
        src={loader}
        alt="Bienvenida"
       
      />
    </div>
  )
}

export default Home
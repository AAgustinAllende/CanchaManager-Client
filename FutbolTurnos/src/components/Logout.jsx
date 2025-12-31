import React from 'react'

const Logout = () => {
    const handleLogout = () =>{
        localStorage.removeItem("usuariosGoogle")
        localStorage.removeItem("access_token")

        window.location.href="/"
    }

  return (
    <button 
    onClick={handleLogout}
    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 btn-logout"
    >
        Cerrar sesión
    </button>
  )
}

export default Logout
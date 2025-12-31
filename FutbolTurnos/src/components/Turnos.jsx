import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import Layout from "./Layout";
import MisTurnos from "./MisTurnos";
import Logout from "./Logout";

const Turnos = () => {
  const navigate = useNavigate();
const [usuario, setUsuario] = useState(null);
const [turnos, setTurnos] = useState([]);

const [nuevoTurno, setNuevoTurno] = useState({
  nombre: "",
  dia: "",
  hora: "",
  cancha: "",
  precio: "",
  email: "",
});

useEffect(() => {
  const googleUser = localStorage.getItem("usuariosGoogle");
  const loginUser = localStorage.getItem("loginData");

  if (googleUser) {
    const u = JSON.parse(googleUser);
    setUsuario(u);
    setNuevoTurno((prev) => ({ ...prev, email: u.email }));
  } else if (loginUser) {
    const parsed = JSON.parse(loginUser);
    const adapted = {
      name: parsed.email.split("@")[0],
      email: parsed.email,
      picture: null,
    };
    setUsuario(adapted);
    setNuevoTurno((prev) => ({ ...prev, email: adapted.email }));
  }
}, []);

console.log("Nuevo turno contiene email:", nuevoTurno);


  const [horariosDisponibles, setHorariosDisponibles] = useState([
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00",
  ]);
  const [canchasDisponibles, setCanchasDisponibles] = useState([]);
  const [mostrarLayout, setMostrarLayout] = useState(false);

  const preciosPorCancha = {
    "8vs8": 70000,
    "6vs6 A": 50000,
    "6vs6 B": 50000,
  };

  // Fetch de turnos existentes
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await fetch("http://localhost:59470/api/Futbol");
        const data = await res.json();
        const turnosTraducidos = data.map((t) => ({
          id: t.Id,
          nombre: t.Nombre,
          dia: t.Dia.split("T")[0],
          hora: t.Hora.trim(),
          cancha: t.Cancha.trim(),
          precio: t.Precio,
          email: t.Email || t.email || "" 
        }));
        setTurnos(turnosTraducidos);
      } catch (err) {
        console.error("Error al obtener turnos", err);
      }
    };
    fetchTurnos();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoTurno((prev) => {
      if (name === "cancha") {
        const precio = preciosPorCancha[value] || "";
        return { ...prev, cancha: value, precio };
      }
      // si el input es hora y cambiamos hora, no tocamos el input de cancha 
      return { ...prev, [name]: value };
    });
  };

  // Actualiza horarios y canchas disponibles al cambiar fecha u hora
  useEffect(() => {
    if (nuevoTurno.dia) {
      actualizarDisponibilidad();
    }
   
  }, [nuevoTurno.dia, nuevoTurno.hora, turnos]);

  const actualizarDisponibilidad = () => {
    const horarios = ["20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00"];
    const horariosLibres = [];
    const canchasPorHorario = {};

    horarios.forEach((hora) => {
      const reservas = turnos.filter(
        (t) => t.dia === nuevoTurno.dia && t.hora === hora
      );

      let disponibles = Object.keys(preciosPorCancha);

      // Si alguna 6vs6 está reservada, quitar 8vs8
      const ocupado6A = reservas.some((r) => r.cancha === "6vs6 A");
      const ocupado6B = reservas.some((r) => r.cancha === "6vs6 B");
      const ocupado8 = reservas.some((r) => r.cancha === "8vs8");

      if (ocupado8) {
        // Si 8vs8 reservado, horario completo bloqueado
        disponibles = [];
      } else {
        if (ocupado6A) disponibles = disponibles.filter((c) => c !== "8vs8");
        if (ocupado6B) disponibles = disponibles.filter((c) => c !== "8vs8");
        // Quitar canchas ocupadas
        if (ocupado6A) disponibles = disponibles.filter((c) => c !== "6vs6 A");
        if (ocupado6B) disponibles = disponibles.filter((c) => c !== "6vs6 B");
      }

      if (disponibles.length > 0) {
        horariosLibres.push(hora);
        canchasPorHorario[hora] = disponibles;
      }
    });

    setHorariosDisponibles(horariosLibres);

    if (nuevoTurno.hora) {
      setCanchasDisponibles(canchasPorHorario[nuevoTurno.hora] || []);
    } else {
      setCanchasDisponibles([]);
    }
  };

  // ir a checkout 
  const handleSiguiente = () => {
    
    if (!nuevoTurno.dia || !nuevoTurno.hora || !nuevoTurno.cancha) {
      alert("Completá día, hora y cancha antes de continuar");
      return;
    }
    navigate("/checkout", { state: { nuevoTurno } });
  };

  return (
    <>
      <h2>Gestión de turnos online</h2>

      {usuario && (
        <div className="usuario-header fixed top-4 right-4 flex items-center gap-2 bg-white p-2 rounded shadow">
          {usuario.picture ? (
            <img src={usuario.picture} alt="avatar" className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
              {usuario.name ? usuario.name[0].toUpperCase() : "U"}
            </div>
          )}
          
              

          <div className="text-sm">
            <p className="font-bold">{usuario.name}</p>
            <p className="text-gray-500">{usuario.email}</p>
            <Logout/>
          </div>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="input-style input-card"
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={nuevoTurno.nombre}
          onChange={handleChange}
        />

        <input
          className="input-style input-card"
          type="date"
          placeholder="Fecha"
          name="dia"
          value={nuevoTurno.dia}
          onChange={handleChange}
        />
        <p></p>
        <select
          className="input-style input-card"
          name="hora"
          value={nuevoTurno.hora}
          onChange={handleChange}
        >
          <option value="">Seleccionar horario</option>
          {horariosDisponibles.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          className="input-style input-card"
          name="cancha"
          value={nuevoTurno.cancha}
          onChange={handleChange}
          onClick={() => setMostrarLayout(true)}
        >
          <option value="">Seleccionar cancha</option>
          {canchasDisponibles.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p></p>
        <input
          className="input-style input-card"
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoTurno.precio}
          readOnly
        />
        <p></p>
        <button type="button" onClick={handleSiguiente}>
          Siguiente
        </button>
      </form>

      {mostrarLayout && <Layout canchaSeleccionada={nuevoTurno.cancha} />}
      
      <MisTurnos />
    </>
  );
};

export default Turnos;





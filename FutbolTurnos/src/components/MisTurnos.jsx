import React, { useEffect, useState } from "react";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  //  Obtener usuario logueado desde LocalStorage
  useEffect(() => {
    const googleUser = localStorage.getItem("usuariosGoogle");
    const loginUser = localStorage.getItem("loginData");

    if (googleUser) {
      const u = JSON.parse(googleUser);
      setUsuario({
        email: u.email,
        name: u.name,
      });
    } else if (loginUser) {
      const u = JSON.parse(loginUser);
      setUsuario({
        email: u.email,
        name: u.email.split("@")[0],
      });
    }
  }, []);

  //  Traer todos los turnos del backend
  const fetchTurnos = async () => {
    try {
      const res = await fetch("http://localhost:59470/api/Futbol");
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();

      const turnosTraducidos = data.map((t) => ({
        id: t.Id,
        nombre: t.Nombre,
        dia: t.Dia.split("T")[0],
        hora: t.Hora,
        cancha: t.Cancha?.trim(),
        precio: t.Precio,
        email: t.Email, 
      }));

      setTurnos(turnosTraducidos);
    } catch (error) {
      console.error("Error al obtener turnos:", error);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  //  Filtrar solo turnos del usuario logueado (por email)
  const turnosUsuario =
    usuario?.email
      ? turnos.filter((t) => t.email?.toLowerCase() === usuario.email.toLowerCase())
      : [];

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">📅 Mis Turnos</h3>

      {!usuario ? (
        <p>Iniciá sesión para ver tus turnos.</p>
      ) : turnosUsuario.length === 0 ? (
        <p>No tenés turnos registrados.</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Hora</th>
              <th className="border p-2">Cancha</th>
              <th className="border p-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {turnosUsuario.map((turno) => (
              <tr key={turno.id}>
                <td className="border p-2">{turno.nombre}</td>
                <td className="border p-2">{turno.dia}</td>
                <td className="border p-2">{turno.hora}</td>
                <td className="border p-2">{turno.cancha}</td>
                <td className="border p-2">${turno.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisTurnos;

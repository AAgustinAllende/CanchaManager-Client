import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nuevoTurno = location.state?.nuevoTurno;

  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [loading, setLoading] = useState(false);
  const [pagado, setPagado] = useState(false);

  // Si no hay turno, no muestra nada
  if (!nuevoTurno) {
    return (
      <div className="mt-20 text-center text-red-600 font-bold">
        No se recibió la información del turno.
      </div>
    );
  }

  const crearEventoEnCalendar = async (turno) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return;
    }

    try {
      const [horaInicio, horaFin] = turno.hora.split(" - ");
      const evento = {
        summary: `Turno ${turno.cancha}`,
        description: `Cliente: ${turno.nombre} — Cancha: ${turno.cancha}`,
        start: {
          dateTime: `${turno.dia}T${horaInicio}:00-03:00`,
          timeZone: "America/Argentina/Buenos_Aires",
        },
        end: {
          dateTime: `${turno.dia}T${horaFin}:00-03:00`,
          timeZone: "America/Argentina/Buenos_Aires",
        },
      };

      await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        evento,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Evento agregado al Calendar");
    } catch (err) {
      console.error("Error al crear evento:", err);
      alert("No se pudo agregar a Google Calendar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const formatted = value
        .replace(/\D+/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setCard({ ...card, number: formatted });
    } else if (name === "expiry") {
      let formatted = value.replace(/\D+/g, "").slice(0, 4);
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
      }
      setCard({ ...card, expiry: formatted });
    } else {
      setCard({ ...card, [name]: value });
    }
  };

  const validarCampos = () => {
    if (card.number.length < 19) return false;
    if (card.name.trim().length < 3) return false;
    if (card.expiry.length < 5) return false;
    if (card.cvc.length < 3) return false;
    return true;
  };

  const handlePagar = async () => {
    if (!validarCampos()) {
      alert("Completá correctamente los datos de la tarjeta.");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      setPagado(true);
      setLoading(false);

      await crearEventoEnCalendar(nuevoTurno);

      try {
        const res = await fetch("http://localhost:59470/api/Futbol", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoTurno),
        });

        if (!res.ok) throw new Error(`Error al guardar turno. Status: ${res.status}`);

        const data = await res.json(); 

        navigate(`/qr/${data.id}`);
      } catch (error) {
        console.error("Error al agregar turno:", error);
        alert("Hubo un error al registrar el turno");
      }
    }, 2500);
  };

  return (
    <div className="flex mt-20 flex-col items-center justify-center bg-gray-100 p-5 border rounded">
      {/* Tarjeta visual */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl w-80 h-48 p-6 relative mb-6">
        <div className="text-lg font-mono tracking-widest">
          {card.number || "#### #### #### ####"}
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="text-sm uppercase">{card.name || "NOMBRE TITULAR"}</div>
          <div className="text-sm">{card.expiry || "MM/AA"}</div>
        </div>
        <div className="absolute bottom-6 right-6 text-sm">{card.cvc || "CVC"}</div>
      </div>

      {/* Formulario */}
      <form className="space-y-4 w-80" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="number"
          maxLength="19"
          placeholder="Número de tarjeta"
          value={card.number}
          onChange={handleChange}
          className="input-card w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="name"
          placeholder="Nombre del titular"
          value={card.name}
          onChange={handleChange}
          className="input-card w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            maxLength="5"
            placeholder="MM/AA"
            value={card.expiry}
            onChange={handleChange}
            className="input-card w-1/2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="cvc"
            maxLength="4"
            placeholder="CVC"
            value={card.cvc}
            onChange={handleChange}
            className="input-card w-1/2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={handlePagar}
          disabled={loading || pagado}
          className={`w-full relative font-bold py-3 rounded-lg transition 
            ${pagado ? "bg-green-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"} 
            ${loading ? "cursor-not-allowed" : ""}`}
        >
          {!loading && !pagado && "Pagar"}
          {loading && "Procesando..."}
          {pagado && "✅ Pagado"}

          {loading && (
            <span
              className="absolute left-0 top-0 h-full bg-white/40 rounded-lg"
              style={{ width: "100%", animation: "progressAnim 2.5s linear forwards" }}
            ></span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

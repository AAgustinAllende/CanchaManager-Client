import React from "react";

const Layout = ({ canchaSeleccionada }) => {
  // función helper para determinar si se pinta la cancha
  const pintarCanchaA = canchaSeleccionada === "8vs8" || canchaSeleccionada === "6vs6 A";
  const pintarCanchaB = canchaSeleccionada === "8vs8" || canchaSeleccionada === "6vs6 B";

  return (
    <svg width="400" height="600" style={{ border: "2px solid black", background: "white" }}>
      {/* Cancha A (arriba) */}
      <g id="canchaA" transform="translate(0,0)">
        <rect
          x="10"
          y="10"
          width="380"
          height="280"
          fill={pintarCanchaA ? "rgb(7, 247, 7)" : "none"}
          stroke="black"
          strokeWidth="3"
        />
        <line x1="200" y1="10" x2="200" y2="290" stroke="black" strokeWidth="2" />
        <circle cx="200" cy="150" r="30" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="200" cy="150" r="3" fill="black" />
        <rect x="10" y="80" width="60" height="140" fill="none" stroke="black" strokeWidth="2" />
        <rect x="330" y="80" width="60" height="140" fill="none" stroke="black" strokeWidth="2" />
      </g>

      {/* Cancha B (abajo) */}
      <g id="canchaB" transform="translate(0,300)">
        <rect
          x="10"
          y="10"
          width="380"
          height="280"
          fill={pintarCanchaB ? "rgb(7, 247, 7)" : "none"}
          stroke="black"
          strokeWidth="3"
        />
        <line x1="200" y1="10" x2="200" y2="290" stroke="black" strokeWidth="2" />
        <circle cx="200" cy="150" r="30" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="200" cy="150" r="3" fill="black" />
        <rect x="10" y="80" width="60" height="140" fill="none" stroke="black" strokeWidth="2" />
        <rect x="330" y="80" width="60" height="140" fill="none" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
};

export default Layout;

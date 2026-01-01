import React from "react";
import {QRCodeCanvas} from 'qrcode.react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "reactstrap"; 

const QRPage = () => {

  const navigate=useNavigate()

  const handleInicio = () => {
    navigate("/turnos");
  };
  const { id } = useParams(); 
  const datosQR = JSON.stringify({
    reservaId:id,
    mensaje:"Reserva confirmada"
  })
  // const qrUrl = `http://localhost:59470/api/Qr/Generar/${id}`;

  // const handleDownload = () => {
  //   const link = document.createElement("a")
  //   link.href = qrUrl
  //   link.download = `reserva_${id}.png`
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  


  return (
    <Card
      body
      color="primary"
      inverse
      outline
      style={{ width: "18rem", margin: "40px auto" }}
    >
      <div style={{ background: "white", padding: "10px" }}>
  <QRCodeCanvas value={`Reserva ${id}`} size={200} />
</div>
      {/* <img
        alt="QR Code"
        src={`http://localhost:59470/api/Qr/Generar/${id}`}
        style={{ width: "100%", padding: "10px" }}
      /> */}
      <CardBody>
        <CardTitle tag="h5">¡Reserva confirmada!</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Presentá este QR el día del turno
        </CardSubtitle>
        <CardText className="mb-2 text-dark" tag="h6">
          <p>Gracias por tu reserva, nos vemos en la cancha ⚽</p>
        </CardText>
        <Button onClick={handleInicio} color="light">Volver al inicio</Button>
        {/* <Button color="light" onClick={handleDownload} >Descargar QR</Button> */}
      </CardBody>
    </Card>
  );
};

export default QRPage;

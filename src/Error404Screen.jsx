import React from "react";
import Error404 from "./home/components/img/Error404.png";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'



export const Error404Screen = () => {
  return (
    <Container fluid className="  " style={{ background: " #7A0045", height:"100vh" }}>
      <div className="d-flex justify-content-center align-content-center">
<Image src={Error404} fluid   style={{ width: "100vw", height: "90vh" }} />
        </div>
<div  className="d-flex justify-content-center align-content-center" >
<Button variant="dark" className="mb-3"
          style={{
                 borderRadius: "20px",
               }}
             >
               <Link
                 className="fs-4 fw-ligh"
                 to={"/home"}
                 style={{
                   textDecoration: "none",
                   color: " #C85D16",
                   cursor: "pointer",
                 }}
               >
                 Volver Al Inicio
               </Link>
             </Button>
             </div>

</Container>
   
  )
};
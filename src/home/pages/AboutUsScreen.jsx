import React from "react";
import Container from "react-bootstrap/Container";
import GuillermoSantolaya from "../components/img/GuillermoSantolaya.jpg";
import MasielVenegas from "../components/img/MasielVenegas.jpg";
import Logotipo from "../components/img/Logotipo.png";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import "./AboutUsScreen.css"

export const AboutUsScreen = () => {
  return (

    <Container className="containerAbout">
      <h1 className="titleAbout" >
        Code School
      </h1>
      <h2 className="subTitleAbout">
        “Imagine it and make it real!”
      </h2>
      <div className="d-flex align-content-center justify-content-center">
        <Image
          src={Logotipo}
          alt="Code School logo"
          className=" img-fluid"
          style={{ width: "300px", height: "300px", }}
        />
      </div>

      <Row>
        <Col lg="6" sm="6" 
          className="justify-content-end d-flex  align-content-center text-center  mt-5" 
        >
          <Figure>
            <Figure.Image
              width={250}
              height={250}
              alt="Foto Dev. Masi"
              src={MasielVenegas}
              style={{ borderRadius: "50%" }}
            />
            <h2 className="titleAbout">
              Masiel Venegas
            </h2>
            <h5 className="titleAbout">   Full Stack Developer - Farmacéutica</h5>
            <Figure.Caption className="descriptionAbout" >
              Combino mi conocimiento en el campo de la salud con mi
              fascinación por la tecnología para explorar nuevas formas de
              mejorar la atención médica. Además, dedico mi tiempo libre a
              practicar deporte y desarrollar habilidades en programación, donde
              encuentro una vía para expresar mi creatividad y resolver
              desafíos.
            </Figure.Caption>
          </Figure>
        </Col>

        <Col lg="6" sm="6" className="justify-content-center d-flex  align-content-center text-center mt-5  m-auto"  >
          <Figure>
            <Figure.Image
              width={250}
              height={250}
              alt="Foto Dev. Masi"
              src={GuillermoSantolaya}
              style={{ borderRadius: "50%" }}
            />
            <h2 className=" titleAbout">
              Guillermo Santolaya
            </h2>
            <h5 className="titleAbout">   Full Stack Developer - Odontólogo</h5>
            <Figure.Caption className="descriptionAbout">         
           Mi dedicación se encuentra en brindar una atención de
              calidad, combinando mis conocimiento en odontología con las
              últimas innovaciones tecnológicas. Fuera de la práctica
              profesional disfruto explorar las últimas tendencias tecnológicas
              y estar al tanto de los avances en este campo.
            </Figure.Caption>
          </Figure>
        </Col>
      </Row> 
    </Container>

  );
};
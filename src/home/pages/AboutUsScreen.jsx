import React from "react";
import Container from "react-bootstrap/Container";
import GuillermoSantolaya from "../components/img/GuillermoSantolaya.jpg";
import MasielVenegas from "../components/img/MasielVenegas.jpg";
import Logotipo from "../components/img/Logotipo.png";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

export const AboutUsScreen = () => {
  return (

    <Container style={{ padding: "5rem 0 5rem 0", gap: "2rem" }}>
      <h1 className="text-center fw-bold" style={{ color: " #7A0045" }}>
        ScriptGenius
      </h1>
      <h2 className="text-center" style={{ fontStyle: "italic" }}>
        “Imagine it and make it real!”
      </h2>
      <div className="d-flex align-content-center justify-content-center">
        <Image
          src={Logotipo}
          alt="Code School logo"
          className=" img-fluid"
          style={{ width: "400px", height: "400px", }}
        />
      </div>

      <Row>
        <Col
          className="justify-content-end d-flex  align-content-center text-center  mt-5"
        >
          <Figure>
            <Figure.Image
              width={300}
              height={300}
              alt="Foto Dev. Masi"
              src={MasielVenegas}
              style={{ borderRadius: "50%" }}
            />
            <h2 className=" fw-semibold" style={{ color: " #7A0045" }}>
              Masiel Venegas
            </h2>
            <Figure.Caption className="fs-6" style={{ color: " black" }}>
              <strong className="fs-5" style={{ color: " #7A0045" }}>
                Full Stack Developer - Farmacéutica
              </strong>{" "}
              <br /> Combino mi conocimiento en el campo de la salud con mi
              fascinación por la tecnología para explorar nuevas formas de
              mejorar la atención médica. Además, dedico mi tiempo libre a
              practicar deporte y desarrollar habilidades en programación, donde
              encuentro una vía para expresar mi creatividad y resolver
              desafíos.
            </Figure.Caption>
          </Figure>
        </Col>

        <Col

          className="justify-content-center d-flex  align-content-center text-center mt-5 "
        >
          <Figure>
            <Figure.Image
              width={300}
              height={300}
              alt="Foto Dev. Masi"
              src={GuillermoSantolaya}
              style={{ borderRadius: "50%" }}
            />
            <h2 className=" fw-semibold" style={{ color: " #7A0045" }}>
              Guillermo Santolaya
            </h2>
            <Figure.Caption className="fs-6" style={{ color: "black" }}>
              <strong className="fs-5" style={{ color: " #7A0045" }}>
                Full Stack Developer - Odontólogo
              </strong>{" "}
              <br /> Mi dedicación se encuentra en brindar una atención de
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
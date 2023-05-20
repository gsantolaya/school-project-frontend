import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../components/img/Logo Navbar.png";
import ListGroup from "react-bootstrap/ListGroup";
import "./NavbarMenu.css";
import {
  BsTelephone,
  BsEnvelope,
  BsPinMap,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";

export function Footer() {
  return (
    <Nav className="justify-content-around navContainer p-4"  activeKey="/home">
        <div className="flex-column d-flex text-white ">
        <h4>Contactanos</h4>
        <ListGroup.Item>
          <strong>
            <BsTelephone /> Celular:
          </strong>{" "}
          351 384 18 56
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>
            <BsEnvelope /> Email:
          </strong>{" "}
          codeschool@codeschool.com
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>
            <BsPinMap /> Dirección:
          </strong>{" "}
          Av. Independencia 5125, <br /> San Miguel de Tucumán, Argentina
        </ListGroup.Item>
      </div>
      <Navbar.Brand href="#home">
        <img src={logo} width="300px" height="70px" alt="Code School logo" />
      </Navbar.Brand>

      <div className="flex-row d-flex" style={{ color: "white" }}>
        <ListGroup.Item className="p-2" action href="/">
          <BsFacebook size={30} />
        </ListGroup.Item>
        <ListGroup.Item className="p-2" action href="/">
          <BsInstagram size={30} />
        </ListGroup.Item>
        <ListGroup.Item className="p-2" action href="/">
          <BsTwitter size={30} />
        </ListGroup.Item>
        <ListGroup.Item className="p-2" action href="/">
          <BsWhatsapp size={30} />
        </ListGroup.Item>
      </div>
    </Nav>

   
  );
}

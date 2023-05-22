
import React from "react";
import Nav from "react-bootstrap/Nav";
import Logo from "../components/img/Logo.png";
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
    <Nav className="d-flex navContainer p-2 " activeKey="/home">
      <div className="col-md-4 text-white ps-5  ">
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
      <div className="d-flex align-items-center justify-content-center col-md-4">
          <img src={Logo} width="150px" height="150px" alt="Code School logo" />
      </div>
      <div className="col-4 text-white d-flex align-items-center justify-content-center ">
          <BsFacebook className='m-3' size={30} />
          <BsInstagram className='m-3' size={30} />
          <BsTwitter className='m-3' size={30} />
          <BsWhatsapp className='m-3' size={30} />
      </div>
    </Nav>


  );
}

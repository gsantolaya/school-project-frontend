import React from "react";
import Nav from "react-bootstrap/Nav";
import Logo from "../components/img/Logo.png";
import ListGroup from "react-bootstrap/ListGroup";
import "./Footer.css";
import {
  BsEnvelope,
  BsPinMap,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="d-flex footerContainer px-4 px-md-5">
      <div className="col-12 col-md-4 my-2 contactContainer">
        <h4 className='text-start'><b>Contáctanos:</b></h4>
        <ListGroup.Item className='d-flex'><BsEnvelope /><p className='mx-2 my-0'><b>Email:</b> codeschool@codeschool.com</p></ListGroup.Item>
        <ListGroup.Item className='d-flex'><BsPinMap /><p className='mx-2 my-0'><b>Dirección:</b> Av. Aconquija 1125</p></ListGroup.Item>
        <ListGroup.Item className='d-flex'><p className='my-0'>San Miguel de Tucumán, Argentina</p></ListGroup.Item>
      </div>
      <div className="col-12 col-md-4 d-flex align-items-center justify-content-center logoContainer">
        <img src={Logo} width="245px" alt="Code School logo" />
      </div>
      <div className="col-12 col-md-4 d-flex align-items-center justify-content-end socialMediaContainer">
        <Link to={"/error404"} className='socialMedia m-2'><BsFacebook size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsInstagram size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsTwitter size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsWhatsapp size={40} /></Link>
      </div>
    </div >
  )
}
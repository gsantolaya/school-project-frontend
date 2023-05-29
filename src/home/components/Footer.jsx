import React from "react";
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
      <div id='contactContainer' className="col-12 col-md-6 col-lg-4 my-2 ">
        <h4 className='text-center text-md-start'><b>Contáctanos:</b></h4>
        <ListGroup.Item className='d-md-flex'><BsEnvelope /><p className='mx-2 my-0'><b>Email:</b> gmail@codeschool.com</p></ListGroup.Item>
        <ListGroup.Item className='d-md-flex'><BsPinMap /><p className='mx-2 my-0'><b>Dirección:</b> Av. Aconquija 1125</p></ListGroup.Item>
        <ListGroup.Item className='d-md-flex'><p className='my-0'>San Miguel de Tucumán, Argentina</p></ListGroup.Item>
      </div>
      <div id='logoContainer' className="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
        <img className="logo" src={Logo} width="245px" alt="Code School logo" />
      </div>
      <div id='socialMediaContainer' className="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-end">
        <Link to={"/error404"} className='socialMedia m-2'><BsFacebook size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsInstagram size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsTwitter size={40} /></Link>
        <Link to={"/error404"} className='socialMedia m-2'><BsWhatsapp size={40} /></Link>
      </div>
    </div >
  )
}
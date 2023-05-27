import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { tokenIsValid } from '../../utils/TokenIsValid';
import axios from "axios";
import emailjs from '@emailjs/browser';

export const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [emailExists, setEmailExists] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkEmailExists = (email) => {
    return users.some(user => user.email === email);
  };

  const Submit = (data) => {
    const { email } = data;
    if (checkEmailExists(email)) {
      setEmailExists(true);
      return;
    }

    console.log({
      ...data,
      "isAdmin": false,
      "isActivated": true
    });

    axios.post("http://localhost:8060/api/users", {
      ...data,
      "isAdmin": false,
      "isActivated": true
    })
      .then((res) => {
        alert('usuario creado');
        const templateParams = {
          from_name: 'CODE SCHOOL',
          to_name: `${data.firstName} ${data.lastName}`,
          to_email: `${data.email}`
        };
        emailjs.send('service_5ww2agm', 'template_on5t7by', templateParams, '7vD0FeJBpJC_JXRfq')
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          }, (err) => {
            console.log('FAILED...', err);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get('http://localhost:8060/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));

    if (tokenIsValid()) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="authContainer">
      <div className="formRegisterContainer m-auto">
        <h3 className="text-center fw-bolder fs-3">Bienvenido a la Página</h3>
        <h2 className="text-center fw-bolder fs-2">De Registro</h2>
        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Nombre</Form.Label>
              <input
                className="fs-5 border-0"
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="text"
                placeholder="Ingrese su nombre"
                id="firstName"
                name="firstName"
                {...register("firstName", { required: true })}
              />
              {errors?.firstName && (
                <span className="text-danger">Este campo es requerido</span>
              )}
            </div>
            <FaUserAlt size={25} />
          </Form.Group>

          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Apellido</Form.Label>
              <input
                className="fs-5 border-0"
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="text"
                placeholder="Ingrese su apellido"
                id="lastName"
                name="lastName"
                {...register("lastName", { required: true })}
              />
              {errors?.lastName && (
                <span className="text-danger">Este campo es requerido</span>
              )}
            </div>
            <FaUserAlt size={25} />
          </Form.Group>

          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Email</Form.Label>
              <input
                className="fs-5 border-0"
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="email"
                placeholder="Ingrese su email"
                id="email"
                name="email"
                {...register("email", { required: true })}
              />
              {errors?.email && (
                <span className="text-danger">Este campo es requerido</span>
              )}
              {emailExists && (
                <span className="text-danger">El email ya ha sido registrado</span>
              )}
            </div>
            <MdEmail size={25} />
          </Form.Group>

          <Form.Group className="inputContainer" controlId="formBasicPassword">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Contraseña</Form.Label>
              <input
                className="fs-5 border-0"
                style={{ color: "#2f2f2f", background: "inherit" }}
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                id="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                })}
              />
              {errors?.password && (
                <span className="text-danger">
                  Este campo es requerido.
                </span>
              )}
              {errors?.password && errors.password.type === "pattern" && (
                <span className="text-danger">
                  La contraseña debe tener al menos 6 caracteres, una mayúscula y un número
                </span>
              )}
            </div>
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}
            </div>
          </Form.Group>
          <button className="fs-5" type="submit">Registrarme</button>
          <p className="text-center fs-5">
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="fs-4"
              to={"/login"}
              style={{
                textDecoration: "none",
                color: " #7A0045",
                cursor: "pointer",
              }}
            >
              Ingresa Aquí
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

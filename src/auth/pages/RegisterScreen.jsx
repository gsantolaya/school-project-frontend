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
      <div className="authForm col-12 col-md-4 py-5 m-md-4 pt-md-5 px-md-5 pb-md-4">
        <h3 className="authTitle mb-3">Registrarse</h3>
        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicEmail">
            <div className="col-10">
              <Form.Label className="d-inline">Nombre:</Form.Label>
              <input className="authInput d-block  w-100" type="text" placeholder="Ingrese su nombre" id="firstName" name="firstName" {...register("firstName", { required: true })} />
              {errors?.firstName && (<span className="authSpan">Este campo es requerido</span>)}
            </div>
            <div className='d-flex align-items-center'>
              <FaUserAlt size={25} />
            </div>
          </Form.Group>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicEmail">
            <div className="col-10">
              <Form.Label className="d-inline">Apellido:</Form.Label>
              <input className="authInput d-block  w-100" type="text" placeholder="Ingrese su apellido" id="lastName" name="lastName" {...register("lastName", { required: true })} />
              {errors?.lastName && (<span className="authSpan">Este campo es requerido</span>)}
            </div>
            <FaUserAlt size={25} />
          </Form.Group>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicEmail">
            <div className="col-10">
              <Form.Label className="d-inline">Email:</Form.Label>
              <input className="authInput d-block  w-100" type="email" placeholder="Ingrese su email" id="email" name="email" {...register("email", { required: true })} />
              {errors?.email && (<span className="authSpan">Este campo es requerido</span>)}
              {emailExists && (<span className="authSpan">El email ya ha sido registrado</span>)}
            </div>
            <MdEmail size={25} />
          </Form.Group>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicPassword">
            <div className="col-10">
              <Form.Label className="d-inline">Contraseña:</Form.Label>
              <input className="authInput d-block  w-100" type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" id="password" name="password"
                {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, })} />
              {errors?.password && (
                <span className="authSpan">
                  Este campo es requerido.
                </span>
              )}
              {errors?.password && errors.password.type === "pattern" && (
                <span className="authSpan">
                  La contraseña debe tener al menos 6 caracteres, una mayúscula y un número
                </span>
              )}
            </div>
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}
            </div>
          </Form.Group>
          <button className="authButton" type="submit">Registrarme</button>
          <p className="text-dark fw-bold mt-3 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link className="authLink" to={"/login"}>Ingresa Aquí</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

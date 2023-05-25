import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImKey } from "react-icons/im";


export const RegisterScreen = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = (data) => {
    console.log(data);
  };


  return (
    <div className="containerAuth">
      <div className="formContainer m-auto">
        <h3
          className="text-center fw-bolder fs-3"
          style={{ color: " #7A0045" }}
        >
          Bienvenido a la Página{" "}
        </h3>
        <h2
          className="text-center fw-bolder fs-2"
          style={{ color: " #7A0045" }}
        >
          De Registro
        </h2>
        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Nombre</Form.Label>
              <input
                className="fs-5  border-0 "
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="text"
                placeholder="Ingrese su nombre"
                id="firstName"
                name="fistName"
                {...register("fistName",{ required: true })}
              />
              {errors?.fistName && <span className="text-danger">Este campo es requerido</span>}
            </div>
           <FaUserAlt size={25} />

          </Form.Group>

          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Apellido</Form.Label>
              <input
                className="fs-5  border-0 "
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="text"
                placeholder="Ingrese su apellido"
                id="lastName"
                name="lastName"
                {...register("lastName",{ required: true })}
              />
                  {errors?.lastName && <span className="text-danger">Este campo es requerido</span>}
            </div>
            <FaUserAlt size={25}/>
          </Form.Group>

          <Form.Group className="inputContainer" controlId="formBasicEmail">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Email</Form.Label>
              <input
                className="fs-5 border-0 "
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="email"
                placeholder="Ingrese su email"
                id="email"
                name="email"
                {...register("email",{ required: true })}
              />
              {errors?.email && <span className="text-danger">Este campo es requerido</span>}
            </div>
            <MdEmail size={25}/>
          </Form.Group>

          <Form.Group className=" inputContainer" controlId="formBasicPassword">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Contraseña</Form.Label>
              <input
                className="fs-5  border-0 "
                style={{ color: "#2f2f2f", background: "inherit" }}
                type="password"
                placeholder="Ingrese su contraseña"
                id="password"
                name="password"
                {...register("password",{ required: true , pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/})}
              />
              {errors?.password && <span className="text-danger">Este campo es requerido. </span>}
           {errors?.password && errors.password.type === "pattern" && <span className="text-danger">La contraseña debe tener al menos 6 caracteres, una mayuscula y un numero</span>}
            </div>
            <ImKey size={25}/>
            
          </Form.Group>

          <button className="fs-5" type="submit">
            Registrarme
          </button>
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

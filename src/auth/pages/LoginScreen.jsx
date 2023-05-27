import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./Auth.css";
import { tokenIsValid } from "../../utils/TokenIsValid";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";


export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8060/api/users/login", data)
      .then((res) => {
        let value = res.data.token;
        localStorage.setItem("token", value);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (tokenIsValid()) {
      navigate("/home");
    }
  }, [navigate]);

  return (

    <div className="containerAuth">
      <div className="formContainer">
        <h3
          className="text-center fw-bolder fs-3"
          style={{ color: " #7A0045" }}
        >
          Bienvenido
        </h3>
        <Form onSubmit={handleSubmit(Submit)}>
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
                {...register("email", { required: true })}
              />
              {errors?.email && (
                <span className="text-danger">Este campo es requerido</span>
              )}
            </div>
            <MdEmail size={25}/>
           
          </Form.Group>

          <Form.Group className=" inputContainer" controlId="formBasicPassword">
            <div className="left">
              <Form.Label className="fs-5 fw-bold">Contraseña</Form.Label>
              <input
                className="fs-5  border-0 "
                style={{ color: "#2f2f2f", background: "inherit" }}
                type={showPassword ? "text": "password"}
                placeholder="Ingrese su contraseña"
                id="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                })}
              />
              {errors?.password && (
                <span className="text-danger">Este campo es requerido. </span>
              )}
              {errors?.password && errors.password.type === "pattern" && (
                <span className="text-danger">
                  La contraseña debe tener al menos 6 caracteres, una mayuscula
                  y un numero
                </span>
              )}
            </div>
            <div onClick={()=>setShowPassword(!showPassword)} >
            {showPassword ? <AiFillEye size={25}/> : <AiFillEyeInvisible size={25}/>}
       
            </div>
       
          </Form.Group>

          <button className="fs-5" type="submit">
            Registrarme
          </button>
          <p className="text-center fs-5">
            ¿Aún No tienes una Cuenta?{" "}
            <Link
              className="fs-4"
              to={"/register"}
              style={{
                textDecoration: "none",
                color: " #7A0045",
                cursor: "pointer",
              }}
            >
              Registrate!
            </Link>
          </p>
        </Form>
      </div>
    </div>

  );
};

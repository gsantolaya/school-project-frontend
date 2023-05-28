import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./Auth.css";
import { tokenIsValid } from "../../utils/TokenIsValid";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = (data) => {
    console.log(data)
    axios.post("http://localhost:8060/api/users/login", data)
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
    <div className="authContainer">
      <div className="authForm col-12 col-md-4 py-5 m-md-4 pt-md-5 px-md-5 pb-md-4">
        <h3 className="authTitle mb-3">Iniciar Sesión</h3>
        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicEmail">
            <div className="col-10">
              <Form.Label className="d-inline">Email:</Form.Label>
              <input className="authInput d-block w-100" type="email" placeholder="Ingrese su email" id="email" name="email" {...register("email", { required: true })} />
              {errors?.email && (<span className="spamLogin">Este campo es requerido</span>)}
            </div>
            <div className="d-flex align-items-center">
              <MdEmail size={25} />
            </div>
          </Form.Group>
          <Form.Group className="authFormGroup p-3 m-3" controlId="formBasicPassword">
            <div className="col-10">
              <Form.Label className="d-inline">Contraseña:</Form.Label>
              <input className="authInput d-block w-100" type={showPassword ? "text" : "password"} placeholder="Ingrese su contraseña" id="password" name="password"
                {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, })} />
              {errors?.password && (<span className="authSpan">Este campo es requerido. </span>)}
              {errors?.password && errors.password.type === "pattern" &&
                (<span className="authSpan">La contraseña debe tener al menos 6 caracteres, una mayuscula y un número.</span>)}
            </div>
            <div className="d-flex align-items-center btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEye size={25} /> : <AiFillEyeInvisible size={25} />}
            </div>
          </Form.Group>
          <div className="text-center">
            <Link className="authLink " to={"/error404"}><b>¿Olvidaste tu contraseña?</b></Link>
          </div>
          <button className="authButton" type="submit">Acceder</button>
          <p className="text-dark fw-bold mt-3 text-center">
            ¿Aún no tienes una Cuenta?{" "}
            <Link className="authLink" to={"/register"}>
              <b>Registrate!</b>
            </Link>
          </p>
        </Form>
      </div>
    </div>

  );
};

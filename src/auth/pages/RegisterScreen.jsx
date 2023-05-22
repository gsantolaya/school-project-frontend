import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"


export const RegisterScreen = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Submit = data => {
    navigate("/home")
    console.log(data)};

  return (
    <div className="containerAuth d-flex  justify-content-center align-items-center flex-column pt-5">
      <h1 className="title" >Registrate</h1>
    <div  >

      <Form onSubmit={handleSubmit(Submit)}>
     <Form.Group className="mb-3 "  controlId="formBasicEmail">
        <Form.Label>Nombre y Apellido</Form.Label>
        <Form.Control 
         placeholder="Carlos Perez" 
        type="text" 
        id="user"
        name="user"
        {...register("user",{ required: true })}
        />
          {errors?.user && <span className="text-danger">Este campo es requerido</span>}
      </Form.Group>

      <Form.Group className="mb-3 "  controlId="formBasicEmail">
        <Form.Label>Correo Electronico</Form.Label>
        <Form.Control 
          placeholder="carlos@gmail.com"   
        type="email" 
        id="email"
        name="email"
        {...register("email",{ required: true })}/>
        {errors?.email && <span className="text-danger">Este campo es requerido</span>}
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Contraseña</Form.Label>
        <Form.Control 
         placeholder="*******"
         type="password" 
         id="password"
         name="password"
         {...register("password",{ required: true , pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/})}
        />
        {errors?.password && <span className="text-danger">Este campo es requerido. </span>}
         {errors?.password && errors.password.type === "pattern" && <span className="text-danger">La contraseña debe tener al menos 6 caracteres, una mayuscula y un numero</span>}
      </Form.Group>
      
      
  
      <div className="justify-content-center  d-flex">
      <Button variant="outline-secondary" type="submit" className="w-50" >
        Acceder
      </Button>
      </div>

    </Form>
<div className="flex-column d-flex align-items-center mt-2" >
    <Form.Text>
    ¿Tienes una cuenta?
      </Form.Text>  
      
<Link  to={"/login"} >Ingresa Aquí</Link>
</div>

    </div>
    </div>
  )
}


import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"


export const LoginScreen = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const Submit = data => {
    navigate("/home")
    console.log(data)
  };


  return (
    <div className="d-flex  justify-content-center align-items-center flex-column mt-5">
      <h1 className="title" >Bienvenidos</h1>
      <div  >
        <Form onSubmit={handleSubmit(Submit)}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              placeholder="Carlos Perez"
              type="text"
              id="user"
              name="user"
              {...register("user", { required: true })}
            />
            {errors?.user && <span className="text-danger">Este campo es requerido</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label >Contraseña</Form.Label>
            <Form.Control
              placeholder="Contraseña"
              type="password"
              id="password"
              name="password"
              {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/ })}
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
            ¿No tienes cuenta?
          </Form.Text>

          <Link to={"/register"} >Registrate Aquí</Link>
        </div>
      </div>
    </div>
  )
}

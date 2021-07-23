// @React
import React, { useContext, useState } from "react";

// @Package
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// @Context
import { AuthContext } from "../auth/AuthContext";


export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (ev) => {
    const { name, value } = ev.target;

    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { name, email, password } = formRegister;
    const ok = await register(name, email, password);

    if (!ok) {
        Swal.fire('Error', 'There is an account with this email', 'error')
      }
  };

  const enableRegisterButton = () => {
    return formRegister.email.length > 0 &&
      formRegister.password.length > 0 &&
      formRegister.name.length > 0
      ? true
      : false;
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Register</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          name="name"
          onChange={onChange}
          placeholder="Name"
          type="text"
          value={formRegister.name}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          name="email"
          onChange={onChange}
          placeholder="Email"
          type="email"
          value={formRegister.email}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={formRegister.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Do you already have an account?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!enableRegisterButton()}
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

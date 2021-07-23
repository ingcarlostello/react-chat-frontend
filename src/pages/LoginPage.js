// @React
import React, { useContext, useEffect, useState } from "react";

// @Package
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

// @Context
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  useEffect(() => {
    const getEmailFromLocalStorage = localStorage.getItem("email");
    if (getEmailFromLocalStorage) {
      //   setForm({
      //     ...form,
      //     rememberme: true,
      //     email: getEmailFromLocalStorage,
      //   });
      setForm(prevForm => {
        return {
          ...prevForm,
          rememberme: true,
          email: getEmailFromLocalStorage,
        }
      })
    }
  }, []);

  const onChange = (ev) => {
    const { name, value } = ev.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme, //* (is equal to opposite value that check has)
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    
    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    const { email, password } = form;
    const ok = await login(email, password);

    if (!ok) {
      Swal.fire('Error', 'Check email and password', 'error')
    }
  };

  const enableLoginButton = () => {
    return ((form.email.length > 0 && form.password.length > 0) ? true : false)
  }

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Enter</span>
      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>
      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>
      <div className="row mb-3">
        <div className="col" onClick={() => toggleCheck()}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Remember me</label>
        </div>
        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            New account?
          </Link>
        </div>
      </div>
      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!enableLoginButton()}
        >Login</button>
      </div>
    </form>
  );
};

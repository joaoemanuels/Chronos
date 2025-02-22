import React, { useState } from "react";
import "./Register.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import logo from "../../LoginAssets/icon/tokenlogo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();


  const createUser = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3002/register", {
      Email: email,
      UserName: userName,
      Password: password
    }).then(()=> {
      navigateTo('/Dashboard')

      setEmail('')
      setUserName('')
      setPassword('')
    })
  };
  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src=""></video>

          <div className="textDiv">
            <h2 className="title">
              sghhgerherherherherhesdfrgat4w5hfsda45here
            </h2>
          </div>

          <div className="footerDiv flex">
            <span className="text">Já possui conta?</span>
            <Link to={"/Login"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h3>Vamos lá</h3>
          </div>

          <form action="" className="form grid">
            <span className="showMessage">Resgistre sstatus aquui</span>

            <div className="inputDiv">
              <label htmlFor="email">nome de email</label>
              <div className="input flex">
                <input
                  type="email"
                  id="email"
                  placeholder="digite seu nome de email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">nome de usuario</label>
              <div className="input flex">
                <input
                  type="text"
                  id="username"
                  placeholder="digite seu nome de usuario"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">senha</label>
              <div className="input flex">
                <input
                  type="password"
                  id="password"
                  placeholder="digite seu nome de password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Registre</span>
            </button>

            <span className="forgotPassword">
              Esqueceu sua senha? <a href="">clique aqui</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

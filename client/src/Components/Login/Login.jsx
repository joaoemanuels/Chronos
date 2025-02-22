import React, { useEffect, useState } from "react";
import "./Login.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import logo from "../../LoginAssets/icon/tokenlogo.png";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setstatusHolder] = useState("message");

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/login", {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword,
    }).then((response) => {
      console.log();

      if (response.data.message || loginUserName == "" || loginPassword == "") {
        navigateTo("/");
        setLoginStatus("Credenciais inválidas");
      } else {
        navigateTo("/Dashboard");
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setstatusHolder("showMessage");
      setTimeout(() => {
        setstatusHolder("message");
      }, 4000);
    }
  }, [loginStatus]);

  const onSubmit = ()=>{
    setLoginUserName('')
    setLoginPassword('')
  }

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src=""></video>

          <div className="textDiv">
            <h2 className="title">
              sghhgerherherherherhesdfrgat4w5hfsda45here
            </h2>
          </div>

          <div className="footerDiv flex">
            <span className="text">Não tem acesso?</span>
            <Link to={"/register"}>
              <button className="btn">SIgn up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="" />
            <h3>Bem vindo de volta</h3>
          </div>

          <form action="" className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">nome de usuario</label>
              <div className="input flex">
                <input
                  type="text"
                  id="username"
                  placeholder="digite seu nome de usuario"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Senha</label>
              <div className="input flex">
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login</span>
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

export default Login;

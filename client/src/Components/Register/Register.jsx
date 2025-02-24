import React, { useState } from "react";
import "./Register.css";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

import Facebook from "../../assets/icon/Facebook.png";
import Linkedin from "../../assets/icon/Linkedin.png";
import Google from "../../assets/icon/Google.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const createUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/register", {
      Email: email,
      UserName: userName,
      Password: password,
    }).then(() => {
      navigateTo("/Dashboard");

      setEmail("");
      setUserName("");
      setPassword("");
    });
  };
  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="formDiv flex">
          <div className="headerDiv">
            <h3>Vamos Começar</h3>
          </div>

          <form action="" className="form grid">
            <span className=""></span>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <input
                  type="email"
                  id="email"
                  placeholder="digite seu email Aqui"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="username">nome de Usuário</label>
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
                  placeholder="digite sua senha"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <span className="conditions">
              <input type="checkbox" id="checkbox" />
              &nbsp;&nbsp;Eu concordo com o processamento de meus
              <a href=""> dados pessoais</a>
            </span>

            <button type="submit" className="btn flex" onClick={createUser}>
              <span>Cadastrar-se</span>
            </button>

            <div className="loginApi">
              <hr />
              <div className="ContainerLogin">
                <a href="">
                  <img src={Google} alt="" srcset="" />
                </a>
                <a href=" ">
                  <img src={Facebook} alt="" srcset="" />
                </a>
                <a href=" ">
                  <img src={Linkedin} alt="" srcset="" />
                </a>
              </div>
            </div>

            <div className="footerDiv">
              <span className="text">Já possui conta?</span>
              <Link to={"/Login"}>
                <p>&nbsp;Conecte-se</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

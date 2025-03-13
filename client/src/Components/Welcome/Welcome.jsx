import React from "react";
import "./Welcome.css";
import "../../App.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="container">
      <div className="box">
        <h1 className="titleBox">Bem-vindo!</h1>
        <p className="contentBox">
          Seja bem-vindo e realize o login ou crie uma nova conta em nosso
        </p>
      </div>
      <div className="buttonContainer">
        <Link to="/Login" className="btn btn1">
          Fazer Login
        </Link>
        <Link to="/Register" className="btn">
          Criar Conta
        </Link>
      </div>
    </div>
  );
};

export default Welcome;

import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/backgroundWelcome.png";

const Welcome = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.titleBox}>Bem-vindo!</h1>
        <p style={styles.contentBox}>
          Seja bem vindo e realize o login ou crie uma nova conta em nosso
        </p>
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/Login" style={{ ...styles.btn, ...styles.btn1 }}>
          Fazer Login
        </Link>
        <Link to="/Register" style={styles.btn}>
          Criar Conta
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "100vh",
    width: "100%",
    margin: "0",
    backgroundColor: "blue",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  box: {
    margin: "0",
    padding: "0",
    color: "white",
  },
  titleBox: {
    marginBottom: "30px",
  },
  contentBox: {
    fontSize: "1.5rem",
    fontWeight: "100",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "0",
  },
  btn: {
    textDecoration: "none",
    border: "none",
    width: "50%",
    height: "60px",
    backgroundColor: "#EDF4FA",
    color: "#346CAD",
    fontWeight: "bolder",
    fontSize: "1rem",
    borderRadius: "20px 0 0 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn1: {
    backgroundColor: "none",
    color: "white",
  },
};

export default Welcome;

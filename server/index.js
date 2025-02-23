const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 3002;

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
  console.log(`server is running on port ${port}`);
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "chronosdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados");
});

app.post("/register", (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;

  const SQL = "INSERT INTO users (email, username, password) VALUES (?,?,?)";
  const Values = [sentEmail, sentUserName, sentPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Usuário inserido com sucesso");
      res.send({ message: "Usuário adicionado" });
    }
  });
});

app.post("/login", (req, res) => {
  const sentloginUserName = req.body.LoginUserName;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM users WHERE username = ? && password = ?";
  const Values = [sentloginUserName, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send({ message: "Suas credenciais são inválidas" });
    }
  });
});

app.post("/events", (req, res) => {
  const { title, start_date, end_date, category, user_id } = req.body;

  console.log(req.body);  // Log para verificar os dados recebidos

  const query =
    "INSERT INTO events (title, start_date, end_date, category, user_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, start_date, end_date, category, user_id],
    (err, result) => {
      if (err) {
        console.error(err); // Log do erro para mais detalhes
        return res.status(500).send("Erro ao salvar evento");
      }
      res.status(201).send({
        id: result.insertId,
        title,
        start_date,
        end_date,
        category,
        user_id,
      });
    }
  );
});


app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM events WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json({ message: "Evento removido com sucesso" });
  });
});

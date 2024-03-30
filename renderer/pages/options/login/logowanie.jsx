import React, { useState } from "react";
import styles from "./logowanie.module.css";
import axios from "axios";

function LoginPage({ setUserLogin, setBubbleMessage }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [tryb, setTryb] = useState("logowanie");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (tryb === "logowanie") {
      axios
        .post("http://localhost:8000/api/registers/user_login/", formData)
        .then((response) => {
          console.log("Odpowiedź od serwera:", response);
          axios.defaults.headers["Authorization"] =
            "Token " + response.data.token;
          localStorage.setItem(
            "jwtToken",
            axios.defaults.headers["Authorization"]
          );
          setBubbleMessage("Zalogowano");
          setUserLogin(axios.defaults.headers["Authorization"]);
        })
        .catch((error) => {
          setBubbleMessage("Błąd w trakcie logowania");
          console.error("Błąd podczas wysyłania danych:", error);
        });
    } else {
      axios
        .post("http://localhost:8000/api/registers/", formData)
        .then((response) => {
          if (response.status === 201) {
            setBubbleMessage("Pomyślnie zarejestrowano"); // Ustawienie wiadomości dymka
          }
        })
        .catch((error) => {
          setBubbleMessage("Błąd w trakcie rejestracji"); // Ustawienie wiadomości dymka
          console.error("Błąd podczas wysyłania danych:", error);
        });
    }
  };
  if (typeof localStorage !== 'undefined') 
  {
    if (localStorage.getItem("jwtToken")){
      axios.defaults.headers["Authorization"] = localStorage.getItem("jwtToken");
      setUserLogin(axios.defaults.headers["Authorization"]);
      // ping czy jeszcze token jest ważny
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.formularze}>
        <div className={styles.buttons}>
          <button className={`${styles.but} ${tryb=='logowanie'? styles.active : styles.deactive}`} onClick={() => setTryb("logowanie")}>
            logowanie
          </button>
          <button className={`${styles.but} ${tryb=='rejestracja'? styles.active : styles.deactive}`} onClick={() => setTryb("rejestracja")}>
            rejestracja
          </button>
        </div>
        <form id={styles.myForm} onSubmit={handleSubmit}>
          {tryb === "logowanie" ? "Logowanie" : "Rejestracja"}
          <hr className={styles.my_hr} />
          <div className={styles.label}>
            <label htmlFor="username">Login:</label>
            <input
              type="text"
              className={styles.input}
              id={styles.name}
              name="username"
              value={formData.name}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className={styles.label}>
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              className={styles.input}
              id={styles.password}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
          </div>
          <hr className={styles.my_hr} />
          <input
            type="submit"
            className={styles.input}
            value={tryb === "logowanie" ? "Zaloguj" : "Zarejestruj"}
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

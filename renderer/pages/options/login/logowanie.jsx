import React, { useState } from "react";
import styles from "./logowanie.module.css";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";

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
                    axios.defaults.headers["Authorization"] = "Token " + response.data.token;
                    localStorage.setItem("jwtToken", axios.defaults.headers["Authorization"]);
                    setUserLogin(axios.defaults.headers["Authorization"]);
                    setBubbleMessage("Zalogowano");
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
                        setFormData({
                            username: "",
                            password: "",
                        });
                        setTryb("logowanie");
                        setBubbleMessage("Pomyślnie zarejestrowano"); // Ustawienie wiadomości dymka
                    }
                })
                .catch((error) => {
                    setBubbleMessage("Błąd w trakcie rejestracji"); // Ustawienie wiadomości dymka
                    console.error("Błąd podczas wysyłania danych:", error);
                });
        }
    };
    if (typeof localStorage !== "undefined") {
        if (localStorage.getItem("jwtToken")) {
            axios
                .get("http://localhost:8000/api/registers/ping/", {
                    headers: {
                        Authorization: localStorage.getItem("jwtToken"),
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        axios.defaults.headers["Authorization"] = localStorage.getItem("jwtToken");
                        setUserLogin(axios.defaults.headers["Authorization"]);
                        setBubbleMessage("Zalogowano");
                    } else if (response.status in (402, 403)) {
                        setBubbleMessage("Zaloguj się ponownie");
                        localStorage.setItem("jwtToken", "");
                    }
                })
                .catch((error) => {
                    console.error("Błąd podczas wysyłania danych:", error);
                    localStorage.setItem("jwtToken", "");
                    setBubbleMessage("Błąd połączenia z serwerem");
                });
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.formularze}>
                <div className={styles.buttons}>
                    <button
                        className={`${styles.but} ${
                            tryb == "logowanie" ? styles.active : styles.deactive
                        }`}
                        onClick={() => setTryb("logowanie")}
                    >
                        logowanie
                    </button>
                    <button
                        className={`${styles.but} ${
                            tryb == "rejestracja" ? styles.active : styles.deactive
                        }`}
                        onClick={() => setTryb("rejestracja")}
                    >
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
                            value={formData.username}
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

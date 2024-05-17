import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
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
        axios.defaults.headers["Authorization"]= ""
        if (tryb === "logowanie") {
            axios
                .post("http://localhost:8000/api/registers/user_login/", formData)
                .then((response) => {
                    console.log("Odpowiedź od serwera:", response);
                    axios.defaults.headers["Authorization"] = "Token " + response.data.token;
                    localStorage.setItem("djangoToken", axios.defaults.headers["Authorization"]);
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
    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            if (localStorage.getItem("djangoToken")) {
                console.log(localStorage.getItem("djangoToken"))
                axios
                    .get('http://localhost:8000/api/files/', {
                        headers: {
                            Authorization: typeof localStorage !== "undefined" ? localStorage.getItem("djangoToken"):null,
                        },
                    })
                    .then((response) => {
                        if (response.status == 200) {
                            axios.defaults.headers["Authorization"] = localStorage.getItem("djangoToken");
                            setUserLogin(axios.defaults.headers["Authorization"]);
                            setBubbleMessage("Zalogowano");
                        } else if (response.status in (401, 403)) {
                            setBubbleMessage("Zaloguj się ponownie");
                            localStorage.setItem("djangoToken", "");
                        }
                    })
                    .catch((error) => {
                        console.error("Błąd podczas wysyłania danych:", error);
                        localStorage.setItem("djangoToken", "");
                        setBubbleMessage("Błąd połączenia z serwerem");
                    });
            }
        }
    }, []);
    

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

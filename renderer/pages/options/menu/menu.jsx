import React from "react";
import axios from "axios";

function MenuPage({ setUserLogin }) {
  return (
    <div>
      menu
      <button
        onClick={() => {
          axios
            .get("http://localhost:8000/api/files/")
            .then((response) => {
              console.log("Odpowiedź od serwera:", response);
            })
            .catch((error) => {
              console.error("Błąd podczas wysyłania danych:", error);
            });
        }}
      >
        test
      </button>
      <button
        onClick={() => {
          axios.defaults.headers["Authorization"] = "";
          localStorage.setItem(
            "jwtToken",
            ""
          );
          setUserLogin("");
        }}
      >
        wyloguj
      </button>
    </div>
  );
}

export default MenuPage;

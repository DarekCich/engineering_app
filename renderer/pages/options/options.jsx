import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./login/logowanie";
import MenuPage from "./menu/menu";
import Bubble from "../helpers/bubble"; // Importowanie komponentu dymka

function OptionsPage() {
  const [userLogin,       setuserLogin] = useState(axios.defaults.headers.common['Authorization']);
  const [bubbleMessage, setBubbleMessage] = useState(""); // Nowy stan dla wiadomości dymka
  const handleCloseBubble = () => {
    setBubbleMessage(""); // Funkcja zamykająca dymek
  };
  return (
    <div>
      { userLogin ? <MenuPage setUserLogin={setuserLogin}/>:
        <LoginPage setUserLogin={setuserLogin} setBubbleMessage={setBubbleMessage}/>
      }
      {bubbleMessage && (
        <Bubble message={bubbleMessage} onClose={handleCloseBubble} />
      )}
    </div>
  );
}

export default OptionsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./login/logowanie";
import MenuPage from "./menu/menu";

function OptionsPage({setBubbleMessage}) {
    const [userLogin, setuserLogin] = useState(axios.defaults.headers.common["Authorization"]);
    return (
        <div>
            {userLogin ? (
                <MenuPage setUserLogin={setuserLogin} />
            ) : (
                <LoginPage setUserLogin={setuserLogin} setBubbleMessage={setBubbleMessage} />
            )}
        </div>
    );
}

export default OptionsPage;

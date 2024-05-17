import React, { useEffect, useState } from "react";
import LoginPage from "./login/login";

function WebPage({ setBubbleMessage ,setuserLogin}) {
    
    return (
        <div>
            <LoginPage setUserLogin={setuserLogin} setBubbleMessage={setBubbleMessage} />
        </div>
    );
}

export default WebPage;

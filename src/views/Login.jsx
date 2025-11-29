import React, { useState } from "react";
import Loginform from "../components/Loginform";
import Registerform from "../components/Registerform";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? "Switch to Register" : "Switch to Login"}
      </button>

      {showLogin ? <Loginform /> : <Registerform />}
    </>
  );
}

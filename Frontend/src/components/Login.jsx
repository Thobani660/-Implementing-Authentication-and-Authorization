import React, { useState } from "react";
import { auth } from "../firebase";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const idTokenResult = await userCredential.user.getIdTokenResult();
      const role = idTokenResult.claims.role;

      if (role === "super-admin") history.push("/super-admin");
      else if (role === "general-admin") history.push("/general-admin");
      else alert("Unauthorized role");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

// src/components/Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/welcome"); // Redirect to Welcome for login
  }, [navigate]);

  return null; // No rendering needed
}

export default Login;
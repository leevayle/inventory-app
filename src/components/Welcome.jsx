// src/components/Welcome.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row w-[50vw] min-w-[300px] min-h-[70vh] m-auto shadow-lg rounded-xl border border-[var(--primary)] sm:min-w-[550px]">
        <div className="sm:w-1/3 w-full bg-white rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-bl-xl bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center">
          <Link to="/register">
            <button className="m-4 p-2 bg-[var(--accent)] rounded shadow hover:bg-gray-100 cursor-pointer transition">
              Register
            </button>
          </Link>
        </div>
        <div className="flex-1 bg-gray-100 rounded-bl-xl rounded-br-xl sm:rounded-bl-none sm:rounded-tr-xl flex flex-col pb-4 h-auto">
          <p className="text-2xl font-bold text-center mt-10 text-[var(--primary)]">Welcome!</p>
          <form onSubmit={handleLogin} className="flex flex-col w-[90%] m-auto h-80 rounded-xl pt-10">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {loading && <p className="text-center mb-4">Logging in...</p>}
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] max-w-72 h-9 rounded-xl border border-gray-400 p-2 text-center outline-0 focus:border-[var(--accent)] focus:w-[95%] transition-all m-auto focus:shadow"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[90%] max-w-72 h-9 rounded-xl border border-gray-400 p-2 text-center outline-0 focus:border-[var(--accent)] focus:w-[95%] transition-all m-auto focus:shadow mt-5"
              required
            />
            <button
              type="submit"
              className="w-1/2 h-10 hover:w-2/3 bg-[var(--primary)] m-auto mt-20 rounded-3xl hover:bg-[var(--accent)] cursor-pointer transition-all hover:font-bold hover:shadow"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="m-auto text-gray-400 mt-4">
              Forgot password? <Link to="/reset" className="text-[var(--accent)] underline">Reset it</Link>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Welcome;
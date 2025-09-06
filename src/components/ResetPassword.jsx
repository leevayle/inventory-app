// src/components/ResetPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for a password reset link!");
      setTimeout(() => navigate("/welcome"), 3000); // Redirect after 3 seconds
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
          <button
            onClick={() => navigate("/welcome")}
            className="m-4 p-2 bg-[var(--accent)] rounded shadow hover:bg-gray-100 cursor-pointer transition"
          >
            Back
          </button>
        </div>
        <div className="flex-1 bg-gray-100 rounded-bl-xl rounded-br-xl sm:rounded-bl-none sm:rounded-tr-xl flex flex-col pb-4 h-auto">
          <p className="text-2xl font-bold text-center mt-10 text-[var(--primary)]">Reset Password</p>
          <form onSubmit={handleReset} className="flex flex-col w-[90%] m-auto h-80 rounded-xl pt-10">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            {loading && <p className="text-center mb-4">Sending reset link...</p>}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] max-w-72 h-9 rounded-xl border border-gray-400 p-2 text-center outline-0 focus:border-[var(--accent)] focus:w-[95%] transition-all m-auto focus:shadow"
              required
            />
            <button
              type="submit"
              className="w-1/2 h-10 hover:w-2/3 bg-[var(--primary)] m-auto mt-20 rounded-3xl hover:bg-[var(--accent)] cursor-pointer transition-all hover:font-bold hover:shadow"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
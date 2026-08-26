// Main Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../services/register";

// File Import
import logo from "../assets/library_logo.png";
import form_picture from "../assets/women_reading_and_coffee.png";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const body = {
      email,
      username,
      password,
    };

    try {
      setLoading(true);

      const data = await register(body);

      setSuccess(data.message || "Account created successfully!");

      setEmail("");
      setUsername("");
      setPassword("");

      if (data.success) {
        navigate("/member")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex w-full h-20 px-16 bg-taupe-800 justify-center items-center shadow-sm border-b border-taupe-700/50">
        <a href="/">
          <img src={logo} className="w-auto h-[4.5rem]" />
        </a>
      </nav>

      <div className="flex-1 w-full px-8 md:px-16 py-12 bg-yellow-50 flex items-center justify-center relative overflow-hidden">
        <div className="flex w-full max-w-4xl h-[30rem] bg-white shadow-xl overflow-hidden">
          <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-taupe-100">
            <img src={form_picture} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col justify-center px-10 py-8">
            <h1 className="text-2xl font-lustria text-taupe-800 mb-1">
              Create an account
            </h1>

            <p className="text-sm text-taupe-500 mb-6">
              Join us and start borrowing today.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-taupe-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-taupe-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="bookworm42"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-taupe-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              {success && <p className="text-sm text-green-600">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-2.5 rounded-lg bg-taupe-800 text-white font-lustria tracking-wide hover:bg-taupe-700 hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-sm text-taupe-500 mt-5 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-600 font-medium hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

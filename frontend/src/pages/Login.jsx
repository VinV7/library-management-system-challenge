// Main Import
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/login";

// Files Import
import logo from "../assets/library_logo.png";
import form_picture from "../assets/man_reading.png";

// Services Import
import cookie_check_services from "../services/cookie_check_services";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check_cookie = async () => {
      try {
        const response = await cookie_check_services();

        if (response.cookie === true) {
          navigate(`/${response.page}`);
        }

        setPageLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    check_cookie();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(formData);

      switch (data.role) {
        case "Librarian":
          navigate("/librarian");
          break;

        case "Member":
          navigate("/member");
          break;

        case "Super Admin":
          navigate("/master-library");
          break;

        default:
          throw new Error("Unknown user role");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading === true) {
    return (
      <div>
        Page Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex w-full h-20 px-16 bg-taupe-800 justify-center items-center shadow-sm border-b border-taupe-700/50">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            className="w-auto h-[4.5rem]"
            alt="Library Logo"
          />
        </button>
      </nav>

      <div className="flex-1 w-full px-8 md:px-16 py-12 bg-yellow-50 flex items-center justify-center relative overflow-hidden">
        <div className="flex w-full max-w-4xl h-[30rem] bg-white shadow-xl overflow-hidden">

          <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-taupe-100">
            <img
              src={form_picture}
              className="w-full h-full object-cover"
              alt="Man reading"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center px-10 py-8">
            <h1 className="text-2xl font-lustria text-taupe-800 mb-1">
              Log Into Your Account
            </h1>

            <p className="text-sm text-taupe-500 mb-6">
              Enter your account information and start reading!
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-taupe-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-2.5 rounded-lg bg-taupe-800 text-white font-lustria tracking-wide hover:bg-taupe-700 hover:scale-[1.02] transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-taupe-500 mt-5 text-center">
              Don't have an account yet?{" "}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-orange-600 font-medium hover:underline"
              >
                Register Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
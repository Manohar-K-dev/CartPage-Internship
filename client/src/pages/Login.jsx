import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Context
import MainContext from "../context/MainContext";
// Api
import { authAPI } from "../services/api.js";

const Login = () => {
  const [login, setLogin] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login: contextLogin } = useContext(MainContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (login === "login") {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      contextLogin(response.user, response.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 px-10 py-10 md:px-20 md:py-20 lg:px-60 lg:py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col h-80 w-96 rounded-2xl gap-8 items-center justify-center">
        <h1 className="text-4xl font-bold">
          {login === "login" ? "Login" : "Signup"}
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {login != "login" && (
            <label className="flex flex-col gap-2">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border rounded-lg p-2"
                required
              />
            </label>
          )}
          <label className="flex flex-col gap-2">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="border rounded-lg p-2"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border rounded-lg p-2"
              required
              minLength="6"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-400 mt-4 rounded-lg py-2"
          >
            {loading ? "Loading..." : login === "login" ? "Login" : "Signup"}
          </button>
        </form>
        <div>
          {login === "login" ? (
            <p>
              New user{" "}
              <span
                onClick={() => setLogin("signup")}
                className="text-green-900 font-bold cursor-pointer"
              >
                Signup
              </span>
              ?
            </p>
          ) : (
            <p>
              Already Registered please{" "}
              <span
                onClick={() => setLogin("login")}
                className="text-green-900 font-bold cursor-pointer"
              >
                Login
              </span>
              ?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../UserContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data, status } = await axios.post("/login", { email, password }, { withCredentials: true });
      console.log("Response data:", data);
      console.log("Response status:", status);
      if (status === 200) {
        setUser(data);
        alert("Login Successful");
        setRedirect(true);
      } else {
        alert("Failed to login, please try again later");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Failed to login, please try again later");
    }
  }

  if (redirect) {
    console.log("Redirecting to home page");
    return <Navigate to="/" />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to="/register" className="underline text-black">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

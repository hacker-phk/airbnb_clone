import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser (ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('/register', {
        name,
        email,
        password
      });
      setEmail("");
      setName("");
      setPassword("");
      alert("Registration successful");
      console.log(response);
    } catch (err) {
      alert("Registration failed, please try again");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
          <button className="primary" type="submit">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? 
            <Link to={"/login"} className="underline text-black">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

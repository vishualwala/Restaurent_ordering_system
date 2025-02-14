import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const userData = { name, email, password, username, department, section, year };
    console.log("User Data to Register:", userData); // Log the user data
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send the user data
      });
  
      const data = await response.json();
      console.log("Response Data:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed!");
      }
  
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Something went wrong. Check console for details.");
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} required />
        <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

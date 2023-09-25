import React, { useState } from "react";
import axios from "axios";

function SigninForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear the data
    setFormData({
      email: "",

      password: "",
    });
    try {
      // making request to url route
      let response = await axios.post("http://localhost:4000/signup", {
        formData,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <h1>SignIn Form</h1>
      <p>For Testing of JWT and BCRYPT</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">SignIn</button>
      </form>
    </div>
  );
}

export default SigninForm;

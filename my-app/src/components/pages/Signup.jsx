import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const SignupForm = () => {
  const [page, Setpage] = useState(0);
  const [loading, Setloading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
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

    try {
      Setloading(true);
      // making request to url route
      let response = await axios.post("http://localhost:4000/signup", {
        formData,
      });
      // console.log(response.data);

      Setloading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      // setting page
      Setpage(1);
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        toast.error("Password do not match");
      }
      if (error && error.response && error.response.status === 400) {
        toast.error("A user with same email id is presnet");
      }
      // console.log(error);
      Setloading(false);
    }
  };

  // for the singin of the page
  const [signinData, SetsigninData] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    SetsigninData({
      ...signinData,
      [name]: value,
    });
  };

  const handleSubmits = async (e) => {
    e.preventDefault();

    try {
      // making request to url route
      let response = await axios.post("http://localhost:4000/signin", {
        signinData,
      });

      // clear the data
      SetsigninData({
        email: "",
        password: "",
      });
      // console.log(response.data);
      alert(
        `Thanks for sign in your are now autrized user Your JWt is ${response.data}`
      );
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        toast.error("Please enter valid credentials to login");
      }
      // console.log(error);
    }
  };

  return page === 0 ? (
    <div className="signup-container">
      {loading ? (
        <h1 style={{ color: "red" }}>...loading</h1>
      ) : (
        <>
          <h1>Signup Form</h1>
          <p>For Testing of JWT and BCRYPT</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
              <label htmlFor="address">City</label>
              <input
                type="text"
                id="address"
                name="city"
                value={formData.city}
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
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Signup</button>
            <label
              onClick={() => {
                Setpage(1);
              }}
              style={{ color: "red", marginLeft: "auto", marginTop: "1px" }}
              htmlFor=""
            >
              <button hidden>hell</button>
              already have an account
            </label>
          </form>
        </>
      )}
    </div>
  ) : (
    // for the sing in page
    <div className="signup-container">
      <h1>SignIn Form</h1>
      <p>For Testing of JWT and BCRYPT</p>
      <form onSubmit={handleSubmits}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={signinData.email}
            onChange={handleChanges}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={signinData.password}
            onChange={handleChanges}
            required
          />
        </div>

        <button type="submit">SignIn</button>
        <label
          onClick={() => {
            Setpage(0);
          }}
          style={{ color: "blue", marginLeft: "auto", marginTop: "1px" }}
          htmlFor=""
        >
          <button hidden>hell</button>
          Don't have an account
        </label>
      </form>
    </div>
  );
};

export default SignupForm;

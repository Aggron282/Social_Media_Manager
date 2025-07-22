import React, { useState } from "react";
import axios from "axios";

function Login (){

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const tryLogin = async (e) => {

    e.preventDefault();
    var domain = process.env.REACT_APP_API || "http://localhost:5000/";
    console.log(`${domain}/login`)
    console.log(formData);
    const {data} = await axios.post(`${domain}login`, {
      username: formData.username,
      password: formData.password,
    });

    if(data.userId != null){
        window.location.assign(`/dashboard/${data.userId}`);
    }else{
      alert("Wrong Credentials");
    }

  }

  return (
        <div class="login--page">
          <div class="login-form">
            <h3 class="title"> Welcome Back! </h3>
            <p class="description"> We just need to verify your identity </p>
            <div class="inner-container">
                <form>
                <div class="input-item">
                  <label>
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className={`input-field`}
                  />                </div>
                <div class="input-item">
                  <label>
                    Password
                  </label>
                  <input

                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`input-field`}
                  />                </div>

                <button class="submit btn" type="submit" onClick = {tryLogin}>Submit</button>

                </form>

                <div class="links-container">
                  <a href = "/create_account">
                      Don't have an account? Create one here!
                  </a>
                  <br/>
                  <a href = "/forgot">
                      Forgot Password?
                  </a>
                </div>

            </div>

          </div>

        </div>

    )

}

export default Login;

import React, { useEffect, useState } from 'react';
import '../Assets/css/LoginForm.css';
import {Link, useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
});
 const [showSubmitError, setShowSubmitError] = useState(false)
 const [errorMsg, setErrorMsg] = useState("") 
  const navigate = useNavigate()

  const onSubmitSuccess = (jwtToken) => {
   Cookies.set("jwt_token", jwtToken, {
    expires:60,
    path: "/"
   })
   navigate("/")
  }

 useEffect(() => {
  const jwtToken = Cookies.get("jwt_token")
  if(jwtToken !== undefined) {
    navigate("/")
  }

 },[navigate])
  

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = formData;
      const userDetails = { username, password };
      const url = 'http://localhost:5000/api/login';
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
       console.log(data.token)
       if (response.ok) {
        onSubmitSuccess(data.token)
       } else {
         onSubmitFailure(data.error_msg);
       }

      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onChangeUsername = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const onChangePassword = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          value={formData.username}
          id="username"
          className="username-input-field"
          onChange={onChangeUsername}
        />
      </>
    );
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="imput-label" htmlFor="password">
          Password
        </label>
        <input
          type="text"
          id="password"
          value={formData.password}
          className="password-input-field"
          onChange={onChangePassword}
        />
      </>
    );
  };
   


  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website login"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button className="login-button" onClick={submitForm}>
          submit
        </button>
        {showSubmitError && <p className='error-message'>{errorMsg} </p> }
        <p className='options' >Not a member yet ? <Link to = "/register">Register</Link> </p>

      </form>
    </div>
  );
};

export default LoginForm;


//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThhYjZkY2U4MTUzNjBiYTM0NDJmZDIiLCJpYXQiOjE3MDM3NjY5MzUsImV4cCI6MTcwMzc2NjkzNX0.oHmtFGi7ZFxoOk4u_N4BT4GR7vX-qe3jHpK-ATcpfL4"
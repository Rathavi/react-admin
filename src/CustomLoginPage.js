// LoginPage.js
import React from "react";
import { Login, LoginForm } from "react-admin";

const CustomLoginForm = props => (
  <div>
    <LoginForm {...props} />
  </div>
);

const CustomLoginPage = props => (
  <div className="main-content">
      <div className="container">
        <div className="card">
          <Login className="login-page" loginForm={<CustomLoginForm />} {...props} />
        </div>
      </div>
  </div>
);

export default CustomLoginPage;

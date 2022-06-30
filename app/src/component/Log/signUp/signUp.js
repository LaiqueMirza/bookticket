import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../logIn/logIn.css";
import { Card, message } from 'antd';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
const history = useHistory();
  const submitForm = () => {
    if(name && email && email.length > 5 && email.includes(".")){
    axios
      .post("/signUp", {
        name,
        email,
        password
      })
      .then((res) => {
        if(res.status == 206){
          
         return message.info('Email is already there')
        }
        setLogin(res.data._id);
      })
      .catch((err) => {
        message.info("Could Not Add You, Try Again")
      });
   
    }else {
      message.info("Email Is Not Right")
    }
  
  };
  if (login) {
    sessionStorage.setItem("login", JSON.stringify(login));
      history.push("/");
    window.location.reload();

  }
  return (
    <div className="outsideDiv">
    <Card hoverable className="loginFormDiv">
        <h2 className="headlineLoginForm">SIGN UP FORM</h2>

        <div className="loginFormInnerDiv">
          <i className="fa fa-user userIcon-LoginForm"></i>
          <label htmlFor="name">User name <b>*</b></label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputLogInForm"
          />
          <br />
          <label htmlFor="email">Email <b>*</b></label>
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputLogInForm"
          />
          <br />
          <label htmlFor="password">Password <b>*</b></label>
          <input
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputLogInForm"
          />
          <i
            className="eyeIconLogIn"
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {eye}
          </i>
          <button
            type="submit"
            onClick={submitForm}
            className="buttonLoginForm"
          >
            SIGN UP
          </button>
          <Link to="/logIn" style={{ textDecoration: "none", color: "black" }}>
            <button type="submit" className="createAccountbuttonLoginForm">
              Already have an account ? Log In.
            </button>
          </Link>
        </div>
       
</Card>
    </div>
  );
};

export default SignUp;

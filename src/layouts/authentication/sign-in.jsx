/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import Input from "../../UI/Input";
import { hasMinLength, isEmail, isNotEmpty } from "../../util/validation";
import { useInput } from "../../hooks/useInput";
import ribbon from "../../assets/images/ribbon.png";
import logo from "../../assets/logos/logo.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../util/AuthHttp";
import ErrorBlock from "UI/ErrorBlock";
import LoadingIndicator from "UI/loadingIndicator";
import { useAuth } from "../../context/AuthContext";


export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    hasError: emailHasError,
    reset: resetEmail
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    hasError: passwordHasError,
    reset: resetPassword
  } = useInput("", (value) => hasMinLength(value, 4));

  const [loginError, setLoginError] = useState(false);

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const { success, user } = data;
      if (success) {
        console.log(user);
        login(user);
        navigate("/authentication/create");
      } else {
        setLoginError(true);
        console.log("Login failed");
      }
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    mutate({ emailValue, passwordValue });
    console.log(loginError);
  };

  const resetLoginError = () => {
    setLoginError(false);
  };

  const handleReset = () => {
    resetEmail();
    resetPassword();
    setLoginError(false);
  };

  return (
    <>
      <img src={logo} alt="Your Image" className="logo2" />
      <form onSubmit={handleLogin}>
        <h2 className="login">Login</h2>
        <div className="control-row">
          <Input
            label="username"
            id="username"
            type="text"
            name="username"
            onBlur={handleEmailBlur}
            value={emailValue}
            onChange={(event) => {
              handleEmailChange(event);
              resetLoginError();
            }}
            error={emailHasError && "Please enter a valid email."}
          />
          <Input
            label="password"
            id="password"
            type="password"
            name="password"
            onBlur={handlePasswordBlur}
            value={passwordValue}
            onChange={(event) => {
              handlePasswordChange(event);
              resetLoginError();
            }}
            error={
              passwordHasError && "Password must be at least 5 characters long."
            }
          />
        </div>
        <p className="form-actions">
          <button type="button" className="button button-flat" onClick={handleReset}>
            Reset
          </button>
          <button className="button">Login</button>
        </p>
      </form>
      {loginError && !isPending && (
        <ErrorBlock
          title="Login Failed"
          message="Invalid email or password."
        />
      )}
      {isPending && <LoadingIndicator />}
      <img src={ribbon} alt="Your Image" className="ribbon" />
    </>
  );
}

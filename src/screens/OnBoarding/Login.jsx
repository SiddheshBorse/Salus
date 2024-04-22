import React, { useState } from 'react';
import LoginBanner from '../../assets/images/LoginBanner.png';
import { TextField, IconButton, InputAdornment, Button, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {
  const auth = getAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    loginId: '',
    password: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let hasErrors = false;

    if (!loginId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        loginId: 'Login ID is required',
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        loginId: '',
      }));
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      hasErrors = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }

    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Login ID:', loginId);
      console.log('Password:', password);
    }
    signInWithEmailAndPassword(auth, loginId, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("login successful for " +JSON.stringify(user.metadata));
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

  };

  return (
    <div className="flex items-center h-full gap-80">
      <img src={LoginBanner} alt="" className="w-5/12" />
      <section className="flex flex-col w-fit items-center h-full justify-between py-20">
        <h1 className="font-bold text-center text-4xl w-full">
          <span className="text-primary">Apollo</span> Hospital
        </h1>
        <section className="flex flex-col justify-center w-full gap-5">
          <TextField
            className=""
            label="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            error={!!errors.loginId}
            helperText={errors.loginId}
          />
          <TextField
            className=""
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            className="bg-primary text-white w-full py-2 font-bold rounded-lg"
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </button>
        </section>
        <a href="/" className="text-primary-dark font-bold">
          Create new system
        </a>
      </section>
    </div>
  );
};

export default Login;
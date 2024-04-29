import React, { useState } from 'react';
import LoginBanner from '../../assets/images/LoginBanner.png';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';

const Login = () => {
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    loginId: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const navigate = useNavigate();

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
      setIsLoading(true); // Set isLoading to true before making the API call

      signInWithEmailAndPassword(auth, loginId, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("login successful for " + JSON.stringify(user.metadata));
          navigate("/dashboard/home");
          setIsLoading(false); // Set isLoading back to false after successful login
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          // Set the error message and open the snackbar
          setErrorMessage(errorMessage);
          setSnackbarOpen(true);
          setIsLoading(false); // Set isLoading back to false if there's an error
        });
    }
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
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? 'Loading...' : 'Login'} {/* Change button text to "Loading..." when loading */}
          </button>
        </section>
        <a href="/landing" className="text-primary-dark font-bold">
          Create new system
        </a>
      </section>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
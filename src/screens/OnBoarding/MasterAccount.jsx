import React, { useState } from "react";
import { TextField } from "@mui/material";
import { db } from "../../../firebase/firebase";
import { doc, setDoc,addDoc,collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const MasterAccount = () => {
  const auth = getAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: null,
    email: null,
    confirmEmail: null,
    recoveryEmail: null,
    confirmRecoveryEmail: null,
    password: null,
    confirmPassword: null,
    name: null,
    mobileNumber: "",
    config: null,
    hospitalName: queryParams.get("hospitalName"),
  });

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    confirmEmail: null,
    recoveryEmail: null,
    confirmRecoveryEmail: null,
    password: null,
    confirmPassword: null,
    name: null,
    mobileNumber: "",
  });

  const [showErrors, setShowErrors] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
    setShowErrors(false);
  };

  const validateField = (field, value) => {
    let errorMessage = "";

    switch (field) {
      case "username":
        if (!value) errorMessage = "Username is required.";
        break;
      case "email":
        if (!value) errorMessage = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value))
          errorMessage = "Email is not valid.";
        break;
      case "confirmEmail":
        if (value !== formData.email)
          errorMessage = "Confirm Email does not match Email.";
        break;
      case "recoveryEmail":
        if (!value) errorMessage = "Recovery Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value))
          errorMessage = "Recovery Email is not valid.";
        break;
      case "confirmRecoveryEmail":
        if (value !== formData.recoveryEmail)
          errorMessage =
            "Confirm Recovery Email does not match Recovery Email.";
        break;
      case "password":
        if (!value) errorMessage = "Password is required.";
        else if (value.length < 8)
          errorMessage = "Password must be at least 8 characters long.";
        break;
      case "confirmPassword":
        if (value !== formData.password)
          errorMessage = "Confirm Password does not match Password.";
        break;
      case "name":
        if (!value) errorMessage = "Name is required.";
        break;
      case "mobileNumber":
        if (!value) errorMessage = "Mobile Number is required.";
        else if (!/^\d{10}$/.test(value))
          errorMessage = "Mobile Number is not valid.";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [field]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setShowErrors(true);
    setIsLoading(true);
  
    for (const field in formData) {
        validateField(field, formData[field]);
    }
  
    const hasErrors = Object.values(errors).some((error) => error !== "");
  
    if (!hasErrors) {
        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Create a new hospital document with an automatically generated UID
            const hospitalDocRef = doc(collection(db, "Hospitals")); // No UID provided

            // Set data for the hospital document
            await setDoc(hospitalDocRef, {
                name: formData.hospitalName,
                masterAccountUID: user.uid
            });

            // Update the master account document with hospital UID
            await setDoc(doc(db, "Master Accounts", user.uid), {
                ...formData,
                uid: user.uid,
                hospitalUID: hospitalDocRef.id // Use the automatically generated UID
            });

            navigate("/dashboard/home");
            setIsLoading(false);
            setShowErrors(false);
        } catch (error) {
          console.error("Error:", error);
          setIsLoading(false);
      
          // Handle sign-up errors
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
      
          // Set the error message and open the snackbar
          setErrorMessage(errorMessage);
          setSnackbarOpen(true);
      
          // Navigate to the landing page
          // navigate("/landing");
        }
    } else {
        console.log("Form has errors:", errors);
        setIsLoading(false);
    }
};


  return (
    <div className="flex flex-col items-center gap-20 py-10">
      <h1 className="font-bold text-center text-4xl w-full">
        Set up master account for{" "}
        <span className="text-primary">{formData.hospitalName}</span>
      </h1>

      <section className="flex flex-col items-center border-solid border-2 border-highlight px-20 py-5 gap-5 w-6/12 rounded-xl">
        <h3 className="font-semibold text-xl">Set login credentials</h3>

        <TextField
          className="w-full"
          name="username"
          label="Username *"
          value={formData.username}
          onChange={handleInputChange}
          error={showErrors && errors.username !== ""}
          helperText={showErrors ? errors.username : ""}
        />

        <TextField
          className="w-full"
          name="email"
          label="Email *"
          value={formData.email}
          onChange={handleInputChange}
          error={showErrors && errors.email !== ""}
          helperText={showErrors ? errors.email : ""}
        />

        <TextField
          className="w-full"
          name="confirmEmail"
          label="Confirm Email"
          value={formData.confirmEmail}
          onChange={handleInputChange}
          error={showErrors && errors.confirmEmail !== ""}
          helperText={showErrors ? errors.confirmEmail : ""}
        />

        <TextField
          className="w-full"
          name="recoveryEmail"
          label="Recovery Email"
          value={formData.recoveryEmail}
          onChange={handleInputChange}
          error={showErrors && errors.recoveryEmail !== ""}
          helperText={showErrors ? errors.recoveryEmail : ""}
        />

        <TextField
          className="w-full"
          name="confirmRecoveryEmail"
          label="Confirm Recovery Email"
          value={formData.confirmRecoveryEmail}
          onChange={handleInputChange}
          error={showErrors && errors.confirmRecoveryEmail !== ""}
          helperText={showErrors ? errors.confirmRecoveryEmail : ""}
        />

        <TextField
          className="w-full"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={showErrors && errors.password !== ""}
          helperText={showErrors ? errors.password : ""}
        />

        <TextField
          className="w-full"
          name="confirmPassword"
          label="Re-enter Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={showErrors && errors.confirmPassword !== ""}
          helperText={showErrors ? errors.confirmPassword : ""}
        />

        <TextField
          className="w-full"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange}
          error={showErrors && errors.name !== ""}
          helperText={showErrors ? errors.name : ""}
        />

        <TextField
          className="w-full"
          name="mobileNumber"
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          error={showErrors && errors.mobileNumber !== ""}
          helperText={showErrors ? errors.mobileNumber : ""}
        />

        <button
          className="bg-primary text-white py-2 font-semibold rounded-lg w-full"
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Confirm"}
        </button>

        <a href="/landing" className="text-primary font-semibold">
          Back
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

export default MasterAccount;

import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "./../components/auth/progressbar.js";

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  var domain = process.env.REACT_APP_API+"/api/" || "http://localhost:5000";

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let progress = (step / 3) * 100;
  if (step < 2) progress = 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateStep = () => {
    const errors = {};

    if (step === 1) {
      if (formData.fullName.trim().length < 1) {
        errors.fullName = true;
        alert("Full name is too short.");
      }
    }

    if (step === 2) {
      if (formData.username.trim().length < 5) {
        errors.username = true;
        alert("Username must be at least 5 characters.");
      }
      if (!formData.email.trim()) {
        errors.email = true;
        alert("Email is required.");
      }
    }

    if (step === 3) {
      if (formData.password.length < 5) {
        errors.password = true;
        alert("Password must be at least 5 characters.");
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = true;
        alert("Passwords do not match.");
      }
    }

    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      try {
        const response = await axios.post(`${domain}/create_account`, {
          name: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        console.log(response);

        if (response.data.error) {
          alert(`Error: ${response.data.error}`);
          setStep(1);
        } else {
          setIsComplete(true);
        }
      } catch (err) {
        alert("Something went wrong creating the account.");
        console.error(err);
        setStep(1);
      }
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="title">Choose a Name</h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`input-field ${inputErrors.fullName ? "error" : ""}`}
            />
            <button onClick={handleNext} className="btn">Next</button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="title">Choose a Username</h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`input-field ${inputErrors.username ? "error" : ""}`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`input-field ${inputErrors.email ? "error" : ""}`}
            />
            <button onClick={handleNext} className="btn">Next</button>
            <button onClick={handlePrev} className="btn back-btn">Back</button>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="title">Choose a Password</h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`input-field ${inputErrors.password ? "error" : ""}`}
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`input-field ${inputErrors.confirmPassword ? "error" : ""}`}
            />
            <button onClick={handleNext} className="btn">Submit</button>
            <button onClick={handlePrev} className="btn back-btn">Back</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page--login">
      <div className="modal-container">
        <div className="modal-content">
          <ProgressBar progress={progress} />
          {!isComplete ? (
            renderFormStep()
          ) : (
            <div className="complete-message">Account Created! 🎉</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

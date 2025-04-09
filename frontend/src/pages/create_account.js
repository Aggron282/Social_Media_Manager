import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ProgressBar from "./../components/auth/progressbar.js";
const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isComplete, setIsComplete] = useState(false);

  var progress = (step / 3) * 100 ;
  if(step < 2){
    progress = 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
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
            <h2 class="title"> Choose a Name  </h2>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="input-field"
            />
            <button onClick={handleNext} className="btn">Next</button>
          </>
        );
      case 2:
        return (
          <>
            <h2 class="title"> Choose a Username  </h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input-field"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
            />
            <button onClick={handleNext} className="btn">Next</button>
            <button onClick={handlePrev} className="btn back-btn">Back</button>
          </>
        );
      case 3:
        return (
          <>
            <h2 class="title"> Choose a Password  </h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="input-field"
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
    <div class="page--login">
    <div className="modal-container">
      <div className="modal-content">
        <ProgressBar progress = {progress} />
        {!isComplete ? (
          renderFormStep()
        ) : (
          <div className="complete-message">Process Complete! 🎉</div>
        )}
      </div>
    </div>
    </div>
  );

};

export default CreateAccount;

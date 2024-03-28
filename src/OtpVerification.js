import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(40); // Initial timer value in seconds
  const navigate=useNavigate();
  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement OTP verification logic
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    if (otp === generatedOTP.toString()) {
      // OTP verification successful
      // Proceed with further actions (e.g., navigate to another page)
      console.log('OTP verified successfully');
      // Redirect user to login page upon successful OTP verification
      // Replace '/login' with the actual path to your login page
      window.location.href = '/login';
    } else {
      // OTP verification failed
      // Prompt the user to enter the correct OTP 
      console.log('Incorrect OTP');
    }
  };

  const handleResendOTP = () => {
    // Generate a new random 6-digit OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000);
    // Log the new OTP to the console (for testing purposes)
    console.log('New OTP:', newOTP);

    // Update the UI or notify the user that the OTP has been resent
    alert('OTP has been resent to your mobile number');
  };

  // Countdown timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div>
      <h2>Enter OTP</h2>
      <p>A 6-digit OTP verification code has been sent to your mobile.</p>
      <p>Enter to verify details</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          maxLength={6}
          placeholder="Enter OTP"
        />
        <button type="submit" onClick={()=>{navigate('/Login')}}>Confirm</button>
      </form>
      <p>{timer} sec</p>
      {timer === 0 && (
        <button onClick={handleResendOTP}>Resend OTP</button>
      )}
    </div>
  );
};

export default OTPVerification;

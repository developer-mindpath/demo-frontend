import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @function Countdown card
 * @returns {JSX.Element}
 */
const CountdownCard = (): JSX.Element => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/signIn');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Signup Successful!</h2>
        <p className="text-lg">
          Redirecting to the login page in {countdown} seconds...
        </p>
      </div>
    </div>
  );
};

export default CountdownCard;

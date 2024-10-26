import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Authenticate = async () => {
  try {
    const response = await fetch('http://localhost:8080/auth/user', {
      method: 'GET',
      credentials: 'same-origin'
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Authentication successful:', data);
      return true;
    } else {
      console.error('Authentication failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Network error during authentication:', error);
    return false;
  }
};

const Protected = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('Token');
    if (tokenFromCookie) {
      Authenticate().then((authenticated) => {
        setIsLoggedIn(authenticated);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;

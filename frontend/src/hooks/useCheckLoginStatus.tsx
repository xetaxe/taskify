import { useState, useEffect } from 'react';

const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for the presence of the session cookie
    const cookieExists = document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith('session=');
    });

    setIsLoggedIn(cookieExists);
  }, []);

  return isLoggedIn;
};

export default useCheckLoginStatus;

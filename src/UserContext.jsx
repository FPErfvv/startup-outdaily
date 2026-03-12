// UserContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { getUserInfo } from './service';

const UserContext = createContext(null);

export function UserProvider({ children }) {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('unauthenticated');
  const [alertMessage, setAlertMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  React.useEffect(() => {
    const loadUser = async () => {
      const result = await getUserInfo();
      if (result.status === 200) {
        console.log(result.data.username, result.data.email, result.data.points, result.data.streak);
        setUsername(result.data.username);
        setEmail(result.data.email);
        setCurrentPage('authenticated');
        setPoints(result.data.points);
        setStreak(result.data.streak);
      } else {
        setCurrentPage('unauthenticated');
      }
    };
    loadUser();
  }, []);

  const value = {
    username,
    setUsername,
    email,
    setEmail,
    currentPage,
    setCurrentPage,
    alertMessage,
    setAlertMessage,
    points,
    setPoints,
    streak,
    setStreak,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
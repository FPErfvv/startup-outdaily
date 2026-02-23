// UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  

  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('unauthenticated');
  const [alertMessage, setAlertMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(user => user.loggedIn);
    if (loggedInUser) {
      setUserName(loggedInUser.username);
      setEmail(loggedInUser.email);
      setPassword(loggedInUser.password);
      setCurrentPage('authenticated');
      setPoints(loggedInUser.points);
      setStreak(loggedInUser.streak);
    }
  }, []);

  const value = {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
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
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Entry } from './entry/entry';
import { Leaderboard } from './leaderboard/leaderboard';
import { UserProvider, useUser } from './UserContext';


export default function App() {
    
  return (
    <UserProvider>
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    </UserProvider>
    );
}

function NotFound() {
    return <main className="container-fluid px-0 flex-grow-1 flex-shrink-1 text-center align-content-center">404: Return to sender. Address unknown.</main>;
}

function AppContent() {
    return (<div className="bg-success bg-opacity-10 d-flex flex-column min-vh-100">
        <header className="bg-success border-bottom border-1 border-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-left py-3 flex-shrink-0">   
                    <NavLink to="" className="d-flex align-items-center text-white text-decoration-none me-3">
                        <img src="images/nature.png" alt="Outdaily Logo" height="60" className="me-2" />
                        <h1 className="mb-0" id="logo">Outdaily</h1>
                    </NavLink>
                    
                    <ul className="nav mb-0 justify-content-left px-3 flex-shrink-0">
                        <li className="nav-item">
                            {useUser().currentPage === "authenticated" && (<NavLink to="" className="nav-link px-3 mt-2">Home</NavLink>)}
                        </li>
                        <li className="nav-item">
                            {useUser().currentPage === "authenticated" && (<NavLink to="entry" className="nav-link px-3 mt-2">Entry Page</NavLink>)}
                        </li>
                        <li className="nav-item">
                            {useUser().currentPage === "authenticated" && (
                                <NavLink to="leaderboard" className="nav-link px-3 mt-2">
                                    Leaderboard
                                </NavLink>)}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/entry' element={<Entry />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
        <footer className="bg-dark">
            <div className="container d-flex py-2">
                <div className="text-light align-self-start flex-grow-0">Author: Fred Probst</div>
                <div className="flex-grow-1"></div>
                <div className="text-light align-self-end flex-grow-0">
                    <a href="https://github.com/FPErfvv/startup-outdaily">
                        <img src="images/githubemoji.png" alt="GitHub Logo" height="20" className="me-1" />GitHub</a>
                </div>
            </div>
        </footer> 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>);
}
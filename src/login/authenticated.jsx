import React from 'react';
import { useUser } from '../UserContext';
export function Authenticated() {
    const { currentPage, setCurrentPage, userName } = useUser();

    function handleLogout(event) {
        event.preventDefault();
        setCurrentPage('unauthenticated');
    }
  return (
        
                <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
                    <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
                    <p className="text-center py-5">Welcome back, {userName}!</p>
                        <div className="d-flex justify-content-center py-5">
                            <button type="submit" className="btn btn-success px-5" onClick={handleLogout}>Logout</button>
                        </div>
                    <div className="dropdown-divider border"></div>
                    <div className="text-center my-1">
                        <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('register')}>Sign up</a>
                        <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('forgotPassword')}>Forgot password?</a>
                    </div>

                </div>
                
  );
}
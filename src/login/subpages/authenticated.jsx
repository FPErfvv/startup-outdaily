import React from 'react';
import { useUser } from '../../UserContext';
import { updateDBonLogout } from '../../service';
export function Authenticated() {
    const { setCurrentPage, userName } = useUser();

    function handleLogout(event) {
        event.preventDefault();
        updateDBonLogout(userName);
        setCurrentPage('unauthenticated');
    }
  return (
        
                <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
                    <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
                    <p className="text-center py-5">Welcome back, {userName}!</p>
                        <div className="d-flex justify-content-center py-5">
                            <button type="submit" className="btn btn-success px-5" onClick={handleLogout}>Logout</button>
                        </div>

                </div>
                
  );
}
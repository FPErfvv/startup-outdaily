import React from 'react';

export function Authenticated(props) {
    function handlePageChange(page) {
        props.onPageChange(page);
    }
    function handleLogout(event) {
        event.preventDefault();
        props.onPageChange('unauthenticated');
    }
  return (
        
                <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
                    <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
                    <p className="text-center py-5">Welcome back, {props.username}!</p>
                        <div className="d-flex justify-content-center py-5">
                            <button type="submit" className="btn btn-success px-5" onClick={handleLogout}>Logout</button>
                        </div>
                        
                    
                    <div className="dropdown-divider border"></div>
                    <div className="text-center my-1">
                        <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => handlePageChange('register')}>Sign up</a>
                        <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => handlePageChange('forgotPassword')}>Forgot password?</a>
                    </div>

                </div>
                
  );
}
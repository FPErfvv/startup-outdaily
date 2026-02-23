import React from 'react';
import { useUser } from '../../UserContext';
export function ForgotPassword() {
    const { setEmail, setCurrentPage } = useUser();
    return (
        <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
            <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
            <form className="px-4 py-3">
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" onChange={(e)=>(setEmail(e.target.value))} />
                </div>
                <div className="mb-3"></div>
                <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success px-5">Send Reset Link</button>
                </div>
                
            </form>
            <div className="dropdown-divider border"></div>
            <div className="text-center my-1">
                <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('unauthenticated')}>Back to Login</a>
            </div>

        </div>
  );
}
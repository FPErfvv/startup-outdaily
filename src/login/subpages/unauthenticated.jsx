import React from 'react';
import { handleLogin } from '../../service';
import { getUsername } from '../../service';
import { Alert } from '../../alert';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated() {
    const { email, setEmail } = useUser();
    const { password, setPassword } = useUser();
    const { currentPage, setCurrentPage } = useUser();
    const { userName, setUserName } = useUser();
    const alert = <Alert/>;
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        const result = handleLogin(email, password);
        if (result.success) {
            
            setUserName(getUsername(email));
            setCurrentPage('authenticated');
            navigate('/entry');
        } else {
            console.log(result.message);
            //alert.setAlertMessage(result.message);
        }
    }
    return (
        <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
            <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
            <form className="px-4 py-3">
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" onChange={(e)=>(setEmail(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" onChange={(e)=>(setPassword(e.target.value))} />
                </div>
                <div className="mb-3">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                    <label className="form-check-label" htmlFor="dropdownCheck">
                    Remember me
                    </label>
                </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success px-5" onClick={handleSubmit}>Sign in</button>
                </div>
                
            </form>
            <div className="dropdown-divider border"></div>
            <div className="text-center my-1">
                <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('register')}>Sign up</a>
                <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('forgotPassword')}>Forgot password?</a>
            </div>
        </div>
  );
}
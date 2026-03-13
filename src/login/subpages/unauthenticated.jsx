import React from 'react';
import { getUsername } from '../../service';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated() {
    const { setEmail, setCurrentPage, setUsername, setAlertMessage, email } = useUser();
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    
    async function handleLogin(event) {
        event.preventDefault();
        const res = await fetch('/api/auth', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            setUsername(data.username);
            setEmail(data.email);
            setCurrentPage('authenticated');
            navigate('/entry');
        } else {
            setAlertMessage(data.msg);
        }
      }
    return (
        <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
            <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
            <form className="px-4 py-3" onSubmit={(event) => handleLogin(event)}>
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
                    <button type="submit" className="btn btn-success px-5">Sign in</button>
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
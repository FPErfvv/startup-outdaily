import React from 'react';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
export function Register() {
    const { setUsername, setEmail, setCurrentPage, setAlertMessage, email, username } = useUser();
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify({ email, password, username }));
        const res = await fetch('/api/auth', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, username }),
        });
        
        await res.json();
        console.log(res.status);
        if (res.ok) {
            console.log("EVERYTHING IS OKAY");
            setUsername(username);
            setEmail(email);
            setCurrentPage('authenticated');
            navigate('/entry');
        } else {
          setAlertMessage('Authentication failed');
        }
      }

    return (
        <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
            <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
            <form className="px-4 py-3" onSubmit={(event) => handleSubmit(event)}>
            <div className="mb-3">
                    <label htmlFor="exampleDropdownFormUsername1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleDropdownFormUsername1" placeholder="Username" onChange={(e)=>(setUsername(e.target.value))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="Email address" onChange={(e)=>(setEmail(e.target.value))} />
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
                    <button type="submit" className="btn btn-success px-5">Sign up</button>
                </div>
                
            </form>
            <div className="dropdown-divider border"></div>
            <div className="text-center my-1">
                <a className="dropdown-item m-1 text-decoration-underline d-inline" onClick={() => setCurrentPage('unauthenticated')}>Log In</a>
            </div>
    
        </div>
      );
}
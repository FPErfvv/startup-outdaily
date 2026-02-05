import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
        <div className="app bg-success bg-opacity-10 d-flex flex-column min-vh-100">
            <header className="bg-success border-bottom border-1 border-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-left py-3 flex-shrink-0">   
                        <a href="index.html" className="d-flex align-items-center text-white text-decoration-none me-3">
                            <img src="images/nature.png" alt="Outdaily Logo" height="60" className="me-2" />
                            <h1 className="mb-0" id="logo">Outdaily</h1>
                        </a>
                        
                        <ul className="nav mb-0 justify-content-left px-3 flex-shrink-0">
                            <li className="nav-item"><a href="index.html" className="nav-link px-3 mt-2 active">Home</a></li>
                            <li className="nav-item"><a href="entry.html" className="nav-link px-3 mt-2">Entry Page</a></li>
                            <li className="nav-item"><a href="leaderboard.html" className="nav-link px-3 mt-2">Leaderboard</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <main className="container-fluid px-0 flex-grow-1 flex-shrink-1">
                <div className="d-flex flex-column flex-md-row align-items-stretch">
                    <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
                        <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
                        <form className="px-4 py-3" action="entry.html">
                            <div className="mb-3">
                            <label for="exampleDropdownFormEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                            </div>
                            <div className="mb-3">
                            <label for="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                            </div>
                            <div className="mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                                <label className="form-check-label" for="dropdownCheck">
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
                            <a className="dropdown-item m-1 text-decoration-underline d-inline" href="#">Sign up</a>
                            <a className="dropdown-item m-1 text-decoration-underline d-inline" href="#">Forgot password?</a>
                        </div>

                    </div>
                    <div className="flex-fill flex-column">
                        <img src="images/beautiful-fall-nature-scenery.webp" alt="A beautiful fall nature scene" className="img-fluid w-100 pb-3"/>
                    </div>
                </div>
                <section className="m-3 p-3 border">
                    <h3 className="text-center">
                        About Outdaily
                    </h3>
                    <p>
                        Have you ever felt the call of the wild? Have you ever felt like something was missing within yourself? We all have! Due to our fast paced and work oriented society, we often miss out on opportunities to stop and literally smell the roses. This application, OutDaily, encourages users to spend more time outside and enjoy the wondrous world in which we live. Its simple design allows the user to track time spent outside and even compete with others to see who can spend the most consecutive days enjoying the beauties of mother nature. Spending more time outside can literally change your life, as mentioned in <a href="https://hsph.harvard.edu/news/time-spent-in-nature-can-boost-physical-and-mental-well-being/">this article</a>.
                    </p>
                </section>
            </main>
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
import React from 'react';

export function Login() {
  return (
        <main className="container-fluid px-0 flex-grow-1 flex-shrink-1">
            <div className="d-flex flex-column flex-md-row align-items-stretch">
                <div className="bd-example border border-3 rounded-top-5 flex-fill flex-column m-3 col-md-10 shadow">
                    <h3 className="py-4 text-center bg-success bg-opacity-50 rounded-top-5 border border-3">Start tracking every experience with nature.</h3>
                    <form className="px-4 py-3" action="entry.html">
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
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
  );
}
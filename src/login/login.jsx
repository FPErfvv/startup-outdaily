import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { ForgotPassword } from './forgotPassword';
import { Register } from './register';
import { useUser } from '../UserContext';

export function Login() {
    const { currentPage, setCurrentPage } = useUser();
  return (
        <main className="container-fluid px-0 flex-grow-1 flex-shrink-1">
            <div className="d-flex flex-column flex-md-row align-items-stretch">
                {currentPage === 'unauthenticated' && <Unauthenticated />}
                {currentPage === 'register' && <Register />}
                {currentPage === 'forgotPassword' && <ForgotPassword />}
                {currentPage === 'authenticated' && <Authenticated />}
                <div className="flex-fill flex-column">
                    <img src="images/beautiful-fall-nature-scenery.webp" alt="A beautiful fall nature scene" className="img-fluid w-70 pb-3"/>
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
import React, { useState } from 'react';

function AuthByStates(props) {
    const [formType, setFormType] = useState('login');
    const [passForgot, setPassForgot] = useState(false);
    return (
        <main>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title justify-content-center row">
                        <div className='col-md-8'>
                            <h2>
                                {
                                    passForgot ? 'Forgot your password?'
                                        : formType === 'login' ? 'Login' : 'Sign Up'
                                }
                            </h2>
                        </div>
                        <div className='col-md-10'>
                            <p>
                                {
                                    passForgot ?
                                        <>You can reset your password here. <br /> Please enter the email address you'd like your password reset information sent to</>
                                        : 'Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.'
                                }
                            </p>
                        </div>
                    </div>
                    <form action="true" method="post" className="php-email-form">
                        <div className="row justify-content-center g-3">
                            {
                                formType === 'signup' ?
                                    <div className="col-md-7">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <div className="validate" />
                                    </div>
                                    : null
                            }
                            <div className="col-md-7">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email Address" data-rule="email" data-msg="Please enter a valid email" />
                                <div className="validate" />
                            </div>
                            {
                                passForgot ? null
                                    : <div className="col-md-7">
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" data-rule="password" data-msg="Please enter a valid password" />
                                        <div className="validate" />
                                    </div>
                            }
                        </div>
                        <div className="row text-center justify-content-center mt-2 g-3">
                            <div className='col-md-7 mt-0 text-end'>
                                {
                                    formType === 'login' && passForgot === false ?
                                        <a href='#' onClick={() => setPassForgot(true)}>Forgot Password?</a>
                                        : null
                                }
                            </div>
                            <div className="col-md-7 my-4">
                                {
                                    passForgot ? <button type="submit">Request reset link</button>
                                        : formType === 'login' ?
                                            <button type="submit">Login</button>
                                            : <button type="submit">Sign Up</button>
                                }
                            </div>
                            <div className="col-md-7">
                                <p>
                                    {
                                        passForgot ?
                                            <span>Back to<a href='#' onClick={() => { setFormType('login'); setPassForgot(false) }}> Login? </a></span>
                                            : formType === 'login' ?
                                                <span>Create an Account? <a href='#' onClick={() => setFormType('signup')}> Sign Up </a></span>
                                                :
                                                <span>Already have an account? <a href='#' onClick={() => setFormType('login')}> Login </a></span>
                                    }
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section >
        </main >

    );
}

export default AuthByStates;
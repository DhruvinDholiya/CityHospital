import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function Auth() {
    const [formType, setFormType] = useState('login');

    let validSchema = {};
    let initalVal = {};

    if (formType === 'login') {
        validSchema = {
            email: Yup
                .string()
                .email()
                .required(),
            password: Yup
                .string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must password have, Numbers , alphabets, and Special Character")
                .required(),
        };
        initalVal = {
            email: '',
            password: ''
        }
    } else if (formType === 'signup') {
        validSchema = {
            name: Yup
                .string()
                .min(2)
                .matches(/^[A-Za-z ]+$/, "Name must only contain characters.")
                .required(),
            email: Yup
                .string()
                .email()
                .required(),
            password: Yup
                .string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must password have, Numbers , alphabets, and Special Character")
                .required(),
        }
        initalVal = {
            name: '',
            email: '',
            password: ''
        }
    } else if (formType === 'forgot') {
        validSchema = {
            email: Yup
                .string()
                .email()
                .required(),
        }
        initalVal = {
            email: ''
        }
    }

    let authSchema = Yup.object(validSchema)
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: authSchema,
        initialValues: initalVal,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();

        }

    })
    return (
        <main>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title justify-content-center row">
                        <div className='col-md-8'>
                            <h2>
                                {
                                    formType === 'forgot' ? 'Forgot your password?'
                                        : formType === 'login' ? 'Login' : 'Sign Up'
                                }
                            </h2>
                        </div>
                        <div className='col-md-10'>
                            <p>
                                {
                                    formType === 'forgot' ?
                                        <>You can reset your password here. <br /> Please enter the email address you'd like your password reset information sent to</>
                                        : 'Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.'
                                }
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="php-email-form">
                        <div className="row justify-content-center g-4">
                            {
                                formType === 'signup' ?
                                    <div className="col-md-7">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.name && touched.name ? <div className="validate">{errors.name}</div> : null}
                                    </div>
                                    : null
                            }
                            <div className="col-md-7">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email Address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {errors.email && touched.email ? <div className="validate">{errors.email}</div> : null}
                            </div>
                            {
                                formType === 'forgot' ? null
                                    : <div className="col-md-7">
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.password && touched.password ? <div className="validate">{errors.password}</div> : null}
                                    </div>
                            }
                        </div>
                        <div className="row text-center justify-content-center mt-2 g-3">
                            <div className='col-md-7 mt-0 text-end'>
                                {
                                    formType === 'login' ?
                                        <a href='#' onClick={() => setFormType('forgot')}>Forgot Password?</a>
                                        : null
                                }
                            </div>
                            <div className="col-md-7 my-4">
                                {
                                    formType === "login" ?
                                        <button type="submit">Login</button>
                                        : formType === "signup" ?
                                            <button type="submit">Sign Up</button>
                                            : <button type="submit">Request reset link</button>
                                }
                            </div>
                            <div className="col-md-7">
                                <p>
                                    {
                                        formType === 'forgot' ?
                                            <span>Back to<a href='#' onClick={() => setFormType('login')}> Login? </a></span>
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

export default Auth;
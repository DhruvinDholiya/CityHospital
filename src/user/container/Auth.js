import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import TitleBox from '../UI/titlePart/TitleBox';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Auth() {
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();

    const handleSignUp = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                onAuthStateChanged(auth, (user) => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert('Email varification sent')
                            setFormType('login')
                        })
                        .catch((error) => {
                            console.log(error.code, error.message)
                        });

                });
                console.log(user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
            });
    }

    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    alert('Login Completed');
                    navigate('/');
                } else {
                    alert('You can not able to login without verify to email address.')
                }
            })
            .catch((error) => {
                console.log(error.code, error.message)
            });
    }

    const handleForgot = (values) => {
        sendPasswordResetEmail(auth,  values.email)
            .then(() => {
                console.log('Password reset email sent!')
            })
            .catch((error) => {
                console.log(error.code, error.message)
            });

    }



    let validSchema = {};
    let initialVal = {};
    if (formType === 'login') {
        validSchema = {
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { email: '', password: '' };
    } else if (formType === 'signup') {
        validSchema = {
            name: Yup.string().min(2).required().matches(/^[A-Za-z ]+$/, 'Name must only contain characters.'),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Must password have, Numbers , alphabets, and Special Character'
                )
        };
        initialVal = { name: '', email: '', password: '' };
    } else if (formType === 'forgot') {
        validSchema = {
            email: Yup.string().email().required()
        };
        initialVal = { email: '' };
    }

    let authSchema = Yup.object(validSchema);
    const { errors, values, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        validationSchema: authSchema,
        initialValues: initialVal,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            if (formType === 'login') {
                handleLogin(values);
            } else if (formType === 'signup') {
                handleSignUp(values);
            } else if (formType === 'forgot') {
                handleForgot(values);
            }
            action.resetForm();
        }
    });

    return (
        <main>
            <section id="appointment" className="appointment">
                <div className="container">
                    <TitleBox
                        titleText={formType === 'forgot' ? 'Forgot your password?' : formType === 'login' ? 'Login' : 'Sign Up'}
                        subTitleText={[
                            formType === 'forgot' ? (
                                <>You can reset your password here. <br /> Please enter the email address you'd like your password reset information sent to</>
                            )
                                : ('Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.')
                        ]}
                    />
                    <form onSubmit={handleSubmit} className="php-email-form">
                        <div className="row justify-content-center g-4">
                            {formType === 'signup' ? (
                                <div className="col-md-7">
                                    <Input type="text" name="name" id="name" placeholder="Your Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorText={errors.name && touched.name ? errors.name : null}
                                    />
                                </div>
                            ) : null}
                            <div className="col-md-7">
                                <Input type="email" name="email" id="email" placeholder="Email Address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete="username"
                                    errorText={errors.email && touched.email ? errors.email : null}
                                />
                            </div>
                            {formType === 'forgot' ? null : (
                                <div className="col-md-7">
                                    <Input type="password" name="password" id="password" placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="current-password"
                                        errorText={errors.password && touched.password ? errors.password : null}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="row text-center justify-content-center mt-2 g-3">
                            <div className="col-md-7 mt-0 text-end">
                                {formType === 'login' ? (<a href="#" onClick={() => setFormType('forgot')}> Forgot Password? </a>) : null}
                            </div>
                            <div className="col-md-7 my-4">
                                {
                                    formType === 'login' ?
                                        <Button type='submit'>Login</Button>
                                        : formType === 'signup' ?
                                            <Button type='submit'>Sign Up</Button>
                                            : <Button type='submit'>Request reset link</Button>
                                }
                            </div>
                            <div className="col-md-7">
                                <p>
                                    {
                                        formType === 'forgot' ?
                                            (<span> Back to<a href="#" onClick={() => setFormType('login')}> Login</a> </span>)
                                            : formType === 'signup' ?
                                                (<span> Have you already an account?<a href="#" onClick={() => setFormType('login')}> Login</a></span>)
                                                :
                                                (<span> Don't have an account?<a href="#" onClick={() => setFormType('signup')}> Sign Up</a></span>)
                                    }
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Auth;

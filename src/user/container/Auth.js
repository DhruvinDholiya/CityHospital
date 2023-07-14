import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import TitleBox from '../UI/titlePart/TitleBox';


function Auth() {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('login');

    const handleData = (values) => {
        if (formType === 'login') {
            const l_signUpData = JSON.parse(localStorage.getItem('_userSignUpData'));

            if (values.email === 'admin@gmail.com' && values.password === 'Admin@123') {
                localStorage.setItem('_loginStatus', JSON.stringify('AdminActive'));
                navigate('/admin/dashboard');
            } else if (l_signUpData !== null) {
                let f_signUpData = l_signUpData.filter((data) => values.email === data.email && values.password === data.password);
                if (f_signUpData.length === 1) {
                    localStorage.setItem('_loginStatus', JSON.stringify('UserActive'));
                    navigate('/');
                } else {
                    alert("Your entered Email or password doesn't match with registered data. Or if you have not account, Please first create account.");
                }
            } else {
                alert("Your entered Email or password doesn't match with registered data. Or if you have not account, Please first create account.");
            }
        } else if (formType === 'signup') {
            let l_signUpData = JSON.parse(localStorage.getItem('_userSignUpData'));
            if (!l_signUpData) {
                l_signUpData = [];
            }
            l_signUpData.push(values);
            localStorage.setItem('_userSignUpData', JSON.stringify(l_signUpData));
            setFormType('login');
        }
    };

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
            handleData(values);
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
                                    errorText={errors.email && touched.email ? errors.email : null}
                                />
                            </div>
                            {formType === 'forgot' ? null : (
                                <div className="col-md-7">
                                    <Input type="password" name="password" id="password" placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                        <Button>Login</Button>
                                        : formType === 'signup' ?
                                            <Button>Sign Up</Button>
                                            : <Button>Request reset link</Button>
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

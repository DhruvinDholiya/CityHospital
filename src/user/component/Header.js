import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../UI/button/Button';
import CustomLink from '../UI/link/Link';

function Header() {
    const checklogin = JSON.parse(localStorage.getItem('_loginStatus'));
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('_loginStatus');
        navigate('/auth');
    };

    return (
        <div className="main-header">
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> +91 9988776655
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="/" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="/" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="/" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="/" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><CustomLink to="/" as={Link}>Home</CustomLink></li>
                            <li><CustomLink to="/departments" as={Link}>Departments</CustomLink></li>
                            <li><CustomLink to="/doctors" as={Link}>Doctors</CustomLink></li>
                            <li><CustomLink to="/medicines" as={Link}>Medicines</CustomLink></li>
                            <li><CustomLink to="/about" as={Link}>About</CustomLink></li>
                            <li><CustomLink to="/contact" as={Link}>Contact</CustomLink></li>
                            <li><CustomLink to="/counter" as={Link}>Counter</CustomLink></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <Button path="/appointment" btnType={Link} classes={'ms-3'} >Make an Appointment</Button>

                    {checklogin ?
                        location.path === '/auth' ? null :
                            <Button udf={handleLogout} classes={'ms-3'}>Logout</Button> :
                        <Button path="/auth" btnType={Link} classes={'ms-3'}>Login/ Signup</Button>}
                </div>
            </header>
        </div>
    );
}

export default Header;
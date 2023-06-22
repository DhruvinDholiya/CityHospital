import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    }
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
                        <Link to="/" className={`${isActive('/')}`}>
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><Link to="/" className={`nav-link scrollto ${isActive('/')}`}>Home</Link></li>
                            <li><Link to="/departments" className={`nav-link scrollto ${isActive('/departments')}`}>Departments</Link></li>
                            <li><Link to="/doctors" className={`nav-link scrollto ${isActive('doctors')}`}>Doctors</Link></li>
                            <li><Link to="/about" className={`nav-link scrollto ${isActive('/about')}`}>About</Link></li>
                            <li><Link to="/contact" className={`nav-link scrollto ${isActive('/contact')}`}>Contact</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <Link to="/appointment" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an </span>
                        Appointment</Link>
                    {(location.pathname === '/' || location.pathname === '/auth') && (
                        <Link to="/auth" className="appointment-btn scrollto">
                            <span className="d-none d-md-inline">Login/ Signup</span>
                        </Link>
                    )}
                    {/* ======================= */}
                </div>
            </header>
        </div>
    );
}

export default Header;
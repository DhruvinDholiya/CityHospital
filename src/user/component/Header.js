import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/button/Button';
import CustomLink from '../UI/link/Link';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeIcon from '@mui/icons-material/InvertColors';
import ThemeContext from '../context/ThemeContext';
import { logoutRequest } from '../redux/action/Auth.action';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography, DialogActions } from '@mui/material';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
    const [HeaderScrolled, setHeaderScrolled] = React.useState(false);
    const [mobileNav, setMobileNav] = React.useState(false);

    const theme = useContext(ThemeContext);
    const checklogin = useSelector((state) => state.auth.user);

    const handleScroll = () => {
        setHeaderScrolled(window.scrollY > 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openLogoutAlert = () => {
        setOpenLogoutModal(true);
    };

    const closeLogoutAlert = () => {
        setOpenLogoutModal(false);
    };

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate('/auth');
    };

    const handleMobileNav = () => {
        if (window.innerWidth < 1200) {
            setMobileNav(!mobileNav);
        }
    };

    const cartState = useSelector(state => state.cart);
    let addedCartData = 0;
    if (cartState.items) {
        addedCartData = cartState.items.reduce((acc, val) => acc + val.quantity, 0);
    }

    const favouriteState = useSelector(state => state.favourites);

    return (
        <div className="main-header">
            <div id="topbar" className={`d-flex align-items-center fixed-top ${HeaderScrolled ? 'topbar-scrolled' : ''}`}>
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> <a href="tel:+91 9988776655">+91 9988776655</a>
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="/" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="/" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="/" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="/" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className={`fixed-top ${HeaderScrolled ? 'header-scrolled' : ''}`}>
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className={`d-flex flex-nowrap navbar ${mobileNav ? 'navbar-mobile' : ''}`}>
                        <ul>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/" as={Link}>Home</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/departments" as={Link}>Departments</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/doctors" as={Link}>Doctors</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/medicines" as={Link}>Medicines</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/about" as={Link}>About</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/contact" as={Link}>Contact</CustomLink></li>
                            <li><Button onClick={() => handleMobileNav(!mobileNav)} path="/appointment" btnType={Link}>Make an Appointment</Button></li>
                            <li>
                                {checklogin ?
                                    <>
                                        <Button onClick={openLogoutAlert}>Logout</Button>
                                        <Dialog
                                            open={openLogoutModal}
                                            onClose={() => closeLogoutAlert()}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description">
                                            <DialogTitle className="text-center p-md-5 p-4 pb-3" id="alert-dialog-title">
                                                <Typography variant="h4" sx={{ fontWeight: '700' }}>Are you sure?</Typography></DialogTitle>
                                            <DialogContent className="px-md-5 px-4">
                                                <DialogContentText id="alert-dialog-description" className='text-center'>Hello, are you sure you want to logout your account? Remember that once your account is logged out you will not be able to access some pages.</DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="justify-content-center p-md-5 p-4 pt-2">
                                                <Button onClick={() => closeLogoutAlert()}>Close</Button>
                                                <Button onClick={() => { handleLogout(); handleMobileNav(!mobileNav) }} classes={'ms-4'}>Logout</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </> :
                                    <Button path="/auth" onClick={() => handleMobileNav(!mobileNav)} btnType={Link} classes={'ms-xl-3'}>Login / Signup</Button>
                                }
                            </li>
                        </ul>

                    </nav>
                    <div className='d-flex'>
                        <Button onClick={() => theme.toggleTheme(theme.theme)} classes='ms-4 bg-transparent p-0' aria-label="theme">
                            <ThemeIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                        </Button>
                        <Link to='/favourite'>
                            <Badge className='ms-3' badgeContent={favouriteState.favItmes.length} color="success">
                                <FavoriteIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                            </Badge>
                        </Link>
                        <Link to='/cart'>
                            <Badge className='ms-3' badgeContent={addedCartData} color="success">
                                <CartIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                            </Badge>
                        </Link>
                    </div>
                    <i onClick={() => handleMobileNav(!mobileNav)} className="bi bi-list mobile-nav-toggle ms-4" />
                </div>
            </header>
        </div>
    );
}

export default Header;
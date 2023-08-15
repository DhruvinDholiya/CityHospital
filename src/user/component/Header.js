import React, { useContext } from 'react';
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

    const theme = useContext(ThemeContext);
    const checklogin = useSelector((state) => state.auth.user);

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

    const cartState = useSelector(state => state.cart);
    let addedCartData = 0;
    if (cartState.items) {
        addedCartData = cartState.items.reduce((acc, val) => acc + val.quantity, 0);
    }

    const favouriteState = useSelector(state => state.favourites);

    return (
        <div className="main-header">
            <div id="topbar" className="d-flex align-items-center fixed-top">
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
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <Button path="/appointment" btnType={Link} classes={'ms-3'} >Make an Appointment</Button>

                    {checklogin ?
                        <>
                            <Button onClick={openLogoutAlert} classes={'ms-3'}>Logout</Button>
                            <Dialog
                                open={openLogoutModal}
                                onClose={closeLogoutAlert}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle className="text-center p-5 pb-3" id="alert-dialog-title">
                                    <Typography variant="h4" sx={{ fontWeight: '700' }}>Are you sure?</Typography></DialogTitle>
                                <DialogContent className="px-5">
                                    <DialogContentText id="alert-dialog-description">Do you know that you are doing logout to your account.</DialogContentText>
                                </DialogContent>
                                <DialogActions className="justify-content-center p-5 pt-3">
                                    <Button onClick={closeLogoutAlert}>Close</Button>
                                    <Button onClick={handleLogout} classes={'ms-4'}>Logout</Button>
                                </DialogActions>
                            </Dialog>
                        </> :
                        <Button path="/auth" btnType={Link} classes={'ms-3'}>Login / Signup</Button>
                    }
                    <Link to='/cart'>
                        <Badge className='ms-3' badgeContent={addedCartData} color="success">
                            <CartIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                        </Badge>
                    </Link>
                    <Link to='/favourite'>
                        <Badge className='ms-4' badgeContent={favouriteState.favItmes.length} color="success">
                            <FavoriteIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                        </Badge>
                    </Link>
                    <Button onClick={() => theme.toggleTheme(theme.theme)} classes='ms-4 bg-transparent p-0' aria-label="theme">
                        <ThemeIcon sx={{ color: '#2c4964', fontSize: '20px' }} />
                    </Button>
                </div>
            </header>
        </div>
    );
}

export default Header;
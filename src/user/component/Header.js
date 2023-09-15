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
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { Logout, Settings } from '@mui/icons-material';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
    const [HeaderScrolled, setHeaderScrolled] = React.useState(false);
    const [mobileNav, setMobileNav] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const theme = useContext(ThemeContext);
    const checklogin = useSelector((state) => state.auth.user);

    const open = Boolean(anchorEl);
    const profileOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const profileClose = () => {
        setAnchorEl(null);
    };

    const handleScroll = () => {
        setHeaderScrolled(window.scrollY > 50);
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
                        <a path='/' className="twitter"><i className="bi bi-twitter" /></a>
                        <a path='/' className="facebook"><i className="bi bi-facebook" /></a>
                        <a path='/' className="instagram"><i className="bi bi-instagram" /></a>
                        <a path='/' className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className={`fixed-top ${HeaderScrolled ? 'header-scrolled' : ''}`}>
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <Link to='/'>
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className={`d-flex flex-nowrap navbar ${mobileNav ? 'navbar-mobile' : ''}`}>
                        <ul>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to='/' as={Link}>Home</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/departments" as={Link}>Departments</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/doctors" as={Link}>Doctors</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/medicines" as={Link}>Medicines</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/about" as={Link}>About</CustomLink></li>
                            <li><CustomLink onClick={() => handleMobileNav(!mobileNav)} to="/contact" as={Link}>Contact</CustomLink></li>
                            <li><Button onClick={() => handleMobileNav(!mobileNav)} path="/appointment" btnType={Link}>Make an Appointment</Button></li>
                        </ul>
                        {
                            mobileNav ? <CloseIcon onClick={() => handleMobileNav(!mobileNav)} className='mobile_nav_modal_close position-fixed' /> : null
                        }
                    </nav>
                    <div className='d-flex align-items-center'>
                        {checklogin ?
                            <>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    <IconButton
                                        onClick={profileOpen}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/cityhospital-5b223.appspot.com/o/other%2Fdhruvin.jpg?alt=media&token=54aee65d-7726-4949-86ea-470f001484b7' /></Avatar>
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={profileClose}
                                    onClick={profileClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                                    <MenuItem onClick={profileClose}>
                                        <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/cityhospital-5b223.appspot.com/o/other%2Fdhruvin.jpg?alt=media&token=54aee65d-7726-4949-86ea-470f001484b7' /></Avatar>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={profileClose}>
                                        <Avatar sx={{ width: 35, height: 35 }}><img className='w-100' src='https://firebasestorage.googleapis.com/v0/b/cityhospital-5b223.appspot.com/o/other%2Fdhruvin.jpg?alt=media&token=54aee65d-7726-4949-86ea-470f001484b7' /></Avatar>
                                        My Account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={profileClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={() => { profileClose(); openLogoutAlert() }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                            :
                            <Button path="/auth" btnType={Link} classes={'ms-xl-3'}>Login / Signup</Button>
                        }
                    </div>
                    <i onClick={() => handleMobileNav(!mobileNav)} className="bi bi-list mobile-nav-toggle ms-4" />
                </div>
            </header>
            <Dialog
                open={openLogoutModal}
                onClose={() => closeLogoutAlert()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle variant='h4' className="text-center pt-5 px-5 pb-2" id="alert-dialog-title" sx={{ fontWeight: '700' }}>Are you sure?</DialogTitle>
                <DialogContent className="pt-0 px-5 pb-5">
                    <DialogContentText id="alert-dialog-description" className='text-center'>Hello, are you sure you want to logout your account? Remember that once your account is logged out you will not be able to access some pages.</DialogContentText>
                </DialogContent>
                <DialogActions className="justify-content-center pt-0 py-5 pb-5">
                    <Button onClick={() => closeLogoutAlert()}>Close</Button>
                    <Button onClick={() => { handleLogout(); handleMobileNav(!mobileNav); closeLogoutAlert() }} classes={'ms-4'}>Logout</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Header;
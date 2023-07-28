import React, { useEffect, useState } from 'react';
import TitleBox from '../UI/titlePart/TitleBox';
import Button from '../UI/button/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ErrorMsg from '../UI/errorMsg/ErrorMsg';

function CartNoRedux({setCartDataCount}) {
    const [mediData, setMediData] = useState([]);
    const [cartData, setCartData] = useState([]);
    
    let totleAmount = cartData.reduce((acc, val) => acc + val.mediprice * val.qty, 0);
    
    setCartDataCount(cartData.reduce((acc, val) => acc + val.qty, 0))

    useEffect(() => {
        fetch('http://localhost:3005/medicines')
            .then((response) => response.json())
            .then((data) => setMediData(data))
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('cartMediIdArr'));
        if (localData) {
            let findCartData = localData.map((cartMedicine) => {
                let findMediData = mediData.find((medicine) => medicine.id === cartMedicine.pid);
                return { ...findMediData, ...cartMedicine };
            });
            setCartData(findCartData);

        }
    }, [mediData]);

    const quantityDecrement = (id) => {
        let localData = JSON.parse(localStorage.getItem('cartMediIdArr'));
        let index = localData.findIndex((val) => val.pid === id);
        if (localData[index].qty > 1) {
            localData[index].qty--;
        }
        localStorage.setItem('cartMediIdArr', JSON.stringify(localData));

        let findCartData = localData.map((cartMedicine) => {
            let findMediData = mediData.find((medicine) => medicine.id === cartMedicine.pid);
            return { ...findMediData, ...cartMedicine };
        });
        setCartData(findCartData);
    }

    const quantityIncrement = (id) => {
        let localData = JSON.parse(localStorage.getItem('cartMediIdArr'));
        let index = localData.findIndex((val) => val.pid === id);
        localData[index].qty++;
        localStorage.setItem('cartMediIdArr', JSON.stringify(localData));

        let findCartData = localData.map((cartMedicine) => {
            let findMediData = mediData.find((medicine) => medicine.id === cartMedicine.pid);
            return { ...findMediData, ...cartMedicine };
        });
        setCartData(findCartData);
    }

    const removeFromCart = (id) => {
        let localData = JSON.parse(localStorage.getItem('cartMediIdArr'));
        let removedFromLocalData = localData.filter((val) => val.pid !== id);
        localStorage.setItem('cartMediIdArr', JSON.stringify(removedFromLocalData));

        let removedFromCart = cartData.filter((val) => val.pid !== id);
        setCartData(removedFromCart);
    }
    return (
        <section id="cart" className="cart">
            <div className="container">
                <TitleBox
                    titleText='Cart'
                    subTitleText={[
                        'Welcome to cart. You can see here your added product. Thank you !!!'
                    ]} />
                <div className="row justify-content-center">
                    {
                        cartData && cartData.length > 0 ?
                            cartData.map((item) => {
                                return (
                                    <div key={item.pid} className="card mb-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex g-5 justify-content-between">
                                                <div className='w-50'>
                                                    <h5 style={{
                                                        fontWeight: '700',
                                                        fontSize: '20px',
                                                        color: '#2c4964'
                                                    }}>{item.mediname}</h5>
                                                    <p className="small mb-0">{item.medidesc}</p>
                                                </div>
                                                <div className="d-flex gap-3 flex-row align-items-center">
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <Button classes='p-2 rounded-0' onClick={() => quantityDecrement(item.pid)}><RemoveIcon sx={{ fontSize: '20px' }} /></Button>
                                                        <h5 style={{ borderTop: '1px solid #FF6337', borderBottom: '1px solid #FF6337', lineHeight: '1.05', minWidth: '50px' }}
                                                            className="fw-normal text-center mb-0  p-2">{item.qty}</h5>
                                                        <Button classes='p-2 rounded-0' onClick={() => quantityIncrement(item.pid)}><AddIcon sx={{ fontSize: '20px' }} /></Button>
                                                    </div>
                                                    <div style={{ minWidth: 85 }}>
                                                        <h5 className="mb-0 text-center">${item.qty * item.mediprice}</h5>
                                                    </div>
                                                    <Button onClick={() => removeFromCart(item.pid)} classes='p-0 bg-transparent'><CloseIcon sx={{ color: '#cecece' }} /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <ErrorMsg style={{ height: '250px' }} text="The product isn't added in cart." />
                    }
                    {
                        cartData.length > 0 ?
                            <h5 className='text-end my-4'><b>Totle Amount: </b><span className='d-inline-block text-start ps-4' style={{ minWidth: '163px' }}>$ {totleAmount}</span></h5>
                            : null
                    }
                </div>
            </div>
        </section>
    );
}

export default CartNoRedux;
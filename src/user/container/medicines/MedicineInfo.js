import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMedicineData } from '../../redux/action/medicine.action';
import TitleBox from '../../UI/titlePart/TitleBox';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '../../UI/button/Button';
import { setAlert } from '../../redux/slice/AlertSlice';
import { addToCart } from '../../redux/action/cart.action';

function MedicineInfo() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const medicineData = useSelector((state) => state.medicines.medicines)

    useEffect(() => {
        dispatch(getMedicineData());
    }, []);

    const handleCart = (id) => {
        let addedCartItem = medicineData.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.mediname + ' is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id));
    }
    const handleBuyNow = (id) => {
        let addedCartItem = medicineData.find((val) => val.id === id)
        dispatch(setAlert({ text: 'Please contact with us for purchase to ' + addedCartItem.mediname, color: 'success' }))
    } 

    const medicine = medicineData.find(medicine => medicine.id === parseInt(id));
    return (
        <main>
            {medicine ? (
                <section className="medicine_details">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="medicine_details_image">
                                    <img src={`../assets/img/medicines/medicine-${medicine.id}.jpg`} alt="img" />
                                    <h4>{medicine.mediname}</h4>
                                    <span><b>Price: <CurrencyRupeeIcon sx={{ fontSize: '20px' }} /></b>{medicine.mediprice}</span>
                                    <span><b>Expiry date: </b>{medicine.mediexpiry}</span>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <TitleBox
                                    type='left'
                                    titleText={medicine.mediname}
                                    subTitleText={[
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.'
                                    ]}
                                />
                                <div className="signature_image text-end">
                                    <Button size="small" classes='rounded px-3 me-4' onClick={() => handleBuyNow(medicine.id)}>Buy Now</Button>
                                    <Button size="small" classes='rounded px-3' onClick={() => handleCart(medicine.id)}>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                        <div className='row bottom_part mt-5'>
                            <div className='col-10'>
                                <TitleBox
                                    type='left'
                                    OrangeTitleText='Benefits'
                                    titleText={`why ${medicine.mediname}?  What's are benefits of ${medicine.mediname}?`}
                                    subTitleText={['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.']}
                                />
                                <ul className='row skill_desc'>
                                    <li>Cancer Services</li>
                                    <li>Liver Transplant</li>
                                    <li>Kidney Cancer</li>
                                    <li>Cardiac Arrhythmia</li>
                                    <li>Dental Services</li>
                                    <li>Radiation Oncology</li>
                                    <li>Kidney Stone Center</li>
                                    <li>Male Urology Services</li>
                                    <li>Heart Transplant</li>
                                    <li>Pediatric Liver Transplant</li>
                                    <li>Pediatric Heart Transplant</li>
                                    <li>Pancreas Transplant</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
}

export default MedicineInfo;
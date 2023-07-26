import React from 'react';
import CustomCard from '../../UI/CustomCard';
import Loader from '../../UI/loader/Loader';
import Error from '../../UI/errorMsg/ErrorMsg'


function MedicineList({ mediData, handleCart, loading, error }) {
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    error ?
                        <Error className='py-5' text={error}/> :
                        mediData.map((v) => {
                            return (
                                <div className="col-3" key={v.id}>
                                    <CustomCard
                                        btnText='Add to Cart'
                                        cardData={v}
                                        onclick={handleCart} />
                                </div>
                            )
                        })
            }
        </>
    );
}

export default MedicineList;
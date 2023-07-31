import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBox from '../UI/titlePart/TitleBox';
import CustomCard from '../UI/CustomCard';

function Favourite() {
    const dispatch = useDispatch();
    const medicineState = useSelector((state) => state.medicines);
    const favouriteState = useSelector(state => state.favourites);

    let mediToFavData = favouriteState.favItmes.map((item) => {
        let filterData = medicineState.medicines.find((medicine) => medicine.id === item.fid);

        return { ...filterData, ...item }
    })
    return (
        <section id="favourite" className="favourite">
            <div className="container">
                <TitleBox
                    titleText='Your Favourites'
                    subTitleText={[
                        'Welcome to favourite. You can see here your favourite product. Thank you !!!'
                    ]} />
                <div className="row justify-content-center py-5 g-4">
                    {
                        mediToFavData.map((val) => {
                            return (
                                <div className="col-3" key={val.fid}>
                                    <CustomCard cardData={val} btnText={'Add to Cart'}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Favourite;
import React, { useState } from 'react';
import MedicineList from './MedicineList';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TitleBox from '../../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicineData } from '../../redux/action/medicine.action';
import { addToCart } from '../../redux/action/cart.action';
import { addToFavourtite } from '../../redux/action/favourite.action';

function Medicine() {
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();
    const medicineState = useSelector(state => state.medicines);
    const favouriteState = useSelector(state => state.favourites);

    React.useEffect(() => {
        dispatch(getMedicineData());
    }, [dispatch]);

    const handleSearching = (value) => {
        setSearchValue(value);
        const f_dataBySearch = medicineState.medicines.filter(
            (v) =>
                v.mediname.toLowerCase().includes(value.toLowerCase()) ||
                v.mediprice.toString().includes(value) ||
                v.mediexpiry.toString().includes(value) ||
                v.medidesc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(f_dataBySearch);
    };

    const handleCart = (id) => {
        dispatch(addToCart(id));
    }

    const addToFavourite = (id) => {
        dispatch(addToFavourtite(id))
    }

    const removeToFavourite = (id) => {
        dispatch(removeToFavourite(id))
    }
    return (
        <main>
            <section id="doctors" className="doctors">
                <div className="container">
                    <TitleBox
                        titleText='Medicines'
                        subTitleText={[
                            'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et, tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.'
                        ]} />
                    <div className='row justify-content-center'>
                        <div className='col-6'>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    type='search'
                                    fullWidth
                                    id="input-with-sx"
                                    value={searchValue}
                                    onChange={(e) => handleSearching(e.target.value)}
                                    label="Search for medicine here....."
                                    variant="standard"
                                />
                            </Box>
                        </div>
                    </div>
                    <div className="row py-5 g-4">
                        <MedicineList
                            mediData={searchValue !== '' ? filteredData : medicineState.medicines}
                            handleCart={handleCart}
                            addToFavourite={addToFavourite}
                            removeToFavourite={removeToFavourite}
                            loading={medicineState.loading}
                            error={medicineState.error}
                            favItmes={favouriteState.favItmes}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Medicine;
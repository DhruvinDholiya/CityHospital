import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TitleBox from '../../UI/titlePart/TitleBox';
import CustomCard from '../../UI/CustomCard';

function MedicineNoRedux({setCartDataCount}) {
    const [mediData, setMediData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:3005/medicines')
            .then((response) => response.json())
            .then((data) => setMediData(data))
            .catch((error) => console.log(error))
    }, [])

    const handleSearching = (value) => {
        setSearchValue(value);
        const f_dataBySearch = mediData.filter(
            (v) =>
                v.mediname.toLowerCase().includes(value.toLowerCase()) ||
                v.mediprice.toString().includes(value) ||
                v.mediexpiry.toString().includes(value) ||
                v.medidesc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(f_dataBySearch);
    };

    const handleCart = (id) => {
        setCartDataCount(prev => prev + 1)
        let localData = JSON.parse(localStorage.getItem('cartMediIdArr'))
        if (localData && localData.length > 0) {
            let addedItem = localData.find((val) => val.pid === id);
            if (addedItem) {
                addedItem.qty++
            } else {
                localData.push({ 'pid': id, 'qty': 1 })
            }
            localStorage.setItem('cartMediIdArr', JSON.stringify(localData));
        } else {
            localStorage.setItem('cartMediIdArr', JSON.stringify([{ 'pid': id, 'qty': 1 }]));
        }
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
                        {searchValue !== '' ?
                            filteredData.map((v) => {
                                return (
                                    <div className="col-3" key={v.id}>
                                        <CustomCard
                                            btnText='Add to Cart'
                                            cardData={v}
                                            onclick={() => handleCart(v.id)} />
                                    </div>
                                )
                            }) :
                            mediData.map((v) => {
                                return (
                                    <div className="col-3" key={v.id}>
                                        <CustomCard
                                            btnText='Add to Cart'
                                            cardData={v}
                                            onclick={() => handleCart(v.id)} />
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MedicineNoRedux;
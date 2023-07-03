import React, { useState, useEffect } from 'react';
import MedicineList from './MedicineList';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Medicine() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const l_medicine = JSON.parse(localStorage.getItem('_medicine'));
        setData(l_medicine);
    }, []);

    const handleSearching = (value) => {
        setSearchValue(value);
        const f_dataBySearch = data.filter(
            (v) =>
                v.mediname.toLowerCase().includes(value.toLowerCase()) ||
                v.mediprice.toString().includes(value) ||
                v.mediexpiry.toString().includes(value) ||
                v.medidesc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(f_dataBySearch);
    };

    return (
        <main>
            <section id="doctors" className="doctors">
                <div className="container">
                    <div className="section-title">
                        <h2>Medicines</h2>
                        <p>
                            Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus,
                            molestie vitae arcu et, tincidunt viverra erat. Quisque in lectus id nulla viverra
                            sodales in a risus. Aliquam ut sem ex. Duis viverra ipsum lacus, ut pharetra arcu
                            sagittis nec. Phasellus a eleifend elit.
                        </p>
                    </div>
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
                        <MedicineList mediData={searchValue !== '' ? filteredData : data} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Medicine;
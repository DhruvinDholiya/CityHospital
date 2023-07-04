import React from 'react';
import CustomCard from '../../UI/CustomCard';
import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function MedicineList({ mediData }) {
    return (
        <>
            {
                mediData.length === 0 ?
                    <div className='col-12 text-center'>
                        <h1 className='py-5' style={{ color: '#cccccc' }}><SadIcon style={{fontSize: '45px'}} /> No data available</h1>
                    </div>
                    :
                    mediData.map((v, i) => {
                        return (
                            <div className="col-3" key={v.id}>
                                <CustomCard medicine={v} />
                            </div>
                        )
                    })
            }
        </>
    );
}

export default MedicineList;
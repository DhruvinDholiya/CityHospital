import React from 'react';
import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function Dashboard(props) {
    return (
        <div style={{height: "calc(100% - 64px"}} className='d-flex align-items-center justify-content-center'>
            <h1 className='py-5' style={{ color: '#cccccc' }}><SadIcon style={{fontSize: '40px', verticalAlign: 'sub'}} /> Data not available in dashboard. </h1>
        </div>
    );
}

export default Dashboard;
import React from 'react';
import ErrorMsg from '../../user/UI/errorMsg/ErrorMsg';

function Dashboard() {
    return (
        <ErrorMsg style={{ height: "calc(100vh - 64px" }} text='Data not available in dashboard. ' />
    );
}

export default Dashboard;
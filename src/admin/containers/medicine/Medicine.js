import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import AddMedicine from './AddMedicineForm';
import { useDispatch } from 'react-redux';
import { getMedicineData } from '../../../user/redux/action/medicine.action';

export default function Medicine() {
    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);
    // const [updateData, setUpdateData] = React.useState(null);

    React.useEffect(() => {
        dispatch(getMedicineData());
    }, []);

    const handleSubmitData = (data) => {
        console.log(data)
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'mediname', headerName: 'Name', flex: 2 },
        { field: 'mediprice', headerName: 'Price', flex: 1 },
        { field: 'mediexpiry', headerName: 'Expiry Date', flex: 2 },
        { field: 'medidesc', headerName: 'Description', flex: 6 },
        // {
        //     field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
        //     renderCell: (params) => (
        //         <>
        //             <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
        //                 <EditIcon sx={{ fontSize: '20px' }} />
        //             </IconButton>
        //             <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
        //                 <DeleteIcon sx={{ fontSize: '20px' }} />
        //             </IconButton>
        //         </>
        //     )
        // }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            <AddMedicine handleSubmitData={handleSubmitData} />
            <DataGrid
                columns={columns}
                rows={data}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import AddDepartment from '../department/DepartmentForm'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../../user/UI/loader/Loader';
import ErrorMsg from '../../../user/UI/errorMsg/ErrorMsg'
import { addDepartment, deleteDepartment, getDepartment, updateDepartment } from '../../../user/redux/action/department.action';


export default function Department() {
    const [update, setUpdate] = React.useState(null);
    const dispatch = useDispatch();
    const departmentVal = useSelector(state => state.department);

    React.useEffect(() => {
        dispatch(getDepartment());
    }, []);


    const handleAddData = (data) => {
        if (update) {
            dispatch(updateDepartment(data));
        } else {
            dispatch(addDepartment(data));
        }
        setUpdate(null);
    }

    const handleUpdate = (rowData) => {
        setUpdate(rowData)
    }

    const handleDelete = (id) => {
        dispatch(deleteDepartment(id));
    }

    const columns = [
        { field: 'name', headerName: 'Name', flex: 3 },
        { field: 'desc', headerName: 'Description', flex: 10},
        {
            field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' size='small' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' size='small' onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <div className='data_table' style={{ height: 400, width: '100%' }}>
            {departmentVal.loading ?
                <Loader style={{ height: 'calc(100vh - 64px' }} /> :
                departmentVal.error ?
                    <ErrorMsg style={{ height: "calc(100vh - 64px" }} text={departmentVal.error} /> :
                    <>
                        <AddDepartment handleSubmitData={handleAddData} onUpdate={update} setUpdate={setUpdate} />
                        <DataGrid
                            columns={columns}
                            rows={departmentVal.department}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </>
            }
        </div >
    );
}






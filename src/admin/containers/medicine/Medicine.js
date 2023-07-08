import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddForm from './AddForm';

export default function Medicine() {
    const [data, setData] = React.useState([]);
    const [updateData, setUpdateData] = React.useState(null);

    React.useEffect(() => {
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        if (l_medicine !== null) {
            setData(l_medicine)
        }
    }, [])

    const handleDelete = (id) => {
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        let f_medicine = l_medicine.filter((v, i) => v.id !== id);
        localStorage.setItem("_medicine", JSON.stringify(f_medicine))
        setData(f_medicine);
    }

    const handleUpdate = (rowData) => {
        setUpdateData(rowData)
    }

    const handleSubmitData = (data) => {
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        let id = Math.floor(Math.random() * 10000);
        let newData = { id, ...data };

        if (l_medicine === null) {
            localStorage.setItem("_medicine", JSON.stringify([newData]))
            setData([newData])
        } else {
            if (updateData) {
                let updatedData = l_medicine.map((item) =>
                    item.id === updateData.id ? newData : item
                )
                localStorage.setItem("_medicine", JSON.stringify(updatedData))
                setData(updatedData)
            } else {
                l_medicine.push(newData)
                localStorage.setItem("_medicine", JSON.stringify(l_medicine))
                setData(l_medicine)
            }
        }
        setUpdateData(null)
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'mediname', headerName: 'Name', flex: 2 },
        { field: 'mediprice', headerName: 'Price', flex: 1 },
        { field: 'mediexpiry', headerName: 'Expiry Date', flex: 2 },
        { field: 'medidesc', headerName: 'Description', flex: 6 },
        {
            field: 'action', headerName: 'Action', flex: 1, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <>
            <AddForm handleSubmitData={handleSubmitData} updateData={updateData} setUpdateData={setUpdateData} />
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
        </>
    );
}
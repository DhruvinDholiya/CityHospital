import * as React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function Medicine() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [idForRowUpdate, setIdForRowUpdate] = React.useState(null)

    const validation = Yup.object({
        mediname: Yup.string().min(2).required('Product name is a required field'),
        mediprice: Yup.number().min(1).required('Price is a required field'),
        mediexpiry: Yup.date().required('Expairy Date is a required field')
            .min(new Date(new Date().setDate(new Date().getDate() - 1)), "Expairy Date must be in future or today"),
        medidesc: Yup.string().required('Description is a required field')
            .test("message", "Enter Maximum 100 Word", function (value) {
                let mediWords = value.split(" ");
                if (mediWords.length > 100) {
                    return false;
                } else {
                    return true;
                }
            })
    });

    const formik = useFormik({
        initialValues: { mediname: "", mediprice: "", mediexpiry: "", medidesc: "" },
        validationSchema: validation,
        onSubmit: (values, action) => {
            handleSubmitData(values);
            action.resetForm()
        },
    });
    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setIdForRowUpdate(null);
    };

    const handleSubmitData = (data) => {
        let id = Math.floor(Math.random() * 1000);
        let newData = { id, ...data };

        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));

        if (l_medicine === null) {
            localStorage.setItem("_medicine", JSON.stringify([newData]))
            setData([newData])
        } else {
            if (idForRowUpdate) {
                l_medicine = l_medicine.map((item) =>
                    item.id === idForRowUpdate ? { ...newData } : item
                )
                setIdForRowUpdate(null);
            } else {
                l_medicine.push(newData)
            }
            localStorage.setItem("_medicine", JSON.stringify(l_medicine))
            setData(l_medicine)
        }
        handleClose()
    }

    const handleDelete = (id) => {
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        let f_medicine = l_medicine.filter((v, i) => v.id !== id);
        localStorage.setItem("_medicine", JSON.stringify(f_medicine))
        setData(f_medicine);
    }

    const handleUpdate = (row) => {
        formik.setValues(row);
        setIdForRowUpdate(row.id)
        handleClickOpen()
    }

    React.useEffect(() => {
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        if (l_medicine !== null) {
            setData(l_medicine)
        }
    }, [])

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
                    <IconButton aria-label="delete" type='button' onClick={() => handleDelete(params.row.id)} >
                        <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <IconButton aria-label="edit" type='button' onClick={() => handleUpdate(params.row)} >
                        <EditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </>
            )
        }
    ];

    let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
    let rows = [];
    if (l_medicine !== null) {
        rows = l_medicine
    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Medicines</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>medicine <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 pt-4 pb-0 text-center '><b>{idForRowUpdate !== null ? 'Update' : 'Add'} Medicine</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediName" label="Name" type="text" fullWidth name='mediname' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mediname}
                            />
                            {errors.mediname && touched.mediname ? (
                                <span className="d-block position-absolute form-error">{errors.mediname}</span>
                            ) : null}
                        </div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediPrice" label="Price" type="text" fullWidth name='mediprice' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mediprice}
                            />
                            {errors.mediprice && touched.mediprice ? (
                                <span className="d-block position-absolute form-error">{errors.mediprice}</span>
                            ) : null}
                        </div>
                        <div className="col-6 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediExpiryDate" label="Expiry Date" type="date" name='mediexpiry' fullWidth variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.mediexpiry}
                            />
                            {errors.mediexpiry && touched.mediexpiry ? (
                                <span className="d-block position-absolute form-error">{errors.mediexpiry}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="mediDesc" label="Description" type="text" fullWidth multiline rows={3} name='medidesc' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.medidesc}
                            />
                            {errors.medidesc && touched.medidesc ? (
                                <span className="d-block position-absolute form-error">{errors.medidesc}</span>
                            ) : null}
                        </div>
                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">{idForRowUpdate !== null ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <div className='data_table' style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
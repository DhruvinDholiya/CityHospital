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

export default function Doctors() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [idForRowUpdate, setIdForRowUpdate] = React.useState(null)

    const validation = Yup.object({
        drname: Yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .matches(/^[a-zA-Z. ]+$/, "name is invalid")
            .required('Name is a required field'),
        drdesignation: Yup
            .string()
            .min(2, 'Designation must be at least 2 characters')
            .required('designation is a required field'),
        drdesc: Yup.string()
            .test("message", "Enter Maximum 100 Word", function (value) {
                let ary = value.split(" ");
                if (ary.length > 100) {
                    return false;
                } else {
                    return true;
                }
            })
            .required('Description is a required field'),
        drtwitter: Yup
            .string()
            .url()
            .required('Twitter is a required field'),
        drfacebook: Yup
            .string()
            .url()
            .required('Facebook is a required field'),
        drinstagram: Yup
            .string()
            .url()
            .required('Instagram is a required field'),
        drlinkdin: Yup
            .string()
            .url()
            .required('Linkdin is a required field')
    });

    const formik = useFormik({
        initialValues: { drname: "", drdesignation: "", drdesc: "", drtwitter: "", drfacebook: "", drinstagram: "", drlinkdin: "" },
        validationSchema: validation,
        onSubmit: (values, action) => {
            handleAddData(values);
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

    const handleAddData = (data) => {
        let id = Math.floor(Math.random() * 1000);
        let newData = { id, ...data };

        let l_doctors = JSON.parse(localStorage.getItem("_doctors"));

        if (l_doctors === null) {
            localStorage.setItem("_doctors", JSON.stringify([newData]))
            setData([newData])
        } else {
            if (idForRowUpdate !== null) {
                l_doctors = l_doctors.map((item) =>
                    item.id === idForRowUpdate ? { ...newData } : item
                )
                setIdForRowUpdate(null);
            } else {
                l_doctors.push(newData)
            }
            localStorage.setItem("_doctors", JSON.stringify(l_doctors))
            setData(l_doctors)
        }
        handleClose()
    }

    const handleDelete = (id) => {
        let l_doctors = JSON.parse(localStorage.getItem("_doctors"));
        let f_doctors = l_doctors.filter((v, i) => v.id !== id);
        localStorage.setItem("_doctors", JSON.stringify(f_doctors))
        setData(f_doctors);
    }

    const handleUpdate = (row) => {
        formik.setValues(row);
        setIdForRowUpdate(row.id)
        handleClickOpen()
    }

    React.useEffect(() => {
        let l_doctors = JSON.parse(localStorage.getItem("_doctors"));
        if (l_doctors !== null) {
            setData(l_doctors)
        }
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'drname', headerName: 'Name', flex: 2 },
        { field: 'drdesignation', headerName: 'Designation', flex: 2 },
        { field: 'drdesc', headerName: 'Description', flex: 4 },
        { field: 'drtwitter', headerName: 'Twitter', flex: 2 },
        { field: 'drfacebook', headerName: 'facebook', flex: 2 },
        { field: 'drinstagram', headerName: 'instagram', flex: 2 },
        { field: 'drlinkdin', headerName: 'linkdin', flex: 2 },
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

    let l_doctors = JSON.parse(localStorage.getItem("_doctors"));
    let rows = [];
    if (l_doctors !== null) {
        rows = l_doctors
    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-between py-4'>
                <h3 className='mb-0' style={{ color: '#FF6337' }}>Doctors</h3>
                <Button type="button" variant="contained" onClick={handleClickOpen}>Doctor <AddIcon fontSize="small" /></Button>
            </div>
            <Dialog id='addModal' open={open}>
                <DialogTitle style={{ fontSize: '24px' }} className='px-5 py-4 text-center '><b>{idForRowUpdate !== null ? 'Update' : 'Add'} Doctor</b></DialogTitle>
                <DialogContent className='px-5 pb-4'>
                    <form className='row' onSubmit={handleSubmit} style={{ width: "500px" }}>
                        <div className='col-12'><p className="mb-0">Basic information:</p></div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="drName" label="Name" type="text" fullWidth name='drname' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drname}
                            />
                            {errors.drname && touched.drname ? (
                                <span className="d-block position-absolute form-error">{errors.drname}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="drDesignation" label="Designation" type="text" fullWidth name='drdesignation' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drdesignation}
                            />
                            {errors.drdesignation && touched.drdesignation ? (
                                <span className="d-block position-absolute form-error">{errors.drdesignation}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className='m-0' margin="dense" id="drDesc" label="Description" type="text" fullWidth multiline rows={3} name='drdesc' variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drdesc}
                            />
                            {errors.drdesc && touched.drdesc ? (
                                <span className="d-block position-absolute form-error">{errors.drdesc}</span>
                            ) : null}
                        </div>
                        <div className='col-12'><p className="mb-0 mt-3">Doctor social media info:</p></div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Twitter" fullWidth variant="standard" type="text" name="drtwitter"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drtwitter}
                                size="small"
                            />
                            {errors.drtwitter && touched.drtwitter ? (
                                <span className="d-block form-error">{errors.drtwitter}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Facebook" fullWidth variant="standard" type="text" name="drfacebook"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drfacebook}
                                size="small"
                            />
                            {errors.drfacebook && touched.drfacebook ? (
                                <span className="d-block form-error">{errors.drfacebook}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Instagram" fullWidth variant="standard" type="text" name="drinstagram"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drinstagram}
                                size="small"
                            />
                            {errors.drinstagram && touched.drinstagram ? (
                                <span className="d-block form-error">{errors.drinstagram}</span>
                            ) : null}
                        </div>
                        <div className="col-12 mb-3 form_field position-relative">
                            <TextField className="m-0" margin="dense" label="Linkdin" fullWidth variant="standard" type="text" name="drlinkdin"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drlinkdin}
                                size="small"
                            />
                            {errors.drlinkdin && touched.drlinkdin ? (
                                <span className="d-block form-error">{errors.drlinkdin}</span>
                            ) : null}
                        </div>
                        <div className='pt-3 col-12 text-center'>
                            <Button className='me-3' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">{idForRowUpdate !== null ? 'Update' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >
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
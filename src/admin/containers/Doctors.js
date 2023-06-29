import React from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Doctors() {
    const validation = Yup.object({
        name: Yup
            .string()
            .min(2)
            .matches(/^[a-zA-Z ]+$/, "Product name is invalid")
            .required('Product name is a required field'),
        designation: Yup
            .string()
            .min(2)
            .matches(/^[a-zA-Z ]+$/, "designation is invalid")
            .required('designation is a required field'),
        desc: Yup.string()
            .test("message", "Enter Maximum 100 Word", function (value) {
                let ary = value.split(" ");
                if (ary.length > 100) {
                    return false;
                } else {
                    return true;
                }
            })
            .required('Description is a required field'),
        twitter: Yup
            .string()
            .url()
            .required('Twitter is a required field'),
        facebook: Yup
            .string()
            .url()
            .required('Facebook is a required field'),
        instagram: Yup
            .string()
            .url()
            .required('Instagram is a required field'),
        linkdin: Yup
            .string()
            .url()
            .required('Linkdin is a required field')
    });

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } =
        useFormik({
            initialValues: {
                name: "",
                designation: "",
                desc: "",
                twitter: "",
                facebook: "",
                instagram: "",
                linkdin: ""
                
            },
            validationSchema: validation,
            onSubmit: (values, action) => {
                console.log(values)
                action.resetForm();
            },
        });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="button" variant="contained" onClick={handleClickOpen}>Doctor <AddIcon style={{ textAlign: 'right' }} fontSize="small" /></Button>
            <Dialog open={open}>
                <DialogActions style={{ position: "absolute", right: '15px', top: '32px', padding: '0', justifyContent: 'flex-end' }}><Button style={{ padding: '0' }} onClick={handleClose}><CloseIcon style={{ color: '#FF6337' }} /></Button></DialogActions>
                <form className="p-5 pt-4" onSubmit={handleSubmit} style={{ width: "450px" }}>
                    <DialogContent className="p-0">
                        <DialogTitle fontSize={'25px'} color={'#FF6337'} className="text-center p-0 mb-3"><b>Add Doctor</b></DialogTitle>
                        <p className="mb-0">BASIC INFORMATION</p>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Name"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {errors.name && touched.name ? (
                                <span className="d-block position-absolute form-error">{errors.name}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Designation"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="designation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.designation}
                            />
                            {errors.designation && touched.designation ? (
                                <span className="d-block position-absolute form-error">{errors.designation}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Description"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="desc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.Description}
                            />
                            {errors.desc && touched.desc ? (
                                <span className="d-block form-error">{errors.desc}</span>
                            ) : null}
                        </div>
                        <p className="mb-0 mt-4">DOCTOR SOCIAL MEDIA INFO</p>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Twitter"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="twitter"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.twitter}
                            />
                            {errors.twitter && touched.twitter ? (
                                <span className="d-block form-error">{errors.twitter}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Facebook"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="facebook"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.facebook}
                            />
                            {errors.facebook && touched.facebook ? (
                                <span className="d-block form-error">{errors.facebook}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Instagram"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="instagram"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.instagram}
                            />
                            {errors.instagram && touched.instagram ? (
                                <span className="d-block form-error">{errors.instagram}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label="Linkdin"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="linkdin"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.linkdin}
                            />
                            {errors.linkdin && touched.linkdin ? (
                                <span className="d-block form-error">{errors.linkdin}</span>
                            ) : null}
                        </div>
                        <div className="text-center mt-5">
                            <Button type="submit" style={{ backgroundColor: '#FF6337' }} variant="contained">
                                Add <AddIcon fontSize="small" />
                            </Button>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
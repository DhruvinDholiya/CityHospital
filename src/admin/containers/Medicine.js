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

export default function Medicine() {
    const validation = Yup.object({
        name: Yup
            .string()
            .min(2)
            .required('Product name is a required field'),
        price: Yup
            .number()
            .min(1)
            .required('Price is a required field'),
        expiry: Yup
            .date()
            .min(new Date(new Date().setDate(new Date().getDate() - 1)), "Expairy Date must be in future or today")
            .required('Expairy Date is a required field'),
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
    });

    const handleAddData = (data) => {
        let id = Math.floor(Math.random() * 1000);
        let newData = {id, ...data };
        
        let l_medicine = JSON.parse(localStorage.getItem("_medicine"));
        
        if(l_medicine === null) {
            localStorage.setItem("_medicine", JSON.stringify([newData]))
        } else {
            l_medicine.push(newData)
            localStorage.setItem("_medicine", JSON.stringify(l_medicine))
        }
        handleClose()
    }

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } =
        useFormik({
            initialValues: {
                name: "",
                price: "",
                expiry: "",
                desc: "",
            },
            validationSchema: validation,
            onSubmit: (values, action) => {
                handleAddData(values)
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
            <Button type="button" variant="contained" onClick={handleClickOpen}>medicine <AddIcon style={{ textAlign: 'right' }} fontSize="small" /></Button>
            <Dialog open={open}>
                <DialogActions style={{ position: "absolute", right: '15px', top: '32px', padding: '0', justifyContent: 'flex-end' }}><Button style={{ padding: '0' }} onClick={handleClose}><CloseIcon style={{ color: '#FF6337' }} /></Button></DialogActions>
                <form className="p-5 pt-4" onSubmit={handleSubmit} style={{ width: "450px" }}>
                    <DialogContent className="p-0">
                        <DialogTitle fontSize={'25px'} color={'#FF6337'} className="text-center p-0"><b>Add Medicine</b></DialogTitle>
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
                                label="Price"
                                fullWidth
                                variant="standard"
                                type="text"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                            />
                            {errors.price && touched.price ? (
                                <span className="d-block position-absolute form-error">{errors.price}</span>
                            ) : null}
                        </div>
                        <div className="form_field mb-3 position-relative">
                            <TextField
                                className="m-0"
                                margin="dense"
                                label=" "
                                fullWidth
                                variant="standard"
                                type="date"
                                name="expiry"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.expiry}
                            />
                            {errors.expiry && touched.expiry ? (
                                <span className="d-block position-absolute form-error">{errors.expiry}</span>
                            ) : null}
                        </div>
                        <div className="form_field position-relative">
                            <TextField
                            className="m-0"
                                label="Description"
                                type="text"
                                multiline
                                name="desc"
                                rows={3}
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.desc}
                            />
                            {errors.desc && touched.desc ? (
                                <span className="d-block form-error">{errors.desc}</span>
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
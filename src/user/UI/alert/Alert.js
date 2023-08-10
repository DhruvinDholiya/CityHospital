import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../redux/slice/AlertSlice';

function Alert() {
    const alert = useSelector((state) => state.alert)
    const dispatch = useDispatch();

    console.log(alert)
    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text, {
                autoHideDuration: 4000,
                variant: alert.color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                }
            })
        }

        const timer = setTimeout(() => {
            dispatch(resetAlert());
        }, 4000)

        return () => clearTimeout(timer)
    }, [alert.text])
    return (
        <div></div>
    );
}

export default Alert;
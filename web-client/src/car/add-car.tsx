import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Car, { EmptyCar } from './car-list.model';
import axios from 'axios';
import { SERVER_URL } from '../configs/app.const';
import CarFormDialog from './car-form-dialog';

export interface AddCarProps {
    onRefresh: () => void;
}

export default function AddCar(props: AddCarProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    const [carInfoState, setCarInfoState] = React.useState<Car>(EmptyCar);

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = (value: Car, isCanceled: boolean = false) => {
        setOpen(false);
        setCarInfoState(value);
        console.log(value);
        if (!isCanceled) {
            axios.post(`${SERVER_URL}/api/cars`, value)
                .then(() => {
                    setCarInfoState(EmptyCar);
                    props.onRefresh();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <Button color="inherit" onClick={handleClickOpen}><AddIcon /> Add Car</Button>
            <CarFormDialog currentCarInfo={carInfoState} open={open} onClose={handleClose} />
        </>
    );
}
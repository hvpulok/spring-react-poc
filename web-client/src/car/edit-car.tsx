import React from 'react';
import Button from '@material-ui/core/Button';
import Car, { CarDTO } from './car-list.model';
import axios from 'axios';
import CarFormDialog from './car-form-dialog';

export interface EditCarProps {
    carToEdit: CarDTO,
    onRefresh: () => void;
}

export default function EditCar(props: EditCarProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const carToEditValue = {
        brand: props.carToEdit.brand,
        color: props.carToEdit.color,
        model: props.carToEdit.model,
        registerNumber: props.carToEdit.registerNumber,
        year: props.carToEdit.year,
        price: props.carToEdit.price,
    }

    const [carInfoState, setCarInfoState] = React.useState<Car>(carToEditValue);

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = (value: Car, isCanceled: boolean = false) => {
        setOpen(false);
        setCarInfoState(value);
        console.log('After edit car: ', value);
        if (!isCanceled) {
            axios.put(props.carToEdit._links.self.href, value)
                .then(() => {
                    setCarInfoState(carToEditValue);
                    props.onRefresh();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <Button color="primary" onClick={handleClickOpen}>Edit</Button>
            <CarFormDialog currentCarInfo={carInfoState} submitButtonText="Save" open={open} onClose={handleClose} />
        </>
    );
}
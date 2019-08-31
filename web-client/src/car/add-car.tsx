import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from '@material-ui/core';
import Car from './car-list.model';
import axios from 'axios';
import { SERVER_URL } from '../configs/app.const';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            width: '320px',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            flex: '1 1 auto',
        },
        button: {
            margin: '30px auto'
        }
    }),
);

const emptyCar = {
    brand: '',
    model: '',
    color: '',
    registerNumber: '',
    year: '',
    price: ''
};

export interface AddCarFormDialogProps {
    open: boolean;
    currentCarInfo: Car;
    onClose: (value: Car, isCanceled?: boolean) => void;
}

function AddCarFormDialog(props: AddCarFormDialogProps) {
    const classes = useStyles();
    const { onClose, currentCarInfo, open } = props;
    const [carInfoState, setCarInfoState] = React.useState<Car>(currentCarInfo);

    const handleChange = (name: keyof Car) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCarInfoState({ ...carInfoState, [name]: event.target.value });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCarInfoState(emptyCar)
        onClose(carInfoState);
        event.preventDefault();
    }

    function handleClose() {
        onClose(carInfoState, true);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="add-car-dialog-title" open={open}>
            <DialogTitle id="add-car-dialog-title">Add New Car</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="car-brand"
                    label="Brand"
                    className={classes.textField}
                    value={carInfoState.brand}
                    onChange={handleChange('brand')}
                    margin="normal"
                />
                <TextField
                    id="car-color"
                    label="Color"
                    className={classes.textField}
                    value={carInfoState.color}
                    onChange={handleChange('color')}
                    margin="normal"
                />
                <TextField
                    id="car-model"
                    label="Model"
                    className={classes.textField}
                    value={carInfoState.model}
                    onChange={handleChange('model')}
                    margin="normal"
                />
                <TextField
                    id="car-price"
                    label="Price"
                    className={classes.textField}
                    value={carInfoState.price}
                    onChange={handleChange('price')}
                    margin="normal"
                />
                <TextField
                    id="car-register-number"
                    label="Register Number"
                    className={classes.textField}
                    value={carInfoState.registerNumber}
                    onChange={handleChange('registerNumber')}
                    margin="normal"
                />
                <TextField
                    id="car-year"
                    label="Year"
                    className={classes.textField}
                    value={carInfoState.year}
                    onChange={handleChange('year')}
                    margin="normal"
                />
                <Button className={classes.button} type="submit" color="primary" variant="contained" onClick={handleSubmit}><AddIcon /> Add Car</Button>
            </form>
        </Dialog>
    );
}

export interface AddCarProps {
    onRefresh: () => void;
}

export default function AddCar(props: AddCarProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    const [carInfoState, setCarInfoState] = React.useState<Car>(emptyCar);

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
                    setCarInfoState(emptyCar);
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
            <AddCarFormDialog currentCarInfo={carInfoState} open={open} onClose={handleClose} />
        </>
    );
}
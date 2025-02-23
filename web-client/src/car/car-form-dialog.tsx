import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import Car, { EmptyCar } from './car-list.model';

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

export interface CarFormDialogProps {
    open: boolean;
    currentCarInfo: Car;
    submitButtonText: string;
    onClose: (value: Car, isCanceled?: boolean) => void;
}

export default function CarFormDialog(props: CarFormDialogProps) {
    const classes = useStyles();
    const { onClose, currentCarInfo, open } = props;
    const [carInfoState, setCarInfoState] = React.useState<Car>(currentCarInfo);

    const handleChange = (name: keyof Car) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCarInfoState({ ...carInfoState, [name]: event.target.value });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCarInfoState(EmptyCar)
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
                <Button className={classes.button} type="submit" color="primary" variant="contained" onClick={handleSubmit}>{props.submitButtonText}</Button>
            </form>
        </Dialog>
    );
}
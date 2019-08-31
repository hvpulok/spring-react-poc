import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import { LoginDto } from './login.model';
import AccountBox from '@material-ui/icons/AccountBox';
import axios from 'axios';
import { SERVER_URL } from '../../configs/app.const';

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

export interface LoginFormDialogProps {
    open: boolean;
    onClose: (value: LoginDto, isCanceled?: boolean) => void;
}

function LoginDialog(props: LoginFormDialogProps) {
    const classes = useStyles();
    const { onClose, open } = props;
    const [loginDataState, setLoginDataState] = React.useState<LoginDto>(new LoginDto());

    const handleChange = (name: keyof LoginDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginDataState({ ...loginDataState, [name]: event.target.value });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(loginDataState);
        setLoginDataState(new LoginDto());
        onClose(loginDataState);
    }

    function handleClose() {
        console.log(loginDataState);
        onClose(loginDataState, true);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="add-car-dialog-title" open={open}>
            <DialogTitle id="user-login-form">User login form</DialogTitle>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="username"
                    label="Username"
                    className={classes.textField}
                    value={loginDataState.username}
                    onChange={handleChange('username')}
                    margin="normal"
                />

                <TextField
                    id="password"
                    label="Password"
                    className={classes.textField}
                    value={loginDataState.password}
                    onChange={handleChange('password')}
                    margin="normal"
                />

                <Button className={classes.button} type="submit" color="primary" variant="contained" onClick={handleSubmit}>Login</Button>
            </form>
        </Dialog>
    );
}

export interface LoginProps {
    onRefresh: () => void;
}

export default function Login(props: LoginProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    function handleClickOpen() {
        setOpen(true);
    }

    const handleClose = (value: LoginDto, isCanceled?: Boolean) => {
        if (!isCanceled) {
            console.log('send to server', value)
            axios.post(`${SERVER_URL}/login`, value)
                .then((res: any) => {
                    if (res.headers.authorization) {
                        console.log('Successfully logged in');
                        sessionStorage.setItem("jwt", res.headers.authorization);
                        props.onRefresh();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setOpen(false);
    };

    return (
        <>
            <Button color="inherit" onClick={handleClickOpen}><AccountBox />Login</Button>
            <LoginDialog open={open} onClose={handleClose} />
        </>
    );
}
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { auth } from "./base";


function getModalStyle() {
    const top = 50
    const left = 50
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal() {

    const [buttonText, setButtonText] = useState('Send Email')
    const [text, setText] = useState('Please enter your email')
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setText('Please enter your email')
            setButtonText('Send Email')
    };

    const handleClose = () => {
        setOpen(false);
        
    };

    const sendEmail = () => {
        if (buttonText === 'Close') { 
            setOpen(false) 
            setText('Please enter your email')
            setButtonText('Send Email')
        }
        else {
            console.log(email)
            auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    setText('Email Sent')
                    setButtonText('Close')
                    // setEmailHasBeenSent(true);
                    // setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
                })
                .catch(() => {
                    setText("Error resetting password");
                });
        }
    }
    const emailChange = (event) => {
        event.preventDefault()
        setEmail(event.target.value)
    }
    const [email, setEmail] = useState()
    const body = (
        <div style={modalStyle} className={classes.paper}>

            {/* <form onSubmit={sendEmail}> */}
            {
                text === "Email Sent" ?
                    <>
                        <br></br>
                        <br></br>
                        <h4 id="simple-modal-title" style={{ marginLeft: '3em' }}>{text}</h4>
                    </>
                    :
                    <>
                        <h4 id="simple-modal-title">{text}</h4>
                        <br />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            onChange={(e) => emailChange(e)}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </>

            }

            <br></br><br />

            <Button type="submit" onClick={sendEmail} style={{ marginLeft: '7em' }} variant="contained" color="primary">{buttonText}</Button>
            {/* </form> */}
            {/* <SimpleModal /> */}
        </div>
    );

    return (
        <div>
            <Button onClick={handleOpen}>
                Forgot Password
      </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

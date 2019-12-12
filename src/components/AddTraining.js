import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

function AddTraining(props) {
    const BootstrapButton = withStyles(
        {
            root: {
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 16,
            padding: '6px 12px',
            border: '1px solid',
            lineHeight: 1.5,
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                backgroundColor: '#0069d9',
                borderColor: '#0062cc',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: '#0062cc',
                borderColor: '#005cbf',
            },
            '&:focus': {
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
            }
            }
      }
    )(Button);

    const[open, setOpen] = useState(false)
    const[training, setTraining] = useState([])

    function handleChange(event) {
        setTraining({...training, [event.target.name] : event.target.value})
    }   
    
    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleCloseSave() {
        var customer = props.customer.links[1].href //Saving a link to a variable customer which points to a unique link in the api
        console.log(customer)
        const newTraining = {...training, customer: props.customer.links[1].href} //Adding new training to variable and determing the customer right
        props.saveTraining(newTraining) //Sending the newTraining obj to Customerlist's saveTraining as props
        setOpen(false)
    }

    return (
        <div style = {{margin:10}}>
             <BootstrapButton 
                variant="contained" 
                color="primary"
                disableRipple 
                onClick = {handleClickOpen} 
                size="small"
                style = {{width: 80}}
             >
             ADD
             </BootstrapButton>
            <Dialog open = {open} onClose = {handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id = "form-dialog-title">Add a new training to a customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please insert the credentials for this training session</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        label="Date"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {training.date}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        label="Activity"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {training.activity}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        label="Duration"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {training.duration}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">Cancel</Button>
                    <Button onClick = {handleCloseSave} color = "primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining;
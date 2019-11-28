import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTraining(props) {
    const[open, setOpen] = useState(false)
    const[training, setTraining] = useState({
        date: "", activity: "", duration: "", customer: props.link})
    
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
        props.saveTraining(training)
        setOpen(false)
    }
    return (
        <div style = {{margin:10}}>
            <Button variant = "outlined" color = "primary" onClick = {handleClickOpen} style = {{marginLeft: 670}}>NEW TRAINING</Button>
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
                      <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        label="Customer"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {training.customer}
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
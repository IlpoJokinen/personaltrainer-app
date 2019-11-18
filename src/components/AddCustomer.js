import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCustomer({saveCustomer}) {
    const[open, setOpen] = useState(false)
    const[customer, setCustomer] = useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
         email: "", phone: ""
    })

    function handleChange(event) {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }

    function handleClickOpen() {
        setOpen(true)
    }
    
    function handleClose() {
        setOpen(false)
    }

    function handleCloseSave() {
        saveCustomer(customer)
        console.log(customer)
        setOpen(false)
        setCustomer({
            firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
            email: "", phone: ""
        })
    }

    return (
        <div style = {{margin: 10}}>
            <Button variant = "outlined" color = "primary" onClick = {handleClickOpen} style = {{marginLeft: 670}}>NEW CUSTOMER</Button>
            <Dialog open = {open} onClose = {handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id = "form-dialog-title">Add a new customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please insert the credentials for the customer</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        label="Firstname"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.firstname}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        label="Lastname"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.lastname}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        label="Streetaddress"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.streetaddress}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        label="Postcode"
                        fullWidth
                        onChange = {event=> handleChange(event)}
                        value = {customer.postcode}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        label="City"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.city}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.email}
                    />
                      <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        label="Phone"
                        fullWidth
                        onChange = {event => handleChange(event)}
                        value = {customer.phone}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">Cancel</Button>
                    <Button onClick = {handleCloseSave} color = "primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCustomer;
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

function EditCustomer({editCustomer, customerr}) {

    const[open, setOpen] = useState(false)
    const[customer, setCustomer] = useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
        email: "", phone: ""
    })

    function handleChange(event) {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }
    function handleClickOpen() {
        setCustomer({
            firstname: customerr.firstname, lastname: customerr.lastname, streetaddress: customerr.streetaddress,
            postcode: customerr.postcode, city: customerr.city, email: customerr.email, phone: customerr.phone
        }) 
        console.log(customerr)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function handleCloseSave() {
        editCustomer(customer, customerr.links[0].href)
        setOpen(false)
        setCustomer({
            firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
            email: "", phone: ""
        })
    };
    return (
        <div>
            <EditIcon  color = "primary" onClick = {handleClickOpen}></EditIcon>
            <Dialog open = {open} onClose = {handleClose} aria-labelledby = "form-dialog-title">
                <DialogTitle id ="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please enter the new credentials for this customer!</DialogContentText>
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
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleCloseSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;
import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function AddCustomer({saveCustomer}) {
    const[open, setOpen] = useState(false)
    const[customer, setCustomer] = useState({
        firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
         email: "", phone: ""
    })
   // const[loading, setLoading] = useState(false);
   // const[success, setSuccess] = useState(false);
   // const timer = React.useRef();

    function handleChange(event) {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }

    function handleClickOpen() {
        setOpen(true)
    }
    
    function handleClose() {
        setOpen(false)
    }
   /* const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    }); */
    
    function handleCloseSave() {
       /* if(!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout( () => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        } */
        saveCustomer(customer)
        console.log(customer)
        setOpen(false)
        setCustomer({
            firstname: "", lastname: "", streetaddress: "", postcode: "", city: "",
            email: "", phone: ""
        })
    }

   /* const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          alignItems: 'center',
        },
        wrapper: {
          margin: theme.spacing(1),
          position: 'relative',
        },
        buttonSuccess: {
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
        fabProgress: {
          color: green[500],
          position: 'absolute',
          top: -6,
          left: -6,
          zIndex: 1,
        },
        buttonProgress: {
          color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
      })); */

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
                    <Button onClick = {handleCloseSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCustomer;
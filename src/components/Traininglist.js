import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import AddTraining from './AddTraining';

const Traininglist = () => {

const[trainings, setTrainings] = useState([]);
const[open, setOpen] = useState(false);
const[msg, setMsg] = useState("");
const[openDialog, setOpenDialog] = useState(false);
const[link, setLink] = useState("");

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
/*function handleClickOpen() {
    setOpenTrainings(true)
}*/
function handleClickOpenDialog(link) {
    setLink(link)
    setOpenDialog(true)
}

function handleClose() {
    setOpen(false)
    //setOpenTrainings(false)
}
function handleCloseDialog() {
    setOpenDialog(false)
}
function handleCloseDialogNo() {
    setOpenDialog(false)
}
function handleCloseDialogDelete() {
    deleteTraining(link)
    setLink("")
    setOpenDialog(false)
}
useEffect(() => { //FIRST RENDER ONLY
    fetchTrainings()
    //fetchCustomersTrainings()
} ,[])


function fetchTrainings() {
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(resData => {
        console.log(resData)
        let content = resData.map(training => {
            var customer = training.customer !== null ? `${training.customer.firstname} ${training.customer.lastname}` : "This training has no customers!"
            var date = moment(training.date)
            return {...training, date: date.format("LLL"), customer: customer}
        })
        return setTrainings(content)
    })
}

/*function fetchCustomersTrainings() {
    fetch(trainings.links[2].href)
    .then (response => response.json())
    .then (data =>{
        console.log(trainings.links[2].href)
        return setCustomerName(data)
    })
    .catch(err => console.error(err))
}
*/
function saveTraining(newTraining) {
    console.log(newTraining)
    fetch("https://customerrest.herokuapp.com/api/trainings",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTraining)
    }
    )
    .then(response => fetchTrainings())
    .then(response => setMsg("Training added!"))
    .then(response => setOpen(true))
    .catch(err => console.error(err))
}

const columns = [
    {
        Header: "Customer",
        accessor: "customer"
    },
    {
        Header: "Date",
        accessor: "date",
    },
    {
        Header: "Duration",
        accessor: "duration"
    },
    {
        Header: "Activity",
        accessor: "activity"
    },
    {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row =>
            <IconButton aria-label = "delete"
            onClick = { () => handleClickOpenDialog(row.original.links[1].href)}>
            <DeleteIcon/>
            </IconButton>
    }
]

function deleteTraining(link) {
            fetch(link, {method: "DELETE"})
            .then(response => fetchTrainings())
            .then(response => setMsg("Customer's training deleted!"))
            .then(response => setOpen(true))
            .catch(err => console.error(err))
            handleCloseDialog()
}

return (
    <div>
        <Grid container>
            <Grid item>
                <AddTraining saveTraining = {saveTraining}/>
            </Grid>
        </Grid>
        <ReactTable data = {trainings} columns = {columns} filterable = {true}/>
        <Snackbar open = {open} autoHideDuration = {3000} onClose = {handleClose} message = {msg}/>
        <Dialog
        prop={link}
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >

        <DialogTitle id="alert-dialog-slide-title">{"Alert! Are you absolutely sure?"}</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          This action will permanently delete this customer's training. He will be extremely sad to see that
          you have removed the training. Please reconsider!
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialogNo} color="primary">
            Sorry, my bad
          </Button>
          <Button onClick={handleCloseDialogDelete} color="secondary">
            Delete anyway! 
          </Button>
        </DialogActions>
      
      </Dialog>
    </div>
);

};
export default Traininglist;
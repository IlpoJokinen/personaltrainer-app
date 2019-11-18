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

const Traininglist = () => {

const[trainings, setTrainings] = useState([]);
const[open, setOpen] = useState(false);
const[msg, setMsg] = useState("");
const[openDialog, setOpenDialog] = useState(false);
const[accept, setAccept] = useState(false);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function dialogConfirm() {
    setAccept(true)
}
function handleClickOpenDialog() {
    setOpenDialog(true)
}

function handleClose() {
    setOpen(false)
}
function handleCloseDialog() {
    setOpenDialog(false)
}
function handleCloseDialogNo() {
    setOpenDialog(false)
}
function handleCloseDialogYes() {
    setOpenDialog(false)
}

function fetchTrainings() {
    fetch("https://customerrest.herokuapp.com/api/trainings")
    .then(response => response.json())
    .then(resData => {
        let content = resData.content.map(training => {
            var date = moment(training.date)
            return {...training, date: date.format("LLL")}
        })
        return setTrainings(content)
    })
}
useEffect( () => {
    fetchTrainings()
} ,[])

const columns = [
    {
        Header: "Date",
        accessor: "date"
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
            onClick = { () => deleteTraining(row.original.links[1].href)}>
            <DeleteIcon/>
            </IconButton>
    }
]

function deleteTraining(link) {
     if(handleClickOpenDialog()) {
         if(accept === true) {
            fetch(link, {method: "DELETE"})
            .then(response => fetchTrainings())
            .then(response => setMsg("Customer's training deleted!"))
            .then(response => setOpen(true))
            .catch(err => console.error(err))
            handleCloseDialog()
        }
     }
}

return (
    <div>
        <ReactTable data = {trainings} columns = {columns} filterable = {true}/>
        <Snackbar open = {open} autoHideDuration = {3000} onClose = {handleClose} message = {msg}/>
        <Dialog
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
          <Button onClick={dialogConfirm} color="secondary">
            Delete anyway! 
          </Button>
        </DialogActions>
      
      </Dialog>
    </div>
);

};
export default Traininglist;
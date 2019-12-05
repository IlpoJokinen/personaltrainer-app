import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './Editcustomer';
import Grid from '@material-ui/core/Grid';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

const Customerlist = () => {

const[customers, setCustomers] = useState([]);
const[open, setOpen] = useState(false);
const[msg, setMsg] = useState("");

function fetchCustomers() {
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json())
    .then(resData => setCustomers(resData.content))
}
useEffect( () => { //FIRST RENDER ONLY
    fetchCustomers()
}, [])

function saveCustomer(newCustomer){
    console.log(newCustomer)
    fetch("https://customerrest.herokuapp.com/api/customers", 
    {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomer)
    }
    )
    .then(response => fetchCustomers())
    .then(response => setMsg("Customer saved!"))
    .then(response => setOpen(true))
    .catch(err => console.error(err))
}

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
    .then(response => setOpen(true))
    .then(response => setMsg("Training added!"))
    .catch(err => console.error(err))
}

const columns = [
    {
        Header: "Firstname",
        accessor: "firstname"
    },
    {
        Header: "Lastname",
        accessor: "lastname"
    },
    {
        Header: "Streetaddress",
        accessor: "streetaddress"
    },
    {
        Header: "Postcode",
        accessor: "postcode"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "Phone",
        accessor: "phone"
    },
    {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 150,
        Cell: row => <AddTraining saveTraining = {saveTraining} customer = {row.original} />
    },
    {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => <EditCustomer editCustomer={editCustomer} customerr = {row.original}></EditCustomer>
    },
    {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => 
            <IconButton aria-label = "delete" 
            onClick = { () => deleteCustomer(row.original.firstname +" "+ row.original.lastname, row.original.links[1].href)}>
            <DeleteIcon />
            </IconButton>
    }
]

function deleteCustomer(name, link) {
    console.log(name)
    if(window.confirm("Are you sure?")) {
        fetch(link, {method: "DELETE"})
        .then(response => fetchCustomers())
        .then(response => setMsg("Customer " +name+ " deleted succesfully!"))
        .then(response => setOpen(true))
        .catch(err => console.error(err))
    }
}
function editCustomer(editedCustomer, link) {
    fetch(link, 
        {method: "PUT", headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedCustomer)})
    .then(response => fetchCustomers())
    .then(response => setMsg("Customers information has been edited"))
    .then(response => setOpen(true))
    .catch(err => console.error(err))
}

function handleClose() { 
    setOpen(false)
}
return (
    <div>
        <Grid container>
            <Grid item>
                <AddCustomer saveCustomer = {saveCustomer}/>
            </Grid>
        </Grid>
        <ReactTable data = {customers} columns = {columns} filterable = {true}/>
        <Snackbar open = {open} autoHideDuration = {3000} onClose = {handleClose} message = {msg}/>
    </div>
);

};
export default Customerlist;
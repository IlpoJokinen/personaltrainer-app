import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Customerlist = () => {

const[customers, setCustomers] = useState([]);

function fetchCustomers() {
    fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json())
    .then(resData => setCustomers(resData.content))
}
useEffect( () => {
    fetchCustomers()
}, [])

const columns = [
    {
        Header: "Firstname",
        accessor: "firstname"
    },
    {
        Header: "Lastname",
        accessor: "Lastname"
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
    }
]

return (
    <div>
        <ReactTable data = {customers} columns = {columns} filterable = {true}/>

    </div>
);

};
export default Customerlist;
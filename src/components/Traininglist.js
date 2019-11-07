import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment';

const Traininglist = () => {

const[trainings, setTrainings] = useState([]);

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
    }
]

return (
    <div>
        <ReactTable data = {trainings} columns = {columns} filterable = {true}/>

    </div>
);

};
export default Traininglist;
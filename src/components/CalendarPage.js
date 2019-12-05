import React, {useState, useEffect} from 'react';
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
 
function CalendarPage() {
const localizer = momentLocalizer(moment) 
var event = [];

const[trainings, setTrainings] = useState([]);

useEffect( () => {
    fetchTrainings()
}, [])

function fetchTrainings() { //Fetching the trainings to the page
    fetch("https://customerrest.herokuapp.com/gettrainings")
    .then(response => response.json())
    .then(resData => {
        console.log(resData)
        let content = resData.map(training => {
            var date = training.date
            return {...training, date: date}
        })
        return setTrainings(content)
    })
}

    event = trainings.map(training => { //Mapping the array of objects called "trainings" and 
                                        //creating 3 variables in each loop, then returning a object called event full of these variables
        var title = training.activity
        var startTime = moment.utc(training.date)._d
        var endTime = moment.utc(training.date).add(training.duration, "minutes")._d
        return {title: title, start: startTime, end: endTime}
    })

console.log(event)
return (
    <div style = {{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events= {event}
        startAccessor="start"
        endAccessor="end"
     />
    </div>
)
}

export default CalendarPage
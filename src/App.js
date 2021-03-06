import React, { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/CalendarPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DateRangeIcon from '@material-ui/icons/DateRange';

function App() {
  
  const[value, setValue] = useState('customer');

  function handleChange(event, value) {
    setValue(value);
  } 

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Ilpo's PT-APP with React
          </Typography>
        </Toolbar>
        <Tabs value = {value} onChange = {handleChange}>
          <Tab value = "customer" label = "Customers" icon = {<PersonPinIcon />}/>
          <Tab value = "training" label = "Trainings" icon = {<FitnessCenterIcon />}/>
          <Tab value = "calendar" label = "Calendar" icon = {<DateRangeIcon />}/>
        </Tabs>
      </AppBar>
      {value === 'customer' && <div><Customerlist/></div>}
      {value === 'training' && <div><Traininglist/></div>}
      {value === 'calendar' && <div><Calendar/></div>}
    </div>
  )
}

export default App;

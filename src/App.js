import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

function App() {
  const[value, setValue] = React.useState('one');

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
          <Tab value = "one" label = "Customers" icon = {<PersonPinIcon />}/>
  <Tab value = "two" label = "Trainings" icon = {<FitnessCenterIcon />}/>
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist/></div>}
      {value === 'two' && <div><Traininglist/></div>}
    </div>
  );
}

export default App;

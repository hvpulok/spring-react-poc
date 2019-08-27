import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import NavBar from './components/nav-bar/NavBar';
import CarList from './car/car-list';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <NavBar />
          <CarList />
        </div>
      </React.Fragment>
    )
  }
}

export default App;

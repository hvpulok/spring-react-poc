import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import NavBar from './components/nav-bar/NavBar';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <NavBar />
          <h1>Car database</h1>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

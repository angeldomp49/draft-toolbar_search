import React, { Component } from 'react';
import './App.css';
import Tabla from './components/tabla';
import ToolbarSearch from './components/toolbarSearch';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyApuL5Rcn4sHyTHKG5q28vws4GjLAky1_8",
    authDomain: "conexionreact.firebaseapp.com",
    databaseURL: "https://conexionreact.firebaseio.com",
    projectId: "conexionreact",
    storageBucket: "conexionreact.appspot.com",
    messagingSenderId: "338824526581",
    appId: "1:338824526581:web:1a50a7b2eeb89772"
  };
  
  firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bddContext: firebase
    }
  }

  render() {
    return (
      <div>
        <Tabla bddContext={this.state.bddContext}></Tabla>
      </div>
    );
  }
}

export default App;

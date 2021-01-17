import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setRecords, setWishlist } from './Redux/actions'

import RecordSearchContainer from './Containers/RecordSearchContainer';
import RecordStore from './Containers/RecordStore';

class App extends React.Component {
  
  componentDidMount = () => {
    this.props.setWishlist()
    this.props.setRecords()
  }
  
  render () {

    return (
      
      <div className="App">
        <RecordSearchContainer />
        <RecordStore />
      </div>
        
   )
  } 
}

function msp(state) {
  return {
    user: state.user,
    wishlists: state.wishlists,
    records: state.records
  }
}

function mdp(dispatch){
  return{
    setWishlist: (userId) => dispatch(setWishlist(2)),
    setRecords: () => dispatch(setRecords())
    
  }
}

export default connect(msp, mdp)(App);

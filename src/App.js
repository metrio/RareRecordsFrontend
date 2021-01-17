import React, { Profiler } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setRecords, setWishlist } from './Redux/actions'

import NavBar from './Components/NavBar'
import RecordSearchContainer from './Containers/RecordSearchContainer';
import RecordStore from './Containers/RecordStore';
import Profile from './Containers/Profile';
import HomePage from './Containers/HomePage';

class App extends React.Component {
  
  componentDidMount = () => {
    this.props.setWishlist()
    this.props.setRecords()
  }
  
  render () {

    return (
      
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/profile" render={(routerProps)=> {
            return(
              <Profile routerProps={routerProps} />
            )
          }} />
          <Route path="/discogs-search"render={(routerProps)=> {
            return(
              <RecordSearchContainer routerProps={routerProps} />
            )
          }} />
          <Route path="/store" render={(routerProps) => {
            return (
              <RecordStore routerProps={routerProps} />
            )
          }} />
          <Route path="/" render={() => <HomePage />} />
        </Switch >
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

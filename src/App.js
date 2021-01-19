import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setRecords, setWishlist, loginUser, signupUser, returningUser, editUser } from './Redux/actions';
import NavBar from './Components/NavBar';
import RecordDiscogsSearchContainer from './Containers/RecordDiscogsSearchContainer';
import RecordStore from './Containers/RecordStore';
import Profile from './Containers/Profile';
import HomePage from './Containers/HomePage';
import LogInForm from './Components/LogInForm';
import SignUpForm from './Components/SignUpForm';
import EditForm from './Components/EditForm';
import {URL} from './index';

class App extends React.Component {
  
  componentDidMount = () => {
    
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": 'Bearer ' + token
        }
      })
        .then(r => r.json())
        .then(returningUser => {
          this.props.returning(returningUser.user)
          this.props.setRecords()
          // this.props.setWishlist(returningUser.records)
        })
    }
  }

  signupSubmitHandler = (userObj) => {
    this.props.signup(userObj)
  }

  loginSubmitHandler = (userObj) => {
    this.props.login(userObj)
  }

  editSubmitHandler = (userObj) => {
    this.props.edit(userObj, this.props.user.id)
  }
  
  render () {

    return (
      
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/profile" render={(routerProps)=> {
            return(
              <Profile routerProps={routerProps} /> )
          }} />

          <Route path="/discogs-search"render={(routerProps)=> {
            return(
              <RecordDiscogsSearchContainer routerProps={routerProps} /> )
          }} />

          <Route path="/store" render={(routerProps) => {
            return (
              <RecordStore routerProps={routerProps} />)
          }} />

          <Route path="/login" render={(routerProps) => {
            return(
              <LogInForm  submitHandler={this.loginSubmitHandler} routerProps={routerProps}/> )
          }} />

          <Route path="/signup" render={(routerProps) =>{
            return(
              <SignUpForm submitHandler={this.signupSubmitHandler} routerProps={routerProps} /> )
          }} />

          <Route path='/edit' render={(routerProps) => {
            return(
              <EditForm submitHandler={this.editSubmitHandler} routerProps={routerProps} />
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
    records: state.records,
    wishlists: state.wishlists
  }
}

function mdp(dispatch){
  return{
    setRecords: () => dispatch(setRecords()),
    setWishlist: () => dispatch(setWishlist()),
    signup: (newUserObj) => dispatch(signupUser(newUserObj)),
    login: (userObj) => dispatch(loginUser(userObj)),
    returning: (userObj) => dispatch(returningUser(userObj)),
    edit: (userObj, userId) => dispatch(editUser(userObj, userId))
    
  }
}

export default connect(msp, mdp)(App);

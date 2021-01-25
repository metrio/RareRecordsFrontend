import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setRecords, setWishlist, loginUser, signupUser, returningUser, editUser, ownerReturning, loginOwner, setRecordStore } from './Redux/actions';
import NavBar from './Components/NavBar';
import RecordDiscogsSearchContainer from './Containers/RecordDiscogsSearchContainer';
import RecordStore from './Containers/RecordStore';
import Profile from './Containers/Profile';
import HomePage from './Containers/HomePage';
import LogInForm from './Components/LogInForm';
import SignUpForm from './Components/SignUpForm';
import EditForm from './Components/EditForm';
import {URL} from './index';
import RecordDetails from './Components/RecordDetails';
import OwnerLogInForm from './Components/OwnerLogInForm';
import OwnerProfile from './Containers/OwnerProfile';
import OwnerDiscogsSearch from './Containers/OwnerDiscogsSearch';

class App extends React.Component {
  
  componentDidMount = () => {
    
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    const owner = localStorage.getItem("owner")

    if(token && user){
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
        })
    } else if(token && owner) {
      fetch(`${URL}/owner-profile`, {
        method: "GET",
        headers: {
          "Authorization": 'Bearer ' + token
        }
      })
        .then(r => r.json())
        .then(ownerReturning => {
          this.props.ownerReturning(ownerReturning.owner)
          this.props.setRecords()
          this.props.setRecordStore()
        })
    }
  }


  ownerLoginHandler = (ownerObj) => {
    this.props.ownerLogin(ownerObj)
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

          <Route path="/owner-discogs-search"render={(routerProps)=> {
            return(
              <OwnerDiscogsSearch routerProps={routerProps} /> )
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
          <Route path='/records/:artist/:record_name/' render={(routerProps) => {
            return(
              <RecordDetails routerProps={routerProps}/>
            )
          }} />

          <Route path="/owner-profile" render={(routerProps)=> {
            return(
              <OwnerProfile routerProps={routerProps} /> )
          }} />

          <Route path="/owner" render={(routerProps) => {
            return(
              <OwnerLogInForm  submitHandler={this.ownerLoginHandler} routerProps={routerProps}/> )
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
    owner: state.owner,
    records: state.records,
    wishlists: state.wishlists,
    recordstore: state.recordstore
  }
}

function mdp(dispatch){
  return{
    setRecords: () => dispatch(setRecords()),
    setWishlist: () => dispatch(setWishlist()),
    signup: (newUserObj) => dispatch(signupUser(newUserObj)),
    login: (userObj) => dispatch(loginUser(userObj)),
    returning: (userObj) => dispatch(returningUser(userObj)),
    ownerLogin: (ownerObj) => dispatch(loginOwner(ownerObj)),
    ownerReturing: (ownerObj) => dispatch(ownerReturning(ownerObj)),
    edit: (userObj, userId) => dispatch(editUser(userObj, userId)),
    setRecordStore: ()=> dispatch(setRecordStore())
    
  }
}

export default connect(msp, mdp)(App);

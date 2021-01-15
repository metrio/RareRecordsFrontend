import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { addingtoWishlist } from './Redux/actions'
import RecordCard from './Components/RecordCard';
import SearchForm from './Components/SearchForm';

class App extends React.Component {
  
  state = {
    data: []
  }

  recordSearch = (searchObj) => {
    const token = process.env.REACT_APP_DISCOGS_API_KEY
    const artist = searchObj.artist_name
    const record = searchObj.record_name
    
    const url = `https://api.discogs.com/database/search?artist=${artist}&release_title=${record}&format=vinyl&token=${token}`

    this.componentDidMount(url)
  }

  componentDidMount = (url) => {
    fetch(`${url}`, {
      headers: {
          "Accepts": "application/json",
          "Content-Type": "application/json"
      }
    })
    .then(resp => resp.json())
    .then( query => {
      this.setState({data: query.results})
    })
  }

  submitAlbum = (details) => {

    console.log(store.wishlist)
      // props.addtoWishlist(details)
  }


  render () {
    const { data } = this.state

    return (
      
      <div className="App">
        <SearchForm submitHandler={this.recordSearch}/>
        {data.map(recordEl => <RecordCard key={recordEl.id} recordObj={recordEl} submitHandler={this.submitAlbum} />)}
      </div>
        
  )
  } 
}

function msp(state) {
  return {
    user: state.user,
    wishlist: state.wishlist
  }
}

function mdp(dispatch){
  return{
    addtoWishlist: () => dispatch(addingtoWishlist())
  }
}

export default connect(msp, mdp)(App);

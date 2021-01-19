import React from 'react';
import SearchForm from '../Components/SearchForm';
import RecordCard from '../Components/RecordCard';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { addtoWishlist, addtoRecords, setRecords } from '../Redux/actions'

class RecordDiscogsSearchContainer extends React.Component {

    state = {
        data: []
      }

  discogsRecordSearch = (searchObj) => {
    const token = process.env.REACT_APP_DISCOGS_API_KEY
    const artist = searchObj.artist_name
    const record = searchObj.record_name
    
    const url = `https://api.discogs.com/database/search?artist=${artist}&release_title=${record}&format=vinyl&token=${token}`

    this.componentDidMount(url)
  }

  componentDidMount = (url) => {
    fetch(`${url}`)
    .then(resp => resp.json())
    .then( query => {
      this.setState({data: query.results})
    })
  }

  /** Handles adding records to our backend to make sure that we have records in the backend */
  addtoRecords = (details)=> {
    this.props.addtoRecords(details)
  }

  /** Handles this function of adding to Wishlist */
  addtoWishlist = (userId, wishlistObj) => {
    this.props.addtoWishlist(userId, wishlistObj)  
  }
  
  /** Double Checks to see if we already have the record in the backend,
   * if it does then we just add right to the wishlist,
   * if not then we add to the backend then we add to our wishlist
   */
  submitAlbum = (details) => {
    const recordList = this.props.records
    const lastRecord = recordList.slice(-1)[0]
    const foundRecord = recordList.filter(recordEl => recordEl.discogs_id === details.discogs_id)
    const user = this.props.user

   
    if(foundRecord.length > 0){
        const wishlist = {
            discogs_id: details.discogs_id,
            record_id: foundRecord[0].id,
            notes: details.notes
          }
       this.addtoWishlist(user.id, wishlist)
            
    } else {
        let id = lastRecord.id + 1
        const user = this.props.user

        this.addtoRecords(details)
      

        const wishlist = {
            discogs_id: details.discogs_id,
            record_id: id,
            notes: details.notes
        }
       
        this.addtoWishlist(user.id, wishlist)
    }
  }  
   

  render () {
    const { data } = this.state

    return (
      
      <div className="Search-Container">
        <SearchForm  submitHandler={this.discogsRecordSearch}/>
        {data.map(recordEl => <RecordCard key={recordEl.id} recordObj={recordEl} submitHandler={this.submitAlbum} />)}
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
      addtoWishlist: (userId, wishlistObj) => dispatch(addtoWishlist(userId, wishlistObj)),
      addtoRecords: (details) => dispatch(addtoRecords(details)),
      setRecords: () => dispatch(setRecords())
    }
  }

export default connect(msp, mdp)(RecordDiscogsSearchContainer);
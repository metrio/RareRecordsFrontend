import React from 'react';
import SearchForm from '../Components/SearchForm';
import RecordCard from '../Components/RecordCard';
import { connect } from 'react-redux'
import { addtoWishlist, addtoRecords, newRecordWishlist, recordDetails} from '../Redux/actions'

class RecordDiscogsSearchContainer extends React.Component {

    constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        data: [],
        results: 0
      }
    }

  discogsRecordSearch = (searchObj) => {
    const token = process.env.REACT_APP_DISCOGS_API_KEY
    const artist = searchObj.artist_name
    const record = searchObj.record_name
    
    const url = `https://api.discogs.com/database/search?artist=${artist}&release_title=${record}&format=vinyl&token=${token}`

    this.fetchRecord(url)
  }


  fetchRecord = async (url) => {
    fetch(`${url}`)
      .then(resp => resp.json())
      .then( query => {
        console.log(query.pagination.items)
        const items = query.pagination.items

        this.setState({data: query.results , results: items})
      })
  }

  
  /** Double Checks to see if we already have the record in the backend,
   * if it does then we just add right to the wishlist,
   * if not then we add to the backend then we add to our wishlist
   */
  submitAlbum = (details) => {
    const recordList = this.props.records
    const foundRecordArray = recordList.filter(recordEl => recordEl.discogs_id === details.discogs_id)
    const user = this.props.user
   
    if(foundRecordArray.length > 0){

      foundRecordArray[0]["notes"] = details.notes
      foundRecordArray[0]["resource_url"] = details.resource_url
      foundRecordArray[0]["format"] = details.formats
      foundRecordArray[0]["catno"] = details.catno
      foundRecordArray[0]["label"] = details.label
      foundRecordArray[0]["country"] = details.country

      const foundRecord = foundRecordArray[0]
       
      this.props.addtoWishlist(user.id, foundRecord)
    } else {
       this.props.newRecordWishlist(user.id, details)
    }
  }  

  moreDetails = (recordObj) => {
    let location = this.props.routerProps.history
    const artist = recordObj.artist_name.replace(/\s+/g, '-')
    const album = recordObj.album_name.replace(/\s+/g, '-')
    
    location.replace(`/records/${artist}/${album}`)
    
    this.props.recordDetails(recordObj)
  }
   

  render () {
    const { data } = this.state

    return (
      <span className="search-page">
          <h1> {data.length > 0 ? data[0].title : null} </h1>

        <div className="Record-Container">
          {data.map(recordEl => <RecordCard key={recordEl.id} recordObj={recordEl} submitHandler={this.submitAlbum} moreDetails={this.moreDetails}/>)}
        </div>

        <div className="Search-Container">
          <h2>Number of Results: {this.state.results}</h2>
          <SearchForm  submitHandler={this.discogsRecordSearch}/>
        </div>
      </span>  
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
      addtoWishlist: (userId, record) => dispatch(addtoWishlist(userId, record)),
      addtoRecords: (details) => dispatch(addtoRecords(details)),
      newRecordWishlist: (userId, recordDetails) => dispatch(newRecordWishlist(userId, recordDetails)),
      recordDetails: (recordObj) => dispatch(recordDetails(recordObj))

    }
  }

export default connect(msp, mdp)(RecordDiscogsSearchContainer);
import React from 'react';
import SearchForm from '../Components/SearchForm';
import RecordCard from '../Components/RecordCard';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { addtoRecordStore, addtoRecords,  recordDetails, addtoRecordsAndRecordStore} from '../Redux/actions'
import OwnerRecordCard from '../Components/OwnerRecordCard';

class OwnerDiscogsSearchContainer extends React.Component {

    state = {
        data: [],
        results: 0
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
      console.log(query.pagination.items)
      const items = query.pagination.items

      this.setState({data: query.results , results: items})
    })
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
          {data.map(recordEl => <OwnerRecordCard key={recordEl.id} recordObj={recordEl} submitHandler={this.addtoRecordStore} moreDetails={this.moreDetails}/>)}
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
      owner: state.owner,
      records: state.records
    }
  }
  
  function mdp(dispatch){
    return{
      addtoRecordStore: (ownerObj, record) => dispatch(addtoRecordStore(ownerObj, record)),
      addtoRecords: (details) => dispatch(addtoRecords(details)),
      addtoRecordsAndRecordStore: (ownerObj, record) => dispatch(addtoRecordsAndRecordStore(ownerObj, record)),
      recordDetails: (discogs_id) => dispatch(recordDetails(discogs_id))

    }
  }

export default connect(msp, mdp)(OwnerDiscogsSearchContainer);
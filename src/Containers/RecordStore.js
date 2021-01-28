import React from 'react';
import { connect } from 'react-redux'
import { recordDetails } from '../Redux/actions'
import { Route, Switch } from 'react-router-dom';
import RecordStoreCard from '../Components/RecordStoreCards';
import RecordstoreRecordDetails from '../Components/RecordstoreRecordDetails';



class RecordStore extends React.Component {

    sortByArtist = () => {
      const sortedArtist = this.props.recordstore.sort(function(a, b){
        if(a.artist_name < b.artist_name) {return -1}
        if(a.artist_name > b.artist_name) {return 1}
        return 0
      })

      return sortedArtist
    }

    printArtist = () => {
      const sortedArtist = this.sortByArtist()
      const artistNamesOnly = sortedArtist.map(recordEl => recordEl.artist_name)
      let uniqArtist = []

      artistNamesOnly.forEach(artist => {
        if(!uniqArtist.includes(artist)){
          uniqArtist.push(artist)
        }
      })

      return uniqArtist.map(el => <li> { el } </li>)
         
    }
      
    moreDetails = (recordEl) => {
      this.props.recordDetails(recordEl)
      let location = this.props.routerProps.history
      const album = recordEl.album_name.replace(/\s+/g, '-')
    
      location.replace(`/record-store/records/${album}`)

    }

    


    displayRecords = () => {
      const sortedArtist = this.sortByArtist()

     return sortedArtist.map(recordEl => 
        <RecordStoreCard key={recordEl.id} recordEl={recordEl} moreDetails={this.moreDetails}/>
        )
    }

    render () {
      
        return (
          
           <Switch>

              <Route path='/record-store/records/:album' render={(routerProps) => {
                return(
              <RecordstoreRecordDetails routerProps={routerProps} />
                )
              }}/>


              <Route path='/record-store' render={() => {
                return(
                  <body className="record-store">

                      <div className="artist-list">
                        <h3>Artist</h3>
                        {this.printArtist()}
                      </div>

                      <div className="recordstore-wrapper">
                        <h1>Rare Records Store</h1>
                        {this.displayRecords()}
                      </div>
                  </body>
                  
                )
              }}/>
          </Switch>
         
            
        )
      } 
    }

    function msp(state) {
        return {
          user: state.user,
          owner: state.owner,
          records: state.records,
          recordstore: state.recordstore
        }
      }

      function mdp(dispatch){
        return{
          recordDetails: (recordObj) => dispatch(recordDetails(recordObj))
        }
      }

export default connect(msp, mdp)(RecordStore);
import React from 'react';
import { connect } from 'react-redux';


class RecordstoreRecordDetails extends React.Component {

    capitalize = (string) => {
        return (typeof string !== 'string' ? "" :  string.charAt(0).toUpperCase() + string.slice(1)) 
    }

    fromDiscogs = () => {
        const recordObj = this.props.details
  
        if(recordObj === undefined){
           return null
        } else {
            const stringBoolean = recordObj.official.toString()
            const capitlizieBoolean = this.capitalize(stringBoolean)

          return (
            <>
                
                <p className="description">
                    <h4>Description From Owner: </h4>
                    {recordObj.description}
                    <h5>Condition:</h5>
                    {recordObj.condition}
                </p>
                
                <div className="basic-info">
                    <div className="tracklist">
                        <h6>Tracklist:</h6>
                            {recordObj.tracklist.map(trackEl =><li key={trackEl.position}> <div key={trackEl.title} className="left" > {trackEl.title} </div>  <div className="right">  {trackEl.duration}</div> </li> )}
                    </div>
                   
                    <h6>Catalog No.</h6>
                        {recordObj.catno}
                    <h6>Country</h6>
                        {recordObj.country}
                    <h6>Year</h6>
                        {recordObj.year_of_release === undefined ? "No Year Entered" : recordObj.year_of_release}
                    <h6>Format</h6>
                        {recordObj.format}
                    <h6>Labels</h6>
                        {recordObj.label}
                    <h6>Official</h6>
                        {capitlizieBoolean}
                    {console.log(recordObj.official)}
                </div>
                
                </>
          )
        }
      }
  
     


    addtoWishlist = (e) => {
        e.preventDefault()

        const details = this.props.details
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



    render () {
        const details = this.props.details
        
        return (
            <body className="recordstorerecord-body">

            { details.tracklist === undefined

             ?
                <h1>Loading</h1>
             : 
                
                    <span className="recordstorerecord-details">
                        <div className="sidebanner">
                            <img src={details.img_url} alt={details.title} />
                        </div>

                        <div className="storerecord-details">
                            
                            <h2>{details.album_name} - {details.artist_name}</h2>
                         
                            <div className="record-details">
                                {this.fromDiscogs()}
                            </div>

                        </div>
                    </span>
                    
            }
            </body>

        )
    }
}


function msp(state){
    return{
        details: state.details,
        records: state.records,
        owner: state.owner
    }
}

export default connect(msp)(RecordstoreRecordDetails)


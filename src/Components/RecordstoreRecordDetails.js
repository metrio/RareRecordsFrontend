import React from 'react';
import { connect } from 'react-redux';


class RecordstoreRecordDetails extends React.Component {

    fromDiscogs = () => {
        const recordObj = this.props.details
  
        if(recordObj === undefined){
           return null
        } else {
          return (
            <>
                
                <p>
                    {recordObj.description}
                </p>
                
                <div className="basic-info">
                    <h6>Catalog No.</h6>
                        {recordObj.catno}
                    <h6>Country</h6>
                        {recordObj.country}
                    <h6>Year</h6>
                        {recordObj.year}

                    <h6>Format</h6>
                    {recordObj.format}

                    <h6>Labels</h6>
                    {recordObj.label}
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
        
        console.log(details)
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
                            <div>
                                <h3 className="title" >{details.album_name} - {details.artist_name}</h3>
                            </div>
                        
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


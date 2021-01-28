import React from 'react';
import { connect } from 'react-redux';


class RecordDetails extends React.Component {

    fromDiscogs = () => {
        const recordObj = this.props.details
  
        if(recordObj === undefined){
           return null
        } else {
          return (
            <>
                <div className="tracklist">
                    <h4>Tracklist</h4>
                    {this.tracklist(recordObj)}
                </div>

                <div className="basic-info">
                    <h6>Catalog No.</h6>
                        {this.catno(recordObj)}
                    <h6>Country</h6>
                        {this.country(recordObj)}
                    <h6>Year</h6>
                        {this.year(recordObj)}
                </div>

                <div className="label">
                    <h6>Labels</h6>
                    {this.label(recordObj)}
                </div>

                <div className="format-info">
                    <h6>Format</h6>
                    {this.format(recordObj)}
                </div>
                
                </>
          )
        }
      }
  
      tracklist = (recordObj) => {
          console.log(recordObj.tracklist)
        return recordObj.tracklist.map(trackEl =><li key={trackEl.position}> <div key={trackEl.title} className="left" > {trackEl.title} </div>  <div className="right">  {trackEl.duration}</div> </li> )
      }
  
      format = (recordObj) => {
        const format = recordObj.format
  
        if(typeof format === "object"){
          console.log("In format", format[0].name , format[0].descriptions, format[0].text)
          return (
            <>
            <li>Media Format: {format[0].name}</li>
            <li>Disc Color: {format[0].text}</li>
            {format[0].descriptions.map(ele => <li> { ele }</li>)}
            </>
          )
        }
      }
  
      catno = (recordObj) => {
          const catno = recordObj.catno
          return <li> { catno } </li>
      }
      
      label = (recordObj) => {
        const label = recordObj.label
       
  
        return label.map(ele => <li> { ele }</li>)
      }
  
  
      country = (recordObj) => {
        const country = recordObj.country
  
        return <li> { country } </li>
      }
  
      year = (recordObj) => {
        const year = recordObj.year_of_release
        console.log("In year", year)
  
        return <li> { year } </li>
      }

    addtoRecordStore = (e) => {
        e.preventDefault()
        const location = this.props.routerProps.history
        
        location.replace('/recorddetails-form')
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
            <body className="record-details">

            { details.tracklist === undefined

             ?
                <h1>Loading</h1>
             : 
                
                this.props.owner ? 

                    <span className="details">
                        <div className="first-details">
                        <img src={details.thumb_url} alt={details.title} />
                        <h3 className="title" >{details.album_name} - {details.artist_name}</h3>
                        </div>
                        
                        <button onClick={this.addtoRecordStore}>Add to RecordShop</button>

                        <div className="discog-details">
                            {this.fromDiscogs()}
                        </div>

                    </span>
                    
                :
                <>
                        {
                            this.props.user ?
                            
                    <>
                    <span className="details">
                        <div className="first-details">
                            <img src={details.thumb_url} alt={details.title} />
                            <h3 className="title">{details.album_name} - {details.artist_name} </h3>
                        </div>
                    

                        <div className="discog-details">
                            {this.fromDiscogs()}
                        </div>

                        <button onClick={this.addtoWishlist}>Add to Wishlist</button>
                    </span>
                    </>

                    :
                     <>       
                    <span className="details">
                        <div className="first-details">
                            <img src={details.thumb_url} alt={details.title} />
                            <h3 className="title">{details.album_name} - {details.artist_name} </h3>
                        </div>
                    

                        <div className="discog-details">
                            {this.fromDiscogs()}
                        </div>
                    </span>
                    </>
                        }
                </>
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

export default connect(msp)(RecordDetails)


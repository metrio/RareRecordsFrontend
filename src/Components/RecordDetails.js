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
        return recordObj.tracklist.map(trackEl => <li key={trackEl.position}> {trackEl.title}</li>)
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
        console.log("In label", label)
  
        return label.map(ele => <li> { ele }</li>)
      }
  
  
      country = (recordObj) => {
        const country = recordObj.country
        console.log("In country", country)
  
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




    render () {
        const details = this.props.details
        
        console.log(details)
        return (
            <>
            { details.length === 0

             ?
                <h1>Loading</h1>
             : 
                
                this.props.owner ? 
                    <span>
                        <img src={details.thumb_url} alt={details.title} />
                        <h3>{details.album_name} - {details.artist_name}</h3>
                        <h3>{console.log(this.props.details)}</h3>
                        
                        <button onClick={this.addtoRecordStore}>Add to RecordShop</button>

                        <div className="discog-details">
                            {this.fromDiscogs()}
                        </div>
                    </span>
                    
                :

                    <span>
                        <img src={details.thumb_url} alt={details.title} />
                        <h3>{details.album_name} - {details.artist_name}</h3>
                        
                        <h3>{console.log(this.props.details)}</h3>

                        <div className="discog-details">
                            {this.fromDiscogs()}
                        </div>
                    </span>
             
                
            }
            
            </>

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


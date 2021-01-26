import React from 'react'
import { connect } from 'react-redux'
import { addtoRecordStore, addtoRecords,  recordDetails, addtoRecordsAndRecordStore} from '../Redux/actions'

class RecordDetailForm extends React.Component {

    state = {
        album_name: "",
        artist_name: "",
        description: "",
        discogs_id: null,
        thumb_url: "",
        img_url: "",
        in_store: false,
        condition: "",
        year_of_release: "",
        format: "",
        catno: "",
        label: "",
        country: "",
        official: false,
        copies: null

    }

    componentDidMount = () => {
      const recordObj = this.props.details

      if(recordObj === undefined){
          return null
        } else {
          this.setState({
            album_name: recordObj.album_name,
            artist_name: recordObj.artist_name,
            discogs_id: recordObj.discogs_id,
            thumb_url: recordObj.thumb_url,
            img_url: recordObj.img_url,
            year_of_release: recordObj.year_of_release
          })
      }
    }
      

  

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


    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value})
    }

    booleanHandler = (e) => {
      this.setState({[e.target.name]: e.target.checked})
    }

    submitAlbum = (details) => {
        const recordList = this.props.records
        const foundRecordArray = recordList.filter(recordEl => recordEl.discogs_id === details.discogs_id)
        const owner = this.props.owner
       
        if(foundRecordArray.length > 0){
    
          foundRecordArray[0]["notes"] = details.notes
          foundRecordArray[0]["resource_url"] = details.resource_url
          foundRecordArray[0]["format"] = details.formats
          foundRecordArray[0]["catno"] = details.catno
          foundRecordArray[0]["label"] = details.label
          foundRecordArray[0]["country"] = details.country
    
          const foundRecord = foundRecordArray[0]
           
          this.props.addtoRecordStore(owner, foundRecord)
        } else {
           this.props.addtoRecordsAndRecordStore(owner, details)
        }
      }  

      submitRecordHandler = (e) => {
        e.preventDefault()

        {console.log(this.state)}
      }


    render() {
        return (
          <>
        
            <div className="discogs-details">
              <h4>From Discogs </h4>

              <img src={this.props.details.img_url} alt={this.props.details.album_name} />

             {this.fromDiscogs()}


            </div>
           
            <form onSubmit={this.submitRecordHandler} className="record-form" >
              <label for="artist_name"> Artist</label>
              <input type="text" id="artist_name" name="artist_name" value={this.state.artist_name} onChange={this.changeHandler}/>
              <br/>

              <label for="album_name">Album</label>
              <input type="text" id="album_name" name="album_name" value={this.state.album_name} onChange={this.changeHandler}/>
              <br/>

              <label for="description"> Description of Record</label>
              <textarea type="text" id="description" name="description" value={this.state.description} onChange={this.changeHandler}/>
              <br/>

              <label for="condition"> Condition of Record</label>
              <textarea type="text" id="condition" name="condition" value={this.state.condition} onChange={this.changeHandler}/>
              <br/>

              <label for="year_of_release">Year of Release</label>
              <input type="year" id="year_of_release" name="year_of_release" value={this.state.year_of_release} onChange={this.changeHandler}/>
              <br/>

              <label for="format">Format</label>
              <input type="text" id="format" name="format" value={this.state.label} onChange={this.changeHandler}/>
              <br/>

              <label for="catno">Catalog Number</label>
              <input type="text" id="catno" name="catno" value={this.state.catno} onChange={this.changeHandler}/>
              <br/>

              <label for="label">Record Label</label>
              <input type="text" id="label" name="label" value={this.state.label} onChange={this.changeHandler}/>
              <br/>

              <label for="country">Country of Release</label>
              <input type="year" id="country" name="country" value={this.state.country} onChange={this.changeHandler}/>
              <br/>

              <div className="boolean-inputs">
                <label for="official">Official Release?</label>
                <input type="checkbox" id="official" name="official" onClick={this.booleanHandler}/>

                <label for="in_store">In Store?</label>
                <input type="checkbox" id="in_store" name="in_store" onClick={this.booleanHandler}/>
              </div>
              <br/>


               {this.state.in_store ?
               <>
                  <label for="copies">Number of Copies in Store</label>
                  <input type="number" id="copies" name="copies" value={this.state.album_name} onChange={this.changeHandler}/>
               </>

              :
                null
               }

               <button>Submit Record</button>

            </form>
           </> 
        )
    }
}

function msp(state) {
  return {
    owner: state.owner,
    records: state.records,
    details: state.details
  }
}

function mdp(dispatch){
  return{

  }
}


export default connect(msp, mdp)(RecordDetailForm)
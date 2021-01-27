import React, { memo } from 'react'
import { connect } from 'react-redux'
import { exitDetails } from '../Redux/actions'


class RecordDetailForm extends React.Component{
  
  state = {
      album_name:  "" ,
      artist_name: "",
      description: "",
      discogs_id: "",
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
      copies: ""
      
    }

     static getDerivedStateFromProps = (props, state) => {

      if (props.detailsObj.discogs_id !== state.discogs_id) {
        return{
          album_name: props.detailsObj.album_name,
          artist_name: props.detailsObj.artist_name,
          discogs_id: props.detailsObj.discogs_id,
          thumb_url: props.detailsObj.thumb_url,
          img_url: props.detailsObj.img_url,
          year_of_release: parseInt(props.detailsObj.year_of_release)     
        }
      }
    }


    setDetails = memo(()=> {
      const recordObj = this.props.detailsObj
      this.setState({
        album_name: recordObj.album_name,
        artist_name: recordObj.artist_name,
        discogs_id: recordObj.discogs_id,
        thumb_url: recordObj.thumb_url,
        img_url: recordObj.img_url,
        year_of_release: parseInt(recordObj.year_of_release)     
      })
    })
  
    fromDiscogs = () => {
      const recordObj = this.props.detailsObj

      if(recordObj.tracklist === undefined){
       return null
      } else {
        return (
          <>
            <div className="tracklist">
              <h4>Tracklist</h4>
                {recordObj.tracklist.map(trackEl => <li key={trackEl.position}> {trackEl.title}</li>)}
            </div>

            <div className="basic-info">
              <h6>Catalog No.</h6>
                  <li> { recordObj.catno } </li>
              <h6>Country</h6>
                  <li> { recordObj.country } </li>
              <h6>Year</h6>
                   <li> { recordObj.year } </li>
            </div>

            <div className="label">
              <h6>Labels</h6>
                  { recordObj.label.map(ele => <li> { ele }</li>) }
            </div>

            <div className="format-info">
              <h6>Format</h6>
              <>
                <li>Media Format: {recordObj.format[0].name}</li>
                <li>Disc Color: {recordObj.format[0].text}</li>
                {recordObj.format[0].descriptions.map(ele => <li> { ele }</li>)}
              </>
            </div>
          </>
          
        )
      }
    }

    changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value})
    }

    booleanHandler = (e) => {
      this.setState({[e.target.name]: e.target.checked})
    }

    submitRecordHandler = (e) => {
      e.preventDefault()
      let location = this.props.routerProps.history
      const record = this.state
      
      location.replace(`/record-store`)
      this.submitAlbum(record)
    }

    componentWillUnmount = () => {
      this.props.exitDetails()
    }


    render() {
      const details = this.props.detailsObj
        return (
          <>
        {console.log("State ", this.state, "Details ", details)}
            <div className="discogs-details">
              <h4>From Discogs </h4>

              {details === undefined ? null : <img src={details.img_url} alt={details.album_name}/>}

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
              <input type="text" id="format" name="format" value={this.state.format} onChange={this.changeHandler}/>
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
                  <input type="number" id="copies" name="copies" value={this.state.copies} onChange={this.changeHandler}/>
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


function mdp(dispatch){
  return{
    exitDetails: () => dispatch(exitDetails())
  }
}

export default connect(null, mdp)(RecordDetailForm)
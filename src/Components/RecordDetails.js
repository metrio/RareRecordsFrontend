import React from 'react';
import { connect } from 'react-redux';


class RecordDetails extends React.Component {


    addtoRecordStore = (e) => {
        e.preventDefault()
        const location = this.props.routerProps.history
        
        location.replace('/recorddetails-form')
    }


    trackList = () => {
        const details = this.props.details
        const trackListArray = details.tracklist

        if (details.length === 0){

        } else {
            return trackListArray.map(trackEl => <li key={trackEl.position}> {trackEl.title}</li>)
        }

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

                        <div className="tracklist">
                            {this.trackList()}
                        </div>
                    </span>
                    
                :

                    <span>
                        <img src={details.thumb_url} alt={details.title} />
                        <h3>{details.album_name} - {details.artist_name}</h3>
                        <h3>{console.log(this.props.details)}</h3>

                        <div className="tracklist">
                            {this.trackList()}
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


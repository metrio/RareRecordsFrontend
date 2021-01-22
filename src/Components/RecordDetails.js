import React from 'react';
import { connect } from 'react-redux';



class RecordDetails extends React.Component {



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
        
        
        return (
            <>
            { details.length === 0

             ?
                <h1>Loading</h1>
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

function mdp(dispatch){
    return{

    }
}

function msp(state){
    return{
        details: state.details,
        records: state.records
    }
}

export default connect(msp, mdp)(RecordDetails)


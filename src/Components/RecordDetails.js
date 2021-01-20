import React from 'react';
import { connect } from 'react-redux';



class RecordDetails extends React.Component {



    trackList = () => {
        const trackListArray = this.props.details.tracklist

       return trackListArray.map(trackEl => <li key={trackEl.position}> {trackEl.title}</li>)
    }


    render () {
        const details = this.props.details
        const foundRecord = this.props.records.find(record => record.discogs_id === this.props.details.id)
        
        return (
            <>
            { details.length === 0
             ?
                <h1>Loading</h1>
             : 
             <span>
                 <img src={foundRecord.thumb_url} alt={this.props.details.title} />
                 <h3>{this.props.details.title} - {this.props.details.artists[0].name}</h3>
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


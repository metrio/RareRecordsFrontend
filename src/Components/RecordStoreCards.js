import React from 'react'

class RecordStoreCard extends React.Component{

    render () {
        return(
            <div>
                <h4>{this.props.recordEl.album_name}</h4>
                <h4>{this.props.recordEl.artist_name}</h4>
                <h4>{this.props.recordEl.description}</h4>
                <h4>{this.props.recordEl.condition}</h4>
                <h4>{this.props.recordEl.year_of_release}</h4>
                <h4>{this.props.recordEl.country}</h4>
                <h4>{this.props.recordEl.label}</h4>
                <h4>{this.props.recordEl.catno}</h4>
            </div>
            
        )
    }
}

export default RecordStoreCard
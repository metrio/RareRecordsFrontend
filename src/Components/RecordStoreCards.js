import React from 'react'

class RecordStoreCard extends React.Component{

    moreDetails = (e) => {
        e.preventDefault()

        this.props.moreDetails(this.props.recordEl)
    }

    render () {
        return(
            <div className="recordstore-card">
                <img src={this.props.recordEl.img_url} alt={`${this.props.recordEl.album_name} - ${this.props.recordEl.artist_name}`}/>
                
                <div className="recordstore-overlay">
                <h4>{this.props.recordEl.album_name} - {this.props.recordEl.artist_name}</h4>
                <button onClick={this.moreDetails}>More Details</button>
                </div>
                
                
                {/* 
                <h4>{this.props.recordEl.condition}</h4>
                <h4>{this.props.recordEl.year_of_release}</h4>
                <h4>{this.props.recordEl.country}</h4>
                <h4>{this.props.recordEl.label}</h4>
                <h4>{this.props.recordEl.catno}</h4> */}
            </div>
            
        )
    }
}

export default RecordStoreCard
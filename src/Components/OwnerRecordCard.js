import React from 'react'


class OwnerRecordCard extends React.Component {
    
    state = {
        condition: "",
        moreDetails: false
    }

    
    changeHandler = (e) => {
        this.setState({condition: e.target.value}) 
    }

    recordDetail = () => {
        const title = this.props.recordObj.title.split(" - ")
        const artist = title[0]
        const record_name = title[1]

        const record = this.props.recordObj

        const recordObj = {
            artist_name: artist,
            album_name: record_name,
            discogs_id: record.master_id,
            img_url: record.cover_image,
            thumb_url: record.thumb,
            year_of_release: parseInt(record.year),
            notes: this.state.condition,
            resource_url: record.resource_url,
            format: record.formats,
            catno: record.catno,
            label: record.label,
            country: record.country
        }

        return recordObj
    }

    moreDetails = (e) => {
        e.preventDefault()
        const recordObj = this.recordDetail
        
        this.props.moreDetails(recordObj)
    }

    addtoRecordStore = (e) => {
        e.preventDefault()

        const recordObj = this.recordDetail()
    }
   

  

    render(){
        const record = this.recordDetail()

        return(
            <div className="recordcard-div">
                <img src={record.img_url} alt={record.album_name} style={{width:'auto', height:'125px'}}/>
                <h6>Year of Release: {record.year_of_release}</h6>
                <button onClick={this.addtoRecordStore}>Add to Store</button>
                <button onClick={this.moreDetails}>More Details</button>
            </div>
        )
    }
}

export default OwnerRecordCard
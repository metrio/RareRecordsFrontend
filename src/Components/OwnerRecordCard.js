import React from 'react'


class OwnerRecordCard extends React.Component {
    
    state = {
        wishlist: false,
        condition: ""
    }

    wishlistHandler = (e) => {
        e.preventDefault()

        const prevState = this.state.wishlist
        this.setState({wishlist: !prevState})
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
        const recordObj = this.recordDetail()

        this.props.moreDetails(recordObj)
    }


    submitHandler = (e) => {
        e.preventDefault()
        const wishlistObj = this.recordDetail()

        this.props.submitHandler(wishlistObj)
    }

  

    render(){
        const record = this.recordDetail()

        return(
            <div className="-div">
                <img src={record.img_url} alt={record.album_name} style={{width:'auto', height:'125px'}}/>
                <h6>Year of Release: {record.year_of_release}</h6>
                <button onClick={this.wishlistHandler}>Want to add to Wishlist?</button>
                {this.state.wishlist 
                ? 
                <form onSubmit={this.submitHandler}>
                    <label>What condition would you like the record?</label>
                    <input type="text" name="condition" placeholder= "ie Mint, Fair, Near Mint" value={this.state.condition} onChange={this.changeHandler}/>
                    <button>Add to Wishlist</button>
                </form>
                
                : null}
                <button onClick={this.moreDetails}>More Details!</button>
            </div>
        )
    }
}

export default OwnerRecordCard
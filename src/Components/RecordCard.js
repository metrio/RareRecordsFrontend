import React from 'react'


class RecordCard extends React.Component {
    
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
        const prevState = this.state

        this.setState({condition: e.target.value}) 
        
    }


    submitHandler = (e) => {
        e.preventDefault()
        const title = this.seperateDetails()
        const artist = title[0]
        const record_name = title[1]
        const record = this.props.recordObj

        const wishlistObj = {
            artist_name: artist,
            record_name: record_name,
            discogs_id: record.master_id,
            img_url: record.cover_image,
            thumb_url: record.thumb,
            year_of_release: parseInt(record.year),
            condition: this.state.condition,
            resource_url: record.resource_url
        }

        this.props.submitHandler(wishlistObj)
    
    }

    seperateDetails = () => {
        const title = this.props.recordObj.title.split(" - ")
        
        return title
    }

    render(){
        const title = this.seperateDetails()
        const artist = title[0]
        const record_name = title[1]
        const record = this.props.recordObj

        return(
            <div className="recordCard-div">
                <h4>Artist: {artist}</h4>
                <h4>Record: {record_name}</h4>
                <img src={record.cover_image} alt={record.title} style={{width:'auto', height:'125px'}}/>
                <h6>Year of Release: {record.year}</h6>
                <button onClick={this.wishlistHandler}>Want to add to Wishlist?</button>
                {this.state.wishlist 
                ? 
                <form onSubmit={this.submitHandler}>
                    <label>What condition would you like the record?</label>
                    <input type="text" name="condition" placeholder= "ie Mint, Fair, Near Mint" value={this.state.condition} onChange={this.changeHandler}/>
                    <button>Add to Wishlist</button>
                </form>
                
                : null}
            </div>
        )
    }
}

export default RecordCard
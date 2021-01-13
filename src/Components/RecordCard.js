import React from 'react'


class RecordCard extends React.Component {

    submitHandler = (e) => {
        e.preventDefault()
    }

    render(){
        const title = this.props.recordObj.title.split(" - ")
        const artist = title[0]
        const record_name = title[1]
        const record = this.props.recordObj

        return(
            <div className="recordCard-div">
                <h4>Artist: {artist}</h4>
                <h4>Record: {record_name}</h4>
                <img src={record.cover_image} alt={record.title}/>
                <h6>Year of Release: {record.year}</h6>
                {console.log(this.props.recordObj)}
                <button onClick={this.submitHandler}>Add to Wishlist</button>
            </div>
        )
    }
}

export default RecordCard
import React from 'react'

class WishlistCard extends React.Component {

    submitHandler = (e) => {
        e.preventDefault()

        this.props.submitHandler(this.props.recordEl)
    }

    removeHandler = (e) => {
        e.preventDefault()

        this.props.removeHandler(this.props.recordEl)
    }

    render () {
        const recordEl = this.props.recordEl
        return(
            <div className="record-preview" key={recordEl.id}>
                <h4>Record:{recordEl.album_name}</h4>
                <h5>Artist:{recordEl.artist_name}</h5>

                <div>
                    <button onClick={this.submitHandler}>More Details!</button>
                    <button onClick={this.removeHandler}>Remove From Wishlist</button>
                </div>

                {}
      </div>
        )
    }
}

export default WishlistCard
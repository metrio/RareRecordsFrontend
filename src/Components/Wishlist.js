import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


class Wishlist extends React.Component {

  wishlistPreview = () => {
    const wishlistRecords = this.props.wishlists

    return wishlistRecords.map(recordEl => 
      <div className="record-preview" key={recordEl.id}>
        <h4>Record:{recordEl.album_name}</h4>
        <h5>Artist:{recordEl.artist_name}</h5>
        <button>More Details!</button>
      </div>
   )
  }



    render () {
      const user = this.props.user
    
        return (
          <>

          { user 
            ?
            <div className="wishlist">
              <h1>Your Wishlist!</h1>
              {this.wishlistPreview()}
            </div>
            :
            <h1>Loading</h1>
          }
          
          </>
            
        )
      } 
    }

    function msp(state) {
        return {
          user: state.user,
          wishlists: state.wishlists
        }
      }



export default connect(msp)(Wishlist);
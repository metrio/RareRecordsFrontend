import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import WishlistCard from '../Components/WishlistCards';
import { recordDetails, removeFromWishlist } from '../Redux/actions'


class Wishlist extends React.Component {

  state = {
    userWishlist: []
  }

  componentDidMount = () => {
    this.setState({userWishlist: this.props.user.wishlists})
  }

  moreDetails = (recordObj) => {
    let location = this.props.routerProps.history
    const artist = recordObj.artist_name.replace(/\s+/g, '-')
    const album = recordObj.album_name.replace(/\s+/g, '-')
    
    location.replace(`/records/${artist}/${album}`)
    
    this.props.recordDetails(recordObj.discogs_id)
  }

  removeFromWishlist = (record_id) => {
    const userWishlist = this.state.userWishlist

    if (userWishlist.length === 0){
      return null
    } else {
      const foundWishlist = userWishlist.find(wishlist => wishlist.record_id === record_id)
      this.props.removeFromWishlist(this.props.user.id, foundWishlist.id, record_id)
    }

    
  }

  wishlistPreview = () => {
    const wishlistRecords = this.props.wishlists

    return wishlistRecords.map(recordEl => <WishlistCard key={recordEl.id} recordEl={recordEl} submitHandler={this.moreDetails} removeHandler={this.removeFromWishlist}/>
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

    function mdp(dispatch){
      return{
        recordDetails: (discogs_id) => dispatch(recordDetails(discogs_id)),
        removeFromWishlist:  (userId, wishlistId, recordId) => dispatch(removeFromWishlist(userId, wishlistId, recordId))
      }
    }


export default connect(msp, mdp)(Wishlist);
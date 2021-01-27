import React from 'react';
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

  matchWishlistRecord = (recordObj) => {
    const userWishlist = this.state.userWishlist

    console.log(userWishlist)

    if (userWishlist.length === 0){
      return null
    } else {
      const foundWishlist = userWishlist.find(wishlist => wishlist.record_id === recordObj.id)
      return foundWishlist
    }
  }

  moreDetails = (recordObj) => {
    let location = this.props.routerProps.history
    const artist = recordObj.artist_name.replace(/\s+/g, '-')
    const album = recordObj.album_name.replace(/\s+/g, '-')
    
    location.replace(`/records/${artist}/${album}`)
    

    console.log("In Wishlist: ", recordObj)
    
    this.props.recordDetails(recordObj)
  }


  removeFromWishlist = (record) => {
    const foundWishlist = this.matchWishlistRecord(record)
    
    this.props.removeFromWishlist(this.props.user.id, foundWishlist.id, record.id)
  }

  wishlistPreview = () => {
    const wishlistRecords = this.props.wishlists

    return wishlistRecords.map(recordEl => <WishlistCard key={recordEl.id} recordEl={recordEl} submitHandler={this.moreDetails} removeHandler={this.removeFromWishlist} editWishlistObj={this.editWishlistObj}/>)
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
        recordDetails: (recordObj) => dispatch(recordDetails(recordObj)),
        removeFromWishlist:  (userId, wishlistId, recordId) => dispatch(removeFromWishlist(userId, wishlistId, recordId))
      }
    }


export default connect(msp, mdp)(Wishlist);
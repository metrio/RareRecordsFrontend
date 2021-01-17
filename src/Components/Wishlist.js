import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


class Wishlist extends React.Component {


   


    render () {
      
    
        return (
          
          <div className="wishlist-preview">
              {this.userWishlist()}
          </div>
            
        )
      } 
    }

    function msp(state) {
        return {
          user: state.user
        }
      }

    function mdp(dispatch){
        return {
            removeFromWishlist: (userId) => {dispatch(removeFromWishlist())}
        }
    }

export default connect(msp, mdp)(Wishlist);
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


class Wishlist extends React.Component {

  



    render () {
      
    
        return (

          
          <div>
            <h1>Wishlist!</h1>

          </div>
            
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
import React from 'react';
import SearchForm from '../Components/SearchForm';
import RecordCard from '../Components/RecordCard';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


class Wishlist extends React.Component {


    userrWishlist = () => {
        const userWishlist = this.props.wishlists
    }


    render () {
      
    
        return (
          
          <div>
            
             
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
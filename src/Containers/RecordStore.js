import React from 'react';
import SearchForm from '../Components/SearchForm';
import RecordCard from '../Components/RecordCard';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'


class RecordStore extends React.Component {



    render () {
      
    
        return (
          
          <div>
              <h1>Limited to One</h1>
              {console.log(this.props.records)}
          </div>
            
        )
      } 
    }

    function msp(state) {
        return {
          user: state.user,
          wishlists: state.wishlists,
          records: state.records
        }
      }

export default connect(msp)(RecordStore);
import React from 'react'
import { connect } from 'react-redux'
import Wishlist from '../Components/Wishlist'


class Profile extends React.Component {

    render() {
        return (
            <span className="profile">
                <h1> User Page</h1>
                <Wishlist />
            </span>
        )
    }

}

function msp(state){
    return { 
        user: state.user
    }
}

function mdp(dispatch){
    return {
        
    }
}

export default connect(msp, mdp)(Profile)
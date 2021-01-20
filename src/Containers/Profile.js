import React from 'react'
import { connect } from 'react-redux'
import Wishlist from './Wishlist'


class Profile extends React.Component {

    render() {
        const user = this.props.user
        return (
            <>
                { user ?
                    <span className="profile">
                        <h1>Welcome  {this.props.user.username}</h1>
                        <Wishlist routerProps={this.props.routerProps} />
                    </span>
                  : <h1>Loading</h1> }
        </>
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
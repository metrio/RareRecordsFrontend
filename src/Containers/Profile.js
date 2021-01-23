import React from 'react'
import { connect } from 'react-redux'
import Wishlist from './Wishlist'
import { deleteUser } from '../Redux/actions'


const Profile = (props) => {

    const deleteHandler = () => {
        let location = props.routerProps.history
        location.replace("/")
        props.deletingUser(props.user.id)
    }

    const editHandler = () => {
        let location = props.routerProps.history
        location.replace("/edit")
    }

   
        const user = props.user

        return (
            <>
                { user ?
                    <span className="profile">
                        <div className="user-info">
                            <h1>Welcome  {props.user.username}</h1>
                            <h3>{props.user.email}</h3>
                            <h4>{props.user.phone}</h4>
                            <button onClick={editHandler} >Edit Account Info</button>
                        </div>
                        <Wishlist routerProps={props.routerProps} />
                        <div className="account-buttons">
                            <button onClick={deleteHandler} >Delete Account</button>
                        </div>
                    </span>
                  : <h1>Loading</h1> }
        </>
        )
    }


function msp(state){
    return { 
        user: state.user
    }
}

function mdp(dispatch){
    return {
        deletingUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(msp, mdp)(Profile)
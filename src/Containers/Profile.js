import React from 'react'
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

export default Profile
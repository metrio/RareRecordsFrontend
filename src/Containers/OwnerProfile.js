import React from 'react'
import { connect } from 'react-redux'



const OwnerProfile = (props) => {

    
        const owner = props.owner

        return (
            <>
                { owner 
                
                  ?
                    <span className="profile">
                            <h1>Welcome  {props.owner.username}</h1>
                    </span>
                  : 
                    <h1>Loading</h1> 
                  }
        </>
        )
    }


function msp(state){
    return { 
        owner: state.owner
    }
}

function mdp(dispatch){
    return {
       
    }
}

export default connect(msp, mdp)(OwnerProfile)
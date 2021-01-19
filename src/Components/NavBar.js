import React from 'react'
import  RareRecords from '../assets/RareRecords.png'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loggingOut } from '../Redux/actions'

const NavBar = (props) => {
    

        return(
            <div className="nav-bar">

                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit'}} > 
                    <div className="nav-logo">
                    <img src={RareRecords} alt="Rare Records"/>
                    <h2>Rare<br />Records</h2>
                    </div>
                </NavLink>

                <div className="button-div">
                
                <NavLink to="/store" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Rare Records Store</button> 
                </NavLink>

                <NavLink to="/discogs-search" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Discogs Search</button> 
                </NavLink>

            
                {props.user ? 
                <>
                    <NavLink to="/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                        <button>Profile</button>
                    </NavLink>

                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <button onClick={()=> {
                        localStorage.removeItem("token")
                        props.logOut()
                        }} >Log Out </button>
                    </NavLink> 
                </>  

                :
                <>
                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                        <button>Log In</button>
                    </NavLink>
            
                    <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <button>Sign Up</button>
                    </NavLink>   
                </>
                }
                    
                    
                </div>
            </div>
        )

    }


function msp(state){
    return { user: state.user }
}

function mdp(dispatch){
    return {
        logOut: () => dispatch(loggingOut())
    }
}

export default connect(msp, mdp)(NavBar)
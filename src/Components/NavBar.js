import React from 'react'
import  RareRecords from '../assets/RareRecords.png'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    
        return(
            <div className="nav-bar">

                <div className="nav-logo">
                <img src={RareRecords} alt="Rare Records"/>
                <h2>Rare<br />Records</h2>
                </div>

                <div className="button-div">

                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit'}} > 
                    <button>Home</button> 
                </NavLink>
                
                <NavLink to="/store" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Rare Records Store</button> 
                </NavLink>


                <NavLink to="/discogs-search" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Discogs Search</button> 
                </NavLink>

                <NavLink to="/profile/wishlist" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Wishlist</button> 
                </NavLink>
                    
                </div>
            </div>
        )
    }


function msp(state){
    return { user: state.user }
}

function mdp(dispatch){
    return {
        
    }
}

export default connect(msp, mdp)(NavBar)
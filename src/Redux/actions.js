import { ADD_TO_WISHLIST , REMOVE_FROM_WISHLIST, ADD_TO_RECORDS, UPDATE_RECORD_DETAILS , SET_RECORDS, SET_WISHLIST, SIGN_UP, LOG_IN, DELETE_USER, EDIT_USER, LOG_OUT} from './actionTypes'
import {URL} from '../index'

export function addtoWishlist(userId, wishlist) {
    return function (dispatch, getState) {

        let wishlistId = localStorage.getItem("wishlistId")
        
            fetch(`${URL}/users/${userId}/wishlists/`, {
                method: "POST",
                headers: {
                    "Accepts": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    discogs_id: wishlist.discogs_id,
                    record_id: wishlist.record_id,
                    notes: wishlist.notes
                })
            })
            .then(r => r.json())
            .then(wishlistObj => {
                dispatch({type: ADD_TO_WISHLIST, payload: wishlistObj})
            })
        }
}

export function setWishlist(userId) {
    return function (dispatch, getState){
        fetch(`${URL}/users/${userId}/wishlists`,{
            method: "GET",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(r=> r.json())
            .then( wishlists => {
               localStorage.setItem("wishlistId", wishlists.id)
               dispatch({type: SET_WISHLIST, payload: wishlists})
           })

    }
}

export function setRecords() {
    return function (dispatch, getState){
        fetch(`${URL}/records`,{
            method: "GET",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(r=> r.json())
            .then(records => {
               localStorage.setItem("recordId", records.id)
              return dispatch({type: SET_RECORDS, payload: records})
           })
        
    }
}
        

export function addtoRecords(recordObj) {
    return function (dispatch, getState) {

        fetch(`${URL}/records`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                album_name: recordObj.record_name,
                artist_name: recordObj.artist_name,
                discogs_id: recordObj.discogs_id,
                thumb_url: recordObj.thumb_url,
                img_url: recordObj.img_url,
                year_of_release: recordObj.year_of_release
            })
        })
        .then(r => r.json())
        .then(record => {
            return dispatch({type: ADD_TO_RECORDS, payload: record})
        })
        
    }
}

export function signUUser(userObj) {
    return function (dispatch, getState) {
        fetch(`${URL}/users`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(newUserObj => {
                localStorage.setItem("token", newUserObj.jwt)
                dispatch({type: SIGN_UP, payload: newUserObj.user})
            })
            .catch(console.log)
    }
}

export function logInUser(userObj) {
    return function(dispatch, getState){
        fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(checkedUserObj => {
                localStorage.setItem("token", checkedUserObj.jwt)
                dispatch({type: LOG_IN, payload: checkedUserObj.user})
            })
            .catch(console.log)
    }
}

export function returningUser(userObj) {
    return {type: RETURNING, payload: userObj}
}

export function deleteUser(userId){
    return function (dispatch){
        fetch(`${URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(r=>r.json())
        .then(response => {
            console.log(response)
            localStorage.clear()
            dispatch({type: DELETE_USER})
        })
    }
}

export function editUser(userObj, userId){
    return function (dispatch){
        fetch(`${URL}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ user: userObj })
        })
        .then(r=>r.json())
        .then(returnedUser => {
            console.log(returnedUser)
            dispatch({type: EDIT_USER, payload: returnedUser.user})
        })
    }
}

export function logOut(){
    return { type: LOG_OUT}
}
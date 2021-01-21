import { ADD_TO_WISHLIST , REMOVE_FROM_WISHLIST, ADD_TO_RECORDS, UPDATE_RECORD_DETAILS , SET_RECORDS, SET_WISHLIST, LOG_IN, SIGN_UP, LOG_OUT, RETURNING, DELETE_USER, EDIT_USER, RECORD_DETAILS} from './actionTypes'
import {URL} from '../index'


export function loginUser(userObj) {
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


export function signupUser(userObj) {
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

  export function returningUser(userObj) {
    const wishlistRecords = userObj.records
    return dispatch => {
        dispatch({type: RETURNING, payload: userObj}) 
        dispatch(setWishlist(wishlistRecords))
        }
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

export function loggingOut(){
  return { type: LOG_OUT}
}

 export function newRecordWishlist (userId, recordObj) {
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
             return dispatch => {
                 console.log("Before adding notes",record)
                 dispatch({type: ADD_TO_RECORDS, payload: record})

                 record["notes"] = recordObj.notes
                 console.table("In newRecordWishlist Dispatch", record)
                 dispatch(addtoWishlist(userId, record))
             }
        })
     }
} 


export function addtoWishlist(userId, recordDetails) {
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
                    discogs_id: parseInt(recordDetails.discogs_id) ,
                    record_id: parseInt(recordDetails.id),
                    notes: recordDetails.notes
                })
            })
            .then(r => r.json())
            .then(wishlistObj => {
                console.log(recordDetails)
                dispatch({type: ADD_TO_WISHLIST, payload: recordDetails})
            })
        }
    }

export function removeFromWishlist(userId, wishlistId, recordId) {
    return function(dispatch, getState) {
        fetch(`${URL}/users/${userId}/wishlists/${wishlistId}`, {
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            dispatch({type: REMOVE_FROM_WISHLIST, payload: recordId})
            console.log(resp)
        })
    }
}

export function setWishlist(wishlistRecords) {
    return function (dispatch, getState){
            dispatch({type: SET_WISHLIST, payload: wishlistRecords})
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

export function recordDetails(discogs_id) {

    return function (dispatch, getState){
       const token = process.env.REACT_APP_DISCOGS_API_KEY
        fetch(`https://api.discogs.com/masters/${discogs_id}`)
        .then(resp => resp.json())
        .then(details => {
            console.log(details)
            return dispatch({type: RECORD_DETAILS, payload: details})
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


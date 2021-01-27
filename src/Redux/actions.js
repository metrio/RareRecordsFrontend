import { ADD_TO_WISHLIST , REMOVE_FROM_WISHLIST, ADD_TO_RECORDS, UPDATE_RECORD_DETAILS , SET_RECORDS, SET_WISHLIST, LOG_IN, SIGN_UP, LOG_OUT, RETURNING, DELETE_USER, EDIT_USER, RECORD_DETAILS, OWNER_LOG_IN, RETURNING_OWNER, OWNER_LOG_OUT, SET_RECORDSTORE, ADD_TO_RECORDSTORE, UPDATE_RECORDSTORE, EXIT_DETAILS} from './actionTypes'
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
              localStorage.setItem("user", checkedUserObj.user)   

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
                 album_name: recordObj.album_name,
                 artist_name: recordObj.artist_name,
                 discogs_id: parseInt(recordObj.discogs_id),
                 thumb_url: recordObj.thumb_url,
                 img_url: recordObj.img_url,
                 year_of_release: parseInt(recordObj.year_of_release)
             })
         })
         .then(r => r.json())
         .then(record => {
            record["notes"] = recordObj.notes
            record["resource_url"] = recordObj.resource_url
            record["format"] = recordObj.formats
            record["catno"] = recordObj.catno
            record["label"] = recordObj.label
            record["country"] = recordObj.country

            dispatch(addtoRecordsaddtoWishlist(userId, record))
        })
     }
} 

export function addtoRecordsaddtoWishlist(userId, record){
    return dispatch => {
        dispatch({type: ADD_TO_RECORDS, payload: record})
        dispatch(addtoWishlist(userId, record))
    }
}


export function addtoWishlist(userId, recordDetails) {
    return function (dispatch, getState) {        
            fetch(`${URL}/users/${userId}/wishlists/`, {
                method: "POST",
                headers: {
                    "Accepts": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: parseInt(userId) ,
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
            .then(r => r.json())
            .then(records => {
              return dispatch({type: SET_RECORDS, payload: records})
           })
        
    }
}

export function recordDetails(recordObj) {

    return function (dispatch, getState){

        fetch(`https://api.discogs.com/masters/${recordObj.discogs_id}`)
        .then(resp => resp.json())
        .then(details => {
            recordObj["tracklist"] = details.tracklist
            return dispatch({type: RECORD_DETAILS, payload: recordObj})
        })
    }
}

export function exitDetails() {
    return ({type: EXIT_DETAILS})
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
                 discogs_id: parseInt(recordObj.discogs_id),
                 thumb_url: recordObj.thumb_url,
                 img_url: recordObj.img_url,
                 year_of_release: parseInt(recordObj.year_of_release)
            })
        })
        .then(r => r.json())
        .then(record => {
                 record["notes"] = recordObj.notes
                 record["resource_url"] = recordObj.resource_url
                 record["format"] = recordObj.formats
                 record["catno"] = recordObj.catno
                 record["label"] = recordObj.label
                 record["country"] = recordObj.country
            return dispatch({type: ADD_TO_RECORDS, payload: record})
        })
        
    }
}

export function loginOwner(ownerObj) {
    return function(dispatch, getState){
        fetch(`${URL}/owner-login`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ owner: ownerObj })
        })
            .then(r => r.json())
            .then(checkedOwnerObj => {
                localStorage.setItem("token", checkedOwnerObj.jwt)  
                localStorage.setItem("owner", checkedOwnerObj.owner)  

                dispatch({type: OWNER_LOG_IN, payload: checkedOwnerObj.owner})
  
            })
            .catch(console.log)
    }
  }

export function ownerReturning(ownerObj) {
    return dispatch => {
        dispatch({type: RETURNING_OWNER, payload: ownerObj}) 
        }
    } 

export function ownerlogOut(){
    return { type: OWNER_LOG_OUT}
}

export function setRecordStore(){
    return function(dispatch, getState){
        fetch(`${URL}/record_stores`,{
            method: "GET",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(r => r.json())
        .then(recordStoreObj => {
            dispatch({type: SET_RECORDSTORE, payload: recordStoreObj.records})
        })
    }
}

/** Doesn't Exist in backend,
 * add to Records, then add to RecordStoreRecords,
 * Update FrontEnd Records and RecordStore
 */
export function addtoRecordsAndRecordStore(ownerObj, recordObj){
    return function (dispatch, getState) {
        
        fetch(`${URL}/records`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                album_name: recordObj.album_name,
                artist_name: recordObj.artist_name,
                catno: recordObj.catno,
                condition: recordObj.condition,
                country: recordObj.country,
                description: recordObj.description,
                discogs_id: parseInt(recordObj.discogs_id),
                format: recordObj.format,
                label: recordObj.label,
                official: recordObj.official,
                thumb_url: recordObj.thumb_url,
                img_url: recordObj.img_url,
                year_of_release: parseInt(recordObj.year_of_release)
            })
        })
        .then(r => r.json())
        .then(record => {
            dispatch(finishAddtoStore(ownerObj, record))
       })
    }
}

/**Now record exists in backend, add to RecordStoreRecords,
 * update Both Records and RecordStore with new record
 */
export function finishAddtoStore(ownerObj, record){
    return dispatch => {
        dispatch({type: ADD_TO_RECORDS, payload: record})
        dispatch({type: ADD_TO_RECORDSTORE, payload: record})
        dispatch(addtoRecordstoreRecords(ownerObj, record))
    }
}

/**Record Already Exists in backend 
 * so we will update it first
*/
export function updateBackendRecords(owner, recordObj){
    return function(dispatch, getState){
        fetch(`${URL}/records/${recordObj.id}`, {
            method: "PATCH",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parseInt(recordObj.id),
                album_name: recordObj.album_name,
                artist_name: recordObj.artist_name,
                catno: recordObj.catno,
                condition: recordObj.condition,
                country: recordObj.country,
                description: recordObj.description,
                discogs_id: parseInt(recordObj.discogs_id),
                format: recordObj.format,
                label: recordObj.label,
                official: recordObj.official,
                thumb_url: recordObj.thumb_url,
                img_url: recordObj.img_url,
                year_of_release: parseInt(recordObj.year_of_release)
            })
        })
        .then(r => r.json())
        .then(record => {        
            dispatch(finishUpdateAndAdd(owner, record))
        })
    }
}

/**Finish Send Request to add a new RecordstoreRecord,
 * Update Frontend Records, Add to Front End RecordStore
*/
export function finishUpdateAndAdd(ownerObj, recordObj){
    return dispatch => {
        
        dispatch({type: UPDATE_RECORD_DETAILS, payload: recordObj})
        dispatch({type: ADD_TO_RECORDSTORE, payload: recordObj})
        dispatch(addtoRecordstoreRecords(ownerObj, recordObj))
    }
}


//Add to backend RecordstoreRecords
export function addtoRecordstoreRecords(owner, record){
    return function(dispatch, getState){
        fetch(`${URL}/record_stores/${owner.record_store.id}/recordstore_records`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                record_store_id: parseInt(owner.record_store.id),
                discogs_id: parseInt(record.discogs_id),
                record_id: parseInt(record.id)
            })
        })
        .then(r => r.json())
        .then(recordstoreRecordObj => {
            console.log(recordstoreRecordObj)
        })
    }
}



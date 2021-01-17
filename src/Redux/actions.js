import { ADD_TO_WISHLIST , REMOVE_FROM_WISHLIST, ADD_TO_RECORDS, UPDATE_RECORD_DETAILS , SET_RECORDS, SET_WISHLIST} from './actionTypes'
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


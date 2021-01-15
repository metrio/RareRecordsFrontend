import { ADD_TO_WISHLIST ,REMOVE_FROM_WISHLIST, ADD_TO_RECORDS, UPDATE_RECORD_DETAILS , SET_RECORDS, SET_WISHLIST} from './actionTypes'
import {URL} from '../index'

export function addingtoWishlist(userId, recordObj) {
    return function (dispatch, getState) {

        let recordId = localStorage.getItem("recordId")
        
            fetch(`${URL}/users/${2}/wishlists/`, {
                method: "POST",
                headers: {
                    "Accepts": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: 2,
                    discogs_id: recordObj.discogs_id,
                    record_id: recordId,
                    condition: recordObj.condition
                })
            })
            .then(r => r.json())
            .then(updatedWishlist => {
                dispatch({type: ADD_TO_WISHLIST, payload: updatedWishlist})
            })
        }
}

export function setWishlist(userId) {
    return function (dispatch, getState){
        fetch(`${URL}/users/${2}/wishlists`,{
            method: "GET",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json"
            }
            .then(r=> r.json())
           .then( wishlists => {
               localStorage.setItem("wishlistId", wishlists.id)
               dispatch({SET_WISHLIST, payload: wishlists})
           })
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
            .then(r=> r.json())
           .then( records => {
               localStorage.setItem("wishlistId", wishlists.id)
               dispatch({SET_RECORDS, payload: records})
           })
        })
    }
}
        

export function addtoRecords(recordObj) {
    return function (dispatch, getState) {

        let recordId

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
        .then(newRecord => {recordId = newRecord.id })
    }
}
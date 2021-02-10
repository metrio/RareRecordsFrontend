export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST"
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST"
export const SET_WISHLIST = "SET_WISHLIST"

export const SET_RECORDS = "SET_RECORDS"
export const ADD_TO_RECORDS = "ADD_TO_RECORDS"
export const UPDATE_RECORD_DETAILS = "UPDATE_RECORD_DETAILS"
export const RECORD_DETAILS = "RECORD_DETAILS"
export const EXIT_DETAILS = "EXIT_DETAILS" 

export const SET_RECORDSTORE = "SET_RECORDSTORE"
export const ADD_TO_RECORDSTORE = "ADD_TO_RECORDSTORE"
export const UPDATE_RECORDSTORE = "UPDATE_RECORDSTORE"

export const SIGN_UP = "SIGN_UP"
export const LOG_IN =  "LOG_IN"
export const RETURNING = "RETURNING"
export const DELETE_USER = "DELETE_USER"
export const EDIT_USER = "EDIT_USER"
export const LOG_OUT = "LOG_OUT"

export const OWNER_LOG_IN =  "OWNER_LOG_IN"
export const RETURNING_OWNER = "RETURNING_OWNER"
export const OWNER_LOG_OUT = "OWNER_LOG_OUT"

// i fucking hate redux lol
// for this you can also do 
// export {SET_RECORDS, ADD_TO_RECORDS, etc.}
// another option is to just make this one object, so:
// const actionTypes = {
    //  SET_RECORDS: "SET_RECORDS",
    // etc.
// }
// or even better: 
// const recordActionTypes = {
   // SET_RECORDS: "SET_RECORDS",
   // etc
// }
// const authACtionTypes = {
    // blah
// }
// and then you can just export it as:
// export default actionTypes (for method 1)
// export {recordActionTypes, authActionTypes, etc}

// THEN when you go to import it, instead of that crazy list you can just do:
// (method 1) import actionTypes from 'actionTypes'
// and use accordinginly: dispatch(actionTypes.SET_RECORDS, "blah")
// (method 2) import {recordActionTypes} from 'actionTypes'
// use: dispatch(recordActionTypes.SET_RECORDS, "blah")
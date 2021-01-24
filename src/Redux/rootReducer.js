import {combineReducers} from 'redux'

const defaultState = {
    user: null,
    owner: null,
    wishlists: [],
    details: [],
    records: []
}

function userReducer(prevState = defaultState.user, action){
    switch(action.type){
        case "SIGN_UP":
            return action.payload
        case "LOG_IN":
            return action.payload
        case "RETURNING":
            return action.payload
        case "DELETE_USER":
            return action.payload
        case "EDIT_USER":
            return action.payload
        case "LOG_OUT":
            return null
        default:
            return prevState
    }
}

function ownerReducer(prevState = defaultState.owner, action){
    switch(action.type){
        case "OWNER_LOG_IN":
            return action.payload
        case "RETURNING_OWNER":
            return action.payload
        case "OWNER_LOG_OUT":
            return null
        default:
            return prevState
    }
}


function wishlistReducer(prevState = defaultState.wishlists, action){
    switch(action.type) {
        case "SET_WISHLIST":
            return action.payload
        case "ADD_TO_WISHLIST":
            return [...prevState, action.payload]
        case "REMOVE_FROM_WISHLIST":
            return prevState.filter(wishlistRecord => wishlistRecord.id !== action.payload)
        default:
            return prevState
    }
}


function recordReducer(prevState = defaultState.records, action){
    switch(action.type){
        case "SET_RECORDS":
            return action.payload
        case "ADD_TO_RECORDS":
            return [...prevState, action.payload]
        case "UPDATE_RECORD_DETAILS":
            return action.payload
        default:
            return prevState
    }
}

function detailsReducer(prevState = defaultState.details, action){
    switch(action.type){
        case "RECORD_DETAILS":
            return action.payload
        default:
            return prevState
    }
}



const rootReducer = combineReducers({
    user: userReducer,
    owner: ownerReducer,
    wishlists: wishlistReducer,
    details: detailsReducer,
    records: recordReducer
})

export default rootReducer
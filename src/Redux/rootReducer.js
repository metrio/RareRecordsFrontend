import {combineReducers} from 'redux'

const defaultState = {
    wishlist: null,
    records: {}
}

function userReducer(prevState = defaultState.user, action){
    switch(action.type){
        case "SIGNUP":
            return action.payload
        case "LOGIN":
            return action.payload
        case "RETURNING":
            return action.payload
        case "DELETE_USER":
            return action.payload
        case "EDIT_USER":
            return action.payload
        case "LOGGING_OUT":
            return null
        default:
            return prevState
    }
}

function ownerReducer(prevState = defaultState.owner, action){
    switch(action.type){
        case "LOGIN":
            return action.payload
        case "RETURNING":
            return action.payload
        case "EDIT_USER":
            return action.payload
        case "LOGGING_OUT":
            return null
        default:
            return prevState
    }
}

function wishlistReducer(prevState = defaultState.wishlist, action){
    switch(action.type) {
        case "SET_WISHLIST":
            return action.payload
        case "ADD_TO_WISHLIST":
            return action.payload
        case "REMOVE_FROM_WISHLIST":
            return action.payload    
        default:
            return prevState
    }
}

function recordReducer(prevState = defaultState.records, action){
    switch(action.type){
        case "SET_WISHLIST":
            return action.payload
        case "ADD_TO_RECORDS":
            return action.payload
        case "UPDATE_RECORD_DETAILS":
            return action.payload
        default:
            return prevState
    }
}



const rootReducer = combineReducers({
    wishlists: wishlistReducer,
    records: recordReducer
})

export default rootReducer
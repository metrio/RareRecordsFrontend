import {combineReducers} from 'redux'

const defaultState = {
    user: null,
    owner: null,
    wishlists: [],
    records: []
}

function userReducer(prevState = defaultState.user, action){
    switch(action.type){
        case "SIGN_UP":
            console.log(action.payload)
            return action.payload
        case "LOG_IN":
            console.log(action.payload)
            return action.payload
        case "RETURNING":
            console.log(action.payload)
            return action.payload
        case "DELETE_USER":
            console.log(action.payload)
            return action.payload
        case "EDIT_USER":
            console.log(action.payload)
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
            return action.payload    
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



const rootReducer = combineReducers({
    user: userReducer,
    owner: ownerReducer,
    wishlists: wishlistReducer,
    records: recordReducer
})

export default rootReducer
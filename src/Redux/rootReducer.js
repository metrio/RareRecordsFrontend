import {combineReducers} from 'redux'

const defaultState = {
    user: null,
    owner: null,
    wishlists: [],
    details: [],
    records: [],
    recordstore: []
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
            // https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75
            // tl;dr let is for reassigning values, const is for permenant values 
            // more often than not you don't need to use let unless you need to have access to a variable and/or set a variable out of scope
            // ex: (this is highly dumb)
            // const myFunc = () => {
                // let myNum;
                // const nums = [1, 2, 3, 4]
                // nums.forEach((num) => {
                        // if (num === 4) {
                            // myNum = num
                        // }
                // })
                // return myNum
            // }

            // so you long story short you shouldn't use let here
            // in fact you don't even need a variable at all since map returns an array 
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            // https://www.youtube.com/watch?v=bCqtb-Z5YGQ <= his youtube channel is no longer, but really good content on there and he's fun

            // so anyways here i would do:
            // return prevState.map(blah blhalh)
           let newArray = prevState.map((recordEl) => {
                    if(recordEl.discogs_id === action.payload.discogs_id){
                        return {
                            ...recordEl,
                            ...action.payload
                        }
                    } else {
                        return recordEl
                    }
                })
            return newArray  
        default:
            return prevState
    }
}

function detailsReducer(prevState = defaultState.details, action){
    switch(action.type){
        case "RECORD_DETAILS":
            return action.payload
        case "EXIT_DETAILS":
            return []
        default:
            return prevState
    }
}

function recordstoreReducer(prevState = defaultState.recordstore, action){
    switch(action.type){
        case "SET_RECORDSTORE":
            return action.payload
        case "ADD_TO_RECORDSTORE":
            return [...prevState, action.payload]
        case "UPDATE_RECORDSTORE":
            // see prev note
            let newArray = prevState.map((recordEl) => {
                if(recordEl.discogs_id === action.payload.discogs_id){
                    return {
                        ...recordEl,
                        ...action.payload
                    }
                } else {
                    return recordEl
                }
            })
        return newArray  
        default:
            return prevState
    }
}




const rootReducer = combineReducers({
    user: userReducer,
    owner: ownerReducer,
    wishlists: wishlistReducer,
    details: detailsReducer,
    records: recordReducer,
    recordstore: recordstoreReducer
})

export default rootReducer
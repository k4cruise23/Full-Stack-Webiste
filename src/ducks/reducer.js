const initialState = {
    user: {},
    allPosts: [],
    currentPost: {}
}

const ADD_USER = 'ADD_USER'
const SEARCH_USERS = 'SEARCH_USERS'
const SELECT_POST = 'SEARCH_POST'
const UPDATE_POSTS = 'UPDATE_POSTS'
const RELOAD_USER = 'RELOAD_USER'

export function addUser(userInfo) {
    return {
        type: ADD_USER,
        payload: userInfo
    }
}

export function selectPost(post) {
    return {
        type: SELECT_POST,
        payload: post
    }
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        payload: posts
    }
}

export function searchUsers(input){
    return {
        type: SEARCH_USERS,
        payload: input
    }
}

export function reloadUser(user) {
    return {
        type: RELOAD_USER,
        payload: user
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_USER:
            return {...state, user: action.payload}
        case RELOAD_USER:
            return {...state, user: action.payload}
        case UPDATE_POSTS:
            return {...state, allPosts: action.payload}
        case SELECT_POST:
            return {...state, currentPost: action.payload}
            case SEARCH_USERS:
                return state
        default:
            return state
    }
}



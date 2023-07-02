// Actions: a func which is going to return a type, what kind of action type is returned
export const setUserDetails = (user) => {
    return{
        type: "SET_USER",
        user: user //data coming from login.js
    }
}

export const getUserDetails = () => {
    return{
        type: "GET_USER",
    }
}
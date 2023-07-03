// Actions: a func which is going to return a type, what kind of action type is returned
export const setUserDetails = (user) => {
    return{
        type: "SET_USER",
        user: user,
    }
}

export const getUserDetails = () => {
    return{
        type: "GET_USER",
    }
}

export const setUserNull = () => {
    return{
        type: "SET_USER_NULL",
        user: null,
    }
}
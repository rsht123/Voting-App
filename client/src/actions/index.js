export const loginUser = (name) => ({
    type: "LOGIN",
    name
})

export const logoutUser = () => ({
    type: "LOGOUT"
})

export const setUser = (name) => ({
    type: "SET_USER",
    name
})

export const loadState = () => ({
    type: "LOADED"
})
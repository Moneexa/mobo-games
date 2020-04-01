import { AUTHENTICATE } from "./actions";

const initialState = (() => {
    let token;
    let isAuthenticated = false;
    try {
        token = JSON.parse(localStorage.getItem('token'));
        token.expiry = new Date(token.expiry)
        const currentDate = new Date();
        isAuthenticated = token && token.expiry > currentDate;
    } catch (error) {
        token = {
            expiry: undefined,
            jwt: undefined,
            setIsAuthenicated: function (value) {
                this.isAuthenticated = value;
            }
        };
    }
    return {
        isAuthenticated: isAuthenticated,
        token: token
    }
})()

function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            localStorage.setItem('token', JSON.stringify(action.token));
            return Object.assign(
                {},
                state,
                {
                    isAuthenticated: true,
                    token: action.token
                }
            );
        default:
            return state;
    }
}

export default authenticationReducer;
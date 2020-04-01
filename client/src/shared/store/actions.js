export const AUTHENTICATE = 'AUTHENTICATE' // action types

export function authenticate(token) {
    return {
        type: AUTHENTICATE,
        token     // action payload
    }
}

export const AuthService = {
    authenticate: () => {
        const expiry = new Date(2020, 12, 1);
        return {
            expiry: expiry,
            jwt: "Token 12345"
        }
    }
};
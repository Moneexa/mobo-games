import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, redirect, canActivate, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            canActivate ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: redirect,
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
)
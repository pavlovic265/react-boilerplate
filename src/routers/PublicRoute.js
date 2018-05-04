import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route component={(props) => {
        return isAuthenticated ?  (
            <Redirect to={'/dashboard'} />
        ) : (
            <Component {...props} />
        )
    }} {...rest} />
);

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: !!auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
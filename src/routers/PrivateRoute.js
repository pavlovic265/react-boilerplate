import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route component={(props) => {
        return isAuthenticated ?  (
            <div>
                <Component {...props} />
            </div>
        ) : (
            <Redirect to={'/'} />
        )
    }} {...rest} />
);


const mapStateToProps = ({ auth }) => ({
    isAuthenticated: !!auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
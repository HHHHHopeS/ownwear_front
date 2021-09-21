import { Component } from "react";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({component:Component,authenticated,...rest}) =>(
    <Route
        {...rest}
        render={props=> authenticated? (
            <Component {...rest} {...props}/>

        )
    :(
        <Redirect to={{
            pathname:"/login",
            state:{from:props.location}
        }}/>
    )
    }/>
)
export default PrivateRoute
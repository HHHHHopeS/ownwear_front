import { useEffect } from "react";
import { Redirect, Route } from "react-router";
import LoadingIndicator from "./LoadingIndicator";

const PrivateRoute = ({component:Component,authenticated,loading,...rest}) =>{
    useEffect(()=>{
        console.log(loading)
    },[loading])
     console.log(loading)
if(loading){
    return <LoadingIndicator/>
}
    return (
    
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
)}
export default PrivateRoute
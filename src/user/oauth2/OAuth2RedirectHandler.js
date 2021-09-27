
import { useContext } from "react";
import { Redirect, useLocation } from "react-router";
import { UserContext } from "../../common/UserContext";
import { ACCESS_TOKEN } from "../../constants";
import { getCurrentUser } from "../../util/APIUtils";

export default function OAuth2RedirectHandler(props) {
    const {setCurrentUser} = useContext(UserContext)
    const location = useLocation()
    const getUrlParameter= (name)=>{
        
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
        var results = regex.exec(props.location.search)
        return results === null? '': decodeURIComponent(results[1].replace(/\+/g,' '))
    }
    const token = getUrlParameter('token')
    const error = getUrlParameter('error')
    if(token){
        
        localStorage.setItem(ACCESS_TOKEN,token)
        console.log(props.location)
        getCurrentUser().then(response=>{
            setCurrentUser(response)
          })
          props.history.go(-2)
        return <Redirect to={{
            pathname: "/",
            state: {from:props.location}

        }}/>
    }else{
        return <Redirect to={{
            pathname:"/login",
            state:{
                from:this.props.location,
                error:error
            }
        }}/>
    }
};

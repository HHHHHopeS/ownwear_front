
import { Redirect } from "react-router";
import { ACCESS_TOKEN } from "../../constants";

export default function OAuth2RedirectHandler(props) {
    const getUrlParameter= (name)=>{
        
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
        var results = regex.exec(props.location.search)
        return results === null? '': decodeURIComponent(results[1].replace(/\+/g,' '))
    }
    const token = getUrlParameter('token')
    const error = getUrlParameter('error')
    if(token){
        console.log(token)
        localStorage.setItem(ACCESS_TOKEN,token)
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

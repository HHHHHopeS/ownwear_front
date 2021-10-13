import "bootstrap/dist/css/bootstrap.min.css";
import { useContext,useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import {useHistory} from "react-router"
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-default.css";
import './App.scss';
import LoadingIndicator from "./common/LoadingIndicator";
import { UserContext } from "./common/UserContext";
import NotFound from './components/404/NotFound';
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Footer from "./components/Footer/Footer";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import MyPage from "./components/MyPage/MyPage";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Ranking from "./components/Ranking/Ranking";
import SubNav from './components/SubNav/SubNav';
import UnVerified from "./components/UnVerified/UnVerified";
import { ACCESS_TOKEN } from "./constants";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import { getCurrentUser } from "./util/APIUtils";
import CacheRoute, {CacheSwitch} from "react-router-cache-route"




  

export default function App(props) {
const {setCurrentUser,user} = useContext(UserContext)
const location = useLocation()
const [id,setId] = useState(null)
const [loading,setLoading] = useState(true)

const history = useHistory()
let userid= null


const handleLogout= ()=>{
  localStorage.removeItem(ACCESS_TOKEN);
  setCurrentUser(null)

  Alert.success("You re safely logged out!")
}

const CheckVerified= ()=>{

  if(user.auth&&location.pathname!=="/unverified"){
  if(user.info.isverified){

    return false
  }
  else{
    
    return <Redirect to="/unverified"></Redirect>
    

  }
}
else return null
}
  
  useEffect(() => {

    // const fetchData = async () => {
    //   setLoading(true);
    //   const res = await axios.get('');
    //   setPosts(res.data);
    //   setLoading(false);
    // }

    

    const loadCurrentlyLoggedInUser = ()=>{

      setLoading(true)
      getCurrentUser().then(response=>{
        
        setCurrentUser(response)
        
        if(user.auth){


          
          setLoading(false)
        }
        else{
        setLoading(false)}
        
      }
      

      ).catch(error=>{
        console.log(error)
        setLoading(false)
      })
      
    }
    
    
    
  loadCurrentlyLoggedInUser();


  return () => setLoading(false);
  },[localStorage.accessToken])
  useEffect(() => {
    console.log(history.action)
    if(history.action==="PUSH"){
    window.scrollTo(0, 0);
  }
  }, [location.pathname]);
  
  if(loading){
    return <div style={{height:"100vh"}}>
      <LoadingIndicator />
    </div>
  }
  
  return (
    <div className="App">
      
      <Nav onLogout={handleLogout}/>
      <SubNav setId={setId} />
      <div className="main-section" style={window.location.pathname==="/create"?{marginTop:"0"}:{}}
      >
        
        <CheckVerified />
        <CacheSwitch >


          <Route exact path="/unverified" component={UnVerified} />
          <Route exact path="/men" component={Main} />
          <Route exact path="/women" component={Main} />
          <Route exact path="/login"  render={(props)=><Login  {...props}/>}/>
          <Route exact path="/detail/:id" component={Detail}/>

    
          
          <CacheRoute saveScrollPosition="true" when="always" cacheKey="Ranking" exact path="/ranking/:id/:id" >

            <Ranking></Ranking>

          </CacheRoute>
          
          
          <Route exact path="/profile/:id" render={(props)=><Profile id={id} {...props}/>}/>
          <Route exact path="/mypage" component={MyPage}/>

          <Route exact path="/create" component={Create}/>
          <Route exact path="/list/:id/:id/:id" component={List}/>
          <Route path = "/oauth2/redirect" component={OAuth2RedirectHandler}/>
          <Route exact path="/" component={Main} />

          <Route component={NotFound} />

        </CacheSwitch>
  
      </div>
      <Footer />
      
    </div>
    
  );
}



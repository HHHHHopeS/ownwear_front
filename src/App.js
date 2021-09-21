import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState , } from 'react';
import { Route, Switch ,useLocation} from 'react-router-dom';
import './App.scss';
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

import LoadingIndicator from "./common/LoadingIndicator"
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler"
import {getCurrentUser} from "./util/APIUtils";
import { ACCESS_TOKEN } from "./constants";
import PrivateRoute from "./common/PrivateRoute";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

  

export default function App(props) {
const [authenticated,setAuthenticated] = useState(false)
const [currentUser,setCurrentUser] = useState(null)
const [loading,setLoading] = useState(false)
const location = useLocation()
const loadCurrentlyLoggedInUser = ()=>{

    setLoading(true)
    getCurrentUser().then(response=>{
      console.log(response)
      setCurrentUser(response)
      setAuthenticated(true)
      setLoading(false)
      console.log(123123)
      console.log(authenticated)
    }).catch(error=>{
      console.log(error)
      setLoading(false)
    })
  }

const handleLogout= ()=>{
  sessionStorage.removeItem(ACCESS_TOKEN);
  setAuthenticated(false)
  setCurrentUser(null)
  Alert.success("You re safely logged out!")
}

  // const check =(history)=> async () => {
  //   setCheckLogin(true)
  //   fetch("https://localhost:8443/loginform").then(async response => {
  //     const answer = await response.text()
  //     console.log("answer : "+answer)
  //     if (answer === "loginform") {
  //         return (history.push("/login")
  //         )
  //     }
  //   })
  // }
  
  useEffect(() => {
    
    

  loadCurrentlyLoggedInUser();

  },[location])
  if(loading){
    return <LoadingIndicator />
  }

  return (
    <div className="App">

      <Nav authenticated={authenticated} name={currentUser? currentUser.name:null} onLogout={handleLogout}/>
      <SubNav />
      <div className="main-section"
      >

        <Switch >


          
          <Route exact path="/men" component={Main} />
          <Route exact path="/women" component={Main} />
          <Route exact path="/login"  render={(props)=><Login authenticated={authenticated} {...props}/>}/>
          <Route exact path="/detail" component={Detail}/>
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/mypage" component={MyPage}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/list" component={List}/>
          <Route path = "/oauth2/redirect" component={OAuth2RedirectHandler}/>
          <Route exact path="/" component={Main} />

          <Route component={NotFound} />

        </Switch>
      </div>
      <Footer />
      <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
    </div>
    
  );
}



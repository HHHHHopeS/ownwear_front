import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from 'react';
import { Route, Switch,useLocation } from 'react-router-dom';
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
import { ACCESS_TOKEN } from "./constants";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import { getCurrentUser } from "./util/APIUtils";



  

export default function App(props) {
const {setCurrentUser} = useContext(UserContext)
const location = useLocation()

const [loading,setLoading] = useState(false)


const handleLogout= ()=>{
  localStorage.removeItem(ACCESS_TOKEN);
  setCurrentUser(null)
  Alert.success("You re safely logged out!")
}

  
  useEffect(() => {

    const loadCurrentlyLoggedInUser = ()=>{

      setLoading(true)
      getCurrentUser().then(response=>{

        setCurrentUser(response)
        setLoading(false)
        console.log(response)
      }).catch(error=>{
        console.log(error)
        setLoading(false)
      })
    }

  loadCurrentlyLoggedInUser();
  return () => setLoading(false);
  },[location])
  
  if(loading){
    return <LoadingIndicator />
  }

  return (
    <div className="App">

      <Nav onLogout={handleLogout}/>
      <SubNav />
      <div className="main-section"
      >

        <Switch >


          
          <Route exact path="/men" component={Main} />
          <Route exact path="/women" component={Main} />
          <Route exact path="/login"  render={(props)=><Login  {...props}/>}/>
          <Route exact path="/detail/:id/:id" component={Detail}/>
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/profile/:id" component={Profile}/>
          <Route exact path="/mypage" component={MyPage}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/list/:id" component={List}/>
          <Route path = "/oauth2/redirect" component={OAuth2RedirectHandler}/>
          <Route exact path="/" component={Main} />

          <Route component={NotFound} />

        </Switch>
      </div>
      <Footer />
      
    </div>
    
  );
}



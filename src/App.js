import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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
import axios from 'axios';
import Paging from "./Paging/Paging";





  

export default function App(props) {
const {setCurrentUser,user} = useContext(UserContext)
const location = useLocation()
<<<<<<< HEAD

const [loading,setLoading] = useState(false);
const [post, setPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [postPerPage, setPostsPerPage] = useState(12);
=======
const [authenticated,setAuthenticated] = useState(false)
const [loading,setLoading] = useState(true)
>>>>>>> 32a9625de1eb9156108a75c07ef8bae49142b769


const handleLogout= ()=>{
  localStorage.removeItem(ACCESS_TOKEN);
  setCurrentUser(null)
  setAuthenticated(false)
  Alert.success("You re safely logged out!")
}

  
  useEffect(() => {
<<<<<<< HEAD

    // const fetchData = async () => {
    //   setLoading(true);
    //   const res = await axios.get('');
    //   setPosts(res.data);
    //   setLoading(false);
    // }

    
=======
>>>>>>> 32a9625de1eb9156108a75c07ef8bae49142b769
    
    const loadCurrentlyLoggedInUser = ()=>{

      setLoading(true)
      getCurrentUser().then(response=>{
        
        setCurrentUser(response)
        if(user.auth){
          setAuthenticated(true)
        }
        else(setAuthenticated(false))
        setLoading(false)

      }).catch(error=>{
        console.log(error)
        setLoading(false)
      })
    }
   

  loadCurrentlyLoggedInUser();
<<<<<<< HEAD
    // fetchData();
    // console.log(Object);
  return () => setLoading(false);
  
  },[location]);

  
=======

  return () => setLoading(false);
  },[user.auth])
>>>>>>> 32a9625de1eb9156108a75c07ef8bae49142b769
  
  if(loading){
    return <LoadingIndicator />
  }

  return (
    <div className="App">
      
      <Nav onLogout={handleLogout}/>
      <SubNav />
      <div className="main-section" style={window.location.pathname==="/create"?{marginTop:"0"}:{}}
      >
        
        <Switch >


          
          <Route exact path="/men" component={Main} />
          <Route exact path="/women" component={Main} />
          <Route exact path="/login"  render={(props)=><Login  {...props}/>}/>
          <Route exact path="/detail/:id" component={Detail}/>
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/profile/:id" component={Profile}/>
          <Route exact path="/mypage" component={MyPage}/>

          <Route exact path="/create" component={Create}/>
          <Route exact path="/list/:id/:id/:id" component={List}/>
          <Route path = "/oauth2/redirect" component={OAuth2RedirectHandler}/>
          <Route exact path="/" component={Main} />

          <Route component={NotFound} />

        </Switch>
  
      </div>
      <Footer />
      
    </div>
    
  );
}



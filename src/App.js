import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import { Redirect, Route, useLocation } from 'react-router-dom';
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-default.css";
import './App.scss';
import LoadingIndicator from "./common/LoadingIndicator";
import { UserContext } from "./common/UserContext";
import Create from "./components/Create/Create";
import Detail from "./components/Detail/Detail";
import Footer from "./components/Footer/Footer";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import ListModal from "./components/Modal/ListModal";
import MoreInfoModal from "./components/Modal/MoreInfoModal";
import MyPage from "./components/MyPage/MyPage";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Ranking from "./components/Ranking/Ranking";
import SubNav from './components/SubNav/SubNav';
import UnVerified from "./components/UnVerified/UnVerified";
import { ACCESS_TOKEN } from "./constants";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import { getCurrentUser, getUserList, toggleFollow } from "./util/APIUtils";



  

export default function App(props) {
const {setCurrentUser,user} = useContext(UserContext)
const location = useLocation()
const [id,setId] = useState(null)
const [loading,setLoading] = useState(true)
const [modalLoading,setModalLoading] = useState(false)
const [show,setShow] = useState(false)
const [userList,setUserList] = useState([])
const [title,setTitle]=useState("")
const [toggleMoreInfo,setToggleMoreInfo] = useState(false)
const history = useHistory()

const  followOrNot = async (current_userid, target_userid) => {
  
  if (user.auth) {
    let response = await toggleFollow(current_userid, target_userid).then(bool=>bool)
    console.log(response)
    return response
  } else {
    Alert.error("please login first");
    history.push("/login");
  }
  

};

const toggleFollowModal = (e,type,userid) => {
   //follwer , f, like

   setModalLoading(true)
   let current_userid = -1
  if(user.info){
    current_userid =user.info.userid
  }
  const request = Object.assign(
    {},
    {
      type,
      current_userid,
      // 유저 프로필 불러오기 완성되면 변경

      targetid:userid

    }
  );
  
  getUserList(request)
    .then(response => 
    
      
     setUserList(response,setModalLoading(false))
    )
    .catch(err => console.log);
  setTitle(type);
    
  setShow(true);
  
};

const handleLogout= ()=>{
  localStorage.removeItem(ACCESS_TOKEN);
  setCurrentUser(null)

  Alert.success("로그아웃 되었습니다.")
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
  useEffect(()=>{
      if(user.info&&(!user.info.height||!user.info.sex)){
        // setToggleMoreInfo(true)
        //  todo: oauth2 백 완성되면 해제 
      }
  },[user,user.info])
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
      <SubNav followOrNot={followOrNot} toggleFollowModal={toggleFollowModal} />
      <div className="main-section" style={window.location.pathname==="/create"?{marginTop:"0"}:{}}
      >
        
        <CheckVerified />
        <CacheSwitch >


          <Route exact path="/unverified" component={UnVerified} />
          {/* <Route  exact path="/men" component={Main} />
          <Route  exact path="/women" component={Main} /> */}
          <Route exact path="/login"  render={(props)=><Login setToggleMoreInfo={setToggleMoreInfo}  {...props}/>}/>
          <Route exact path="/detail/:id" render={props=><Detail setModalLoading={setModalLoading} setTitle={setTitle} setUserList={setUserList} setShow={setShow} {...props}/> }/>
          <CacheRoute saveScrollPosition="true" when="always" cacheKey="Ranking" exact path="/ranking/:id/:id" >

            <Ranking followOrNot={followOrNot} toggleFollowModal={toggleFollowModal}></Ranking>

          </CacheRoute>
          
          
          <Route exact path="/profile/:id" render={(props)=><Profile id={id} {...props}/>}/>
          <Route exact path="/mypage" component={MyPage}/>

          <Route exact path="/create" component={Create}/>
          <Route exact path="/list/:id/:id/:id" component={List}/>
          <Route path = "/oauth2/redirect" component={OAuth2RedirectHandler}/>
          <CacheRoute cacheKey="Main" saveScrollPosition="true" when="always" component={Main} />



        </CacheSwitch>

      </div>
      <Footer />
      <ListModal
          setUserList={setUserList}
          userList={userList}
          show={show}
          setShow={setShow}
          title={title}
          modalLoading={modalLoading}
        />
        <MoreInfoModal keyboard={false} setToggleMoreInfo={setToggleMoreInfo} centered backdrop="static" show={toggleMoreInfo} onHide={()=>setToggleMoreInfo(false)}/>
    </div>
    
  );
}



import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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


export default function App() {
  const location = useLocation();
  useEffect(()=>{

      
  },[location])
  return (
    <div className="App">
      <Nav />
      <SubNav />
      <div className="main-section" 
      >
        
        <Switch >

          <Route exact path="/" component={Main} />
          <Route path="/men" component={Main} />
          <Route path="/women" component={Main} />

          <Route path="/login" component={Login}/>
          <Route path="/detail" component={Detail}/>
          <Route  path="/ranking" component={Ranking}/>
          <Route  path="/profile" component={Profile}/>
          <Route  path="/mypage" component={MyPage}/>
          <Route  path="/create" component={Create}/>
          <Route  path="/list" component={List}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
      </div>
  );
}



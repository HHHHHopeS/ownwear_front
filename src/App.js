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
          <Route exact path="/login" component={Login}/>
          <Route exact path="/detail" component={Detail}/>
          <Route exact path="/ranking" component={Ranking}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/mypage" component={MyPage}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/list" component={List}/>
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
      </div>
  );
}



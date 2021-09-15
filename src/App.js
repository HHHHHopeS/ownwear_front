import { render } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
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
  console.log("location : " +location)
  const [checkLogin, setCheckLogin] = useState(false)
  const check =(history)=> async () => {
    setCheckLogin(true)
    fetch("https://localhost:8443/loginform").then(async response => {
      const answer = await response.text()
      console.log("answer : "+answer)
      if (answer == "loginform") {
          return (history.push("/login")
          )
      }
    })
  }

  useEffect(() => {
    if (checkLogin)
      setCheckLogin(false)

  }, [location])
  return (
    <div className="App">
      <Nav />
      <SubNav />
      <div className="main-section"
      >

        <Switch >

          <Route exact path="/" render={props => <Main check={check} />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/list" component={List} />
          <Route component={NotFound} />



        </Switch>
      </div>
      <Footer />
    </div>
  );
}



import "./Login.scss";
import { useContext, useEffect, useReducer, useState, createContext, useCallback } from 'react'
import { UserDispatchContext } from "../UserContext/UserContext";
import {  useUserState } from "../UserContext/UserContext";
import Alert from "react-s-alert";
import {Link, Redirect} from "react-router-dom"
import axios from "axios";
import { login,signup } from '../../util/APIUtils';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL } from "../../constants";

export default function Login(props) {
  const { userList } = useUserState;
  const dispatch = useContext(UserDispatchContext)
  const [submitting, setSubmitting] = useState(false);
  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handler = useCallback((e) => {
      const blank = /\s/;
      if (blank.test(e.target.value) === true) {
        alert("공백은 사용할 수 없습니다.");
        return;
      }
      setValue(e.target.value);
    }, []);

    return [value, handler, setValue];
  };


  // const [join, setJoin] = useState(false);
  // async function joinMember(e) {
  //   e.preventDefault();
  //   const joinNick = document.getElementById("newnick").value;
  //   const joinEmail = document.getElementById("newemail").value;
  //   const joinPwd = document.getElementById("newpwd").value;
  //   const checkJoinPwd = document.getElementById("checkpwd").value;
  //   const joinData = {
  //     method: 'POST',
  //     body: JSON.stringify({ joinNick, joinEmail, joinPwd, checkJoinPwd }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   if (joinPwd != checkJoinPwd) {
  //     alert("비밀번호 확인 다시하셈")
  //   }
  // }
  useEffect(() => {
    console.log(props.authenticated)
    if(props.location.state && props.location.state.error){
      setTimeout(()=>{
        Alert.error(props.location.state.error,{timeout:5000})
      
      props.history.replace({
        pathname:props.location.pathname,
        state:{}
      })
    },100)
    }
    if (submitting) {
      setSubmitting(false)
    }

  })


  if(props.authenticated){

    return<Redirect to={{
      pathname:"/",
      state:{from:props.location}
    }}/>
  }
  return (
    <div className="Login">
      <div className="main-container">
        <div id="login-form-container">
          <LoginForm {...props}/>
          <div id="social-login-form-container">
            <h2>OR</h2>
            <SocialLogin />
          </div>
        </div>
        <Signup {...props}/>
      </div>
    </div>
  );
}


function SocialLogin(){
  return(
    <div className="social-login">
      <a href="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        Log in with Facebook
      </a>
    </div>
  )
}

function LoginForm(props){
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleInputChange = (e)=>{
    const target = e.target
    const inputName = target.name;
    const inputValue = target.value;
    if(inputName==="email"){
      setEmail(inputValue)
    }
    else if(inputName==="password"){
      setPassword(inputValue)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const loginRequest = Object.assign({},{email:email,password:password})
    login(loginRequest).then(response =>{
      sessionStorage.setItem(ACCESS_TOKEN,response.accessToken);
      Alert.success("you re successfuly logged in! ")
      props.history.push("/")
    }).catch(error=>{
      Alert.error((error&& error.message)|| "oops! something went wrong. please retry!")

    })
  }
  return(
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input type="email" name="email" 
          className="form-control" placeholder="Email"
          value={email} onChange={handleInputChange} required
        />

      </div>
      <div className="form-item">
        <input type="password" name="password" 
          className="form-control" placeholder="password"
          value={password} onChange={handleInputChange} required
        />

      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  )
}

function Signup(props){
  return(
    <div id="signup-form-container">
          <h2>SIGNUP</h2>
          {/* <form onSubmit={joinMember} className="join-form"> */}

          <SocialSignup/>
          <div className="seperator">
            <span className="or">OR</span>
          </div>
          <SignupForm {...props}/>
        </div>
  )

}

function SocialSignup(props){
  return(
    <div className="social-sginup">
      <a href={FACEBOOK_AUTH_URL} className="btn btn-block social-btn facebook">
        Sign up with Facebook
      </a>
    </div>
  )
}

function SignupForm(props){
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleInputChange = (e)=>{
    const target = e.target
    const inputName = target.name;
    const inputValue = target.value;
    if(inputName==="email"){
      setEmail(inputValue)
    }
    else if(inputName==="password"){
      setPassword(inputValue)
    }
    else if(inputName==="name"){
      setName(inputValue)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const signupRequest = Object.assign({},{email:email,password:password,name:name})
    signup(signupRequest).then(response =>{
    
      Alert.success("you re successfuly registered! ")
      const loginRequest = Object.assign({},{email:email,password:password})
      login(loginRequest).then(response=>{
        sessionStorage.setItem(ACCESS_TOKEN,response.accessToken)

      })
      props.history.push("/")
    }).catch(error=>{
      Alert.error((error&& error.message)|| "oops! something went wrong. please retry!")

    })
  }
  return(
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input type="email" name="email" 
          className="form-control" placeholder="Email"
          value={email} onChange={handleInputChange} required
        />

      </div>
      <div className="form-item">
        <input type="password" name="password" 
          className="form-control" placeholder="password"
          value={password} onChange={handleInputChange} required
        />
      </div>
      <div className="form-item">
        <input type="text" name="name" 
          className="form-control" placeholder="Name"
          value={name} onChange={handleInputChange} required
        />

      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  )
}
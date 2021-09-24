import { useContext, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from '../../common/UserContext';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL } from "../../constants";
import { login, signup } from '../../util/APIUtils';
import "./Login.scss";


export default function Login(props) {
  const {user} = useContext(UserContext)


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


  })


  if(user.auth){

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
      localStorage.setItem(ACCESS_TOKEN,response.accessToken);
      Alert.success("you re successfuly logged in! ")
      console.log(1)
      props.history.goBack()
     
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
        localStorage.setItem(ACCESS_TOKEN,response.accessToken)

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
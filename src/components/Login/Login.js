import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from '../../common/UserContext';
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL } from "../../constants";
import { getCurrentUser, login, signup } from '../../util/APIUtils';
import "./Login.scss";


export default function Login(props) {
  const {user,setCurrentUser} = useContext(UserContext)
  const [isLogin,setIsLogin]= useState(true)

  useEffect(() => {

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
      
      <div  className="main-container">
        <div className={isLogin?"form-container login":"form-container signup"}>
        {isLogin?
        <div id="login-form-container">
          <h2>SIGNIN</h2>
          <LoginForm setCurrentUser={setCurrentUser} {...props}/>
          <div id="social-login-form-container">
            <p>OR</p>
            <SocialLogin />
          </div>
        </div>
        :
        <Signup {...props}/>
        
        }
        </div>
          <div className={isLogin?"toggle-container signup":"toggle-container login"}>
            <div className="title-section">
                <span>{isLogin?"Welcome Back!":"Hello World!"}</span>

            </div>
            <button onClick={isLogin?()=>setIsLogin(false):setIsLogin} >{isLogin?"signup":"login"}</button>
          </div>
        
        
      </div>
    </div>
  );
}


function SocialLogin(){
  return(
    <a className="facebook-button" href={FACEBOOK_AUTH_URL}>
    <div className="social-login">
      
      <div className="icon-container">
        <FontAwesomeIcon icon={faFacebook}/>
      </div>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        Continue with Facebook
      </a>
      
    </div>
    </a>
  )
}

function LoginForm(props){
  const setCurrentUser=props.setCurrentUser
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

      console.log(response)
      localStorage.setItem(ACCESS_TOKEN,response.accessToken);
      getCurrentUser().then(response=>{
        setCurrentUser(response)
      })
      

      props.history.goBack()
     
    }).catch(error=>{
      console.log(error)
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
      <a className="forget-password-button" href="none">forget your password?</a>
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
    <div id="signup-form-container" >
          <h2>SIGNUP</h2>
          {/* <form onSubmit={joinMember} className="join-form"> */}

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
          SignUp
        </button>
      </div>
    </form>
  )
}
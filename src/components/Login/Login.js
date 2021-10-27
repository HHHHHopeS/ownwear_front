import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL } from "../../constants";
import { login, signup } from "../../util/APIUtils";
import "./Login.scss";

export default function Login(props) {
  const { user, setCurrentUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const setToggleMoreInfo = props.setToggleMoreInfo
  useEffect(() => {
    if (props.location.state && props.location.state.error) {
      setTimeout(() => {
        Alert.error(props.location.state.error, { timeout: 5000 });

        props.history.replace({
          pathname: props.location.pathname,
          state: {},
        });
      }, 100);
    }
  });

  if (user.auth) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  }
  return (
    <div className="Login">
      <div className="main-container">
        <div
          className={isLogin ? "form-container login" : "form-container signup"}
        >
          {isLogin ? (
            <div id="login-form-container">
              <h2>Sign In</h2>
              <LoginForm setCurrentUser={setCurrentUser} {...props} />
              <div id="social-login-form-container">
                <p>OR</p>
                <SocialLogin />
              </div>
            </div>
          ) : (
            <Signup setToggleMoreInfo={setToggleMoreInfo} setCurrentUser={setCurrentUser} {...props} />
          )}
        </div>
        <div
          className={
            isLogin ? "toggle-container signup" : "toggle-container login"
          }
        >
          <div className="title-section">
            <span>{isLogin ? "Welcome Back!" : "Hello World!"}</span>
          </div>
          <button onClick={isLogin ? () => setIsLogin(false) : setIsLogin}>
            {isLogin ? "signup" : "login"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <a className="facebook-button" href={FACEBOOK_AUTH_URL}>
      <div className="social-login">
        <div className="icon-container">
          <FontAwesomeIcon icon={faFacebook} />
        </div>

        <span href={FACEBOOK_AUTH_URL}>Continue with Facebook</span>
      </div>
    </a>
  );
}

function LoginForm(props) {
  const setCurrentUser = props.setCurrentUser;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = e => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;
    if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "password") {
      setPassword(inputValue);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const loginRequest = Object.assign(
      {},
      { email: email, password: password }
    );
    login(loginRequest)
      .then(response => {
        
        if (response.accessToken) {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          Alert.success("로그인 성공!");

          props.history.goBack();
        } else {
          
          Alert.error("로그인 정보가 잘못 되었습니다. 다시 입력해주세요");
        }
      })
      .catch(error => {
        console.log(error);
        Alert.error(
          (error && error.message) ||
            "oops! something went wrong. please retry!"
        );
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <a className="forget-password-button" href="none">
        forget your password?
      </a>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
}

function Signup(props) {
  return (
    <div id="signup-form-container">
      <h2>Sign Up</h2>
      {/* <form onSubmit={joinMember} className="join-form"> */}

      <SignupForm setToggleMoreInfo={props.setToggleMoreInfo} {...props} />
    </div>
  );
}

function SocialSignup(props) {
  return (
    <div className="social-sginup">
      <a href={FACEBOOK_AUTH_URL} className="btn btn-block social-btn facebook">
        Sign up with Facebook
      </a>
    </div>
  );
}

function SignupForm(props) {
  const setCurrentUser = props.setCurrentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToggleMoreInfo = props.setToggleMoreInfo
  const handleInputChange = e => {
    const target = e.target;
    const inputName = target.name;
    const inputValue = target.value;
    if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "password") {
      setPassword(inputValue);
    } else if (inputName === "name") {
      setName(inputValue);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const signupRequest = Object.assign(
      {},
      { email: email, password: password, name: name }
    );
    signup(signupRequest)
      .then(response => {
        if (response.success) {
          Alert.success("회원가입 성공! ");
          const loginRequest = Object.assign(
            {},
            { email: email, password: password }
          );
          login(loginRequest).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            setToggleMoreInfo(true)
            props.history.goBack();

          });
        }
        else{

          if(response.status===400){
            Alert.error(response.message)
          }
          else if(response.status===500){
Alert.error("Username is already in use")
          }
        }
      })
      .catch(error => {
        Alert.error(
          (error && error.message) ||
            "oops! something went wrong. please retry!"
        );
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          SignUp
        </button>
      </div>
    </form>
  );
}

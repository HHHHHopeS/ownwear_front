import "./Login.scss";
import { useContext, useEffect, useReducer, useState, createContext, useCallback } from 'react'
import { UserDispatchContext } from "../UserContext/UserContext";
import {  useUserState } from "../UserContext/UserContext";
import axios from "axios";

export default function Login() {
  const { userList } = useUserState;

  const dispatch = useContext(UserDispatchContext)
  const sampleUser = [
    {
      id: "sdf@naver.com",
      pwd: "asd"
    },
    {
      id: "abc@naver.com",
      pwd: "abcd"
    }
  ]
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

  const [id, onChangeId, setId] = useInput("");
  const [pwd, onChangePwd, setPwd] = useInput("");

  const onReset = useCallback(() => {
    setId("");
    setPwd("");
  }, [setId, setPwd]);

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
  // useEffect(() => {
  //   if (join) {
  //     setJoin(false);
  //   }
  // })
  
  const onLogin=(e)=>{
    e.preventDefault()
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPwd = document.getElementById("inputpwd").value;
    if (!inputEmail || !inputPwd) {
      alert("모든값입력하세요");
      return;
    } else if (inputEmail != sampleUser[0].id) {
      alert("아이디 확인하세요");
    } else if (inputPwd != sampleUser[0].pwd) {
      alert("패스워드를 확인하세요");
    } else if (inputEmail === sampleUser[0].id || inputPwd === sampleUser[0].pwd) {
      // sessionStorage.setItem("nick", {user});
      
      // dispatch({
      //   type: "LOGIN",
      //   userId: id
      // })
      onReset()
      console.log("dispatch   :"+dispatch)
      console.log("{userList} ;   "+userList.userId)
      // window.location.replace("/")
    }
  }
  const address = "https://localhost:8443/oauth2/authorization/facebook";

  const config = {
    headers: {
      // Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      "Access-Control-Allow-Origin":"*"
    },
  };

  const facebookLogin = async()=>{
    try{
    let jwtToken = await axios.get(
      address,
      config
    );
    console.log(jwtToken);
  }catch(error){
    console.error(error)
  }
}

  const responseGoogle = async () => {
   
    let jwtToken = await axios.post(
      address,
      config
    );
    if (jwtToken.status === 200) {
      console.log(2, jwtToken.data);
      localStorage.setItem("jwtToken", jwtToken.data);
    }
  };

  async function loginSubmit(e) {
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPwd = document.getElementById("inputpwd").value;
    setSubmitting(true)
    e.preventDefault();
    
    // const loginData = {
    //   method: 'POST',
    //   body: JSON.stringify({ inputEmail, inputPwd }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    
    if (!inputEmail || !inputPwd) {
      alert("모든값입력하세요");
      return;
    } else if (inputEmail != sampleUser[0].id) {
      alert("아이디 확인하세요");
    } else if (inputPwd != sampleUser[0].pwd) {
      alert("패스워드를 확인하세요");
    } else if (inputEmail === sampleUser[0].id || inputPwd === sampleUser[0].pwd) {
      const Id = "nick";
      sessionStorage.setItem(Id, inputEmail);
      
      alert("login success")
    }

    await fetch(address).then(response => { console.log(response.text()) })
  }
  useEffect(() => {
    if (submitting) {
      setSubmitting(false)
    }
  })

  return (
    <div className="Login">
      <div className="main-container">
        <div id="login-form-container">
          <h2>LOGIN</h2>
          <form className="login-form">
            <input type="email" name="email" id="inputEmail" onChange={onChangeId} placeholder="email" required /><br />
            <input type="password" name="pwd" id="inputpwd" onChange={onChangePwd} placeholder="pwd" required /><br />

          </form>
            <button  onClick={facebookLogin} disabled={submitting} >LOGIN</button>
          <div id="social-login-form-container">
            <h2>OR</h2>
            <a href="https://localhost:8443/oauth2/authorization/facebook">facebook</a>
          </div>
        </div>
        <div id="signup-form-container">
          <h2>SIGNUP</h2>
          {/* <form onSubmit={joinMember} className="join-form"> */}
          <form className="join-form">
            <input type="text" name="nick" id="newnick" placeholder="닉네임을 입력해주세요" required /><br />
            <input type="email" name="email" id="newemail" placeholder="email을 입력해주세요" required /><br />
            <input type="password" name="newpwd" id="newpwd" placeholder="비밀번호를 입력해주세요" required /><br />
            <input type="password" name="checkpwd" id="checkpwd" placeholder="비밀번호 확인" required /><br />
            <input type="submit" value="회원가입" disabled={submitting} />
          </form>
        </div>
      </div>
    </div>
  );
}

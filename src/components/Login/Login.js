import "./Login.scss";
import { useEffect, useState } from 'react'
import { faThList } from "@fortawesome/free-solid-svg-icons";
import { render } from "@testing-library/react";
import { Button } from "react-bootstrap";

export default function Login() {
  const address = "https://localhost:8443/";
  // const [values, setValues] = useState({ email: "", password: "" });
  // const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [join, setJoin]=useState(false);
  const userinfo = [
    {
      id: "sdf",
      pwd: "asd"
    },
    {
      id: "abc",
      pwd: "abcd"
    }
  ]
  async function joinMember(e){
    e.preventDefault();
    const joinNick = document.getElementById("newnick").value;
    const joinEmail = document.getElementById("newemail").value;
    const joinPwd = document.getElementById("newpwd").value;
    const checkJoinPwd = document.getElementById("checkpwd").value;
    const joinData = {
      method : 'POST',
      body : JSON.stringify({joinNick, joinEmail ,joinPwd , checkJoinPwd}),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    if(joinPwd != checkJoinPwd){
      alert("비밀번호 확인 다시하셈")
    }
  }
  useEffect(()=>{
    if(join){
      setJoin(false);
    }
  })

  async function loginSubmit(e) {
    setSubmitting(true)
    e.preventDefault();
    const inputId = document.getElementById("inputid").value;
    const inputPwd = document.getElementById("inputpwd").value;
    const loginData = {
      method: 'POST',
      body: JSON.stringify({ inputId, inputPwd }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if(inputId == userinfo[0].id){
      const Id = null;
      sessionStorage.setItem(Id,inputId);
    }
    // await fetch(address, loginData)
    //   .then(response => response.json())
    //   .then(data => {
    //     if(inputId == userinfo[0].id){
    //       console.log(data)
    //       sessionStorage.setItem(inputId);
    //       }
    //   })
      // .catch(error => {
      //   alert('아이디 또는 패스워드를 확인하세요');
      // })

    await fetch(address).then(response => { console.log(response.text()) })

  }
  useEffect(() => {
    if (submitting) {
      setSubmitting(false)
    }
  })

  return (
    <div className="Login">
      <div id="login-form-container">
        <h2>ownwear ID 로그인</h2>
        <form onSubmit={loginSubmit} className="login-form">
          <input type="text" name="email" id="inputid" placeholder="id" /><br />
          <input type="password" name="pwd" id="inputpwd" placeholder="pwd" /><br />
          <input type="submit" value="로그인" disabled={submitting} />
        </form>
      </div>
      <div id="signup-form-container">
        <h2>외부 ID로 로그인</h2>
        <a href="https://localhost:8443/oauth2/authorization/facebook">facebook</a>
      </div>
      <div id="joinmember-form-container">
        <form onSubmit={joinMember} className="join-form">
        <input type="text" name="nick" id="newnick" placeholder="닉네임을 입력해주세요" /><br />
        <input type="email" name="email" id="newemail" placeholder="email을 입력해주세요" /><br />
        <input type="password" name="newpwd" id="newpwd" placeholder="비밀번호를 입력해주세요" /><br />
        <input type="password" name="checkpwd" id="checkpwd" placeholder="비밀번호 확인" /><br />
        <input type="submit" value="회원가입" disabled={submitting} />
        </form>
      </div>
    </div>
  );
}

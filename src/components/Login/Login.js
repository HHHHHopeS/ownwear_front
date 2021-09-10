import "./Login.scss";

export default function Login() {
    async function loginSubmit(){

    }
  return (
    <div className="Login">
      <div id="login-form-container">
        <h2>ownwear ID 로그인</h2>
          <form onSubmit={loginSubmit} className="login-form">
              <input type="text" name="email" id="" placeholder="id" /><br/>
              <input type="password" name="pwd" id="" placeholder="pwd" /><br/>
              <input type="submit" value="로그인" />
          </form>
      </div>
      <div id="signup-form-container">
        <h2>외부 ID로 로그인</h2>
        <ul>
          <li>facebook</li>
          <li>naver</li>
          <li>kakao</li>
        </ul>
      </div>
    </div>
  );
}

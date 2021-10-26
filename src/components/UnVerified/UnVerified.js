import {
    faInstagram,
    faPinterest,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import { getCurrentUser, updateOauth2 } from "../../util/APIUtils";
import "./UnVerified.scss";
export default function UnVerified(props) {
  const { user,setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  if (user.auth) {
    if (user.info.isverified) {
      
      history.push("/");
    }
  } else {
    history.push("/login");
  }
  
  const [info,setInfo] = useState({
    sex:true,
    height:"160"
  })

  const [isEmailValidate, setIsEmailValidate] = useState(0);
  const [isUsernameValidate, setIsUsernameValidate] = useState(0);
  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    if (user.info) {
      
      setInfo({...user.info,...info,})
      
      
    }
    
    
  }, [user.info]);
  
  
  useEffect(()=>{
    checkValidation(null,"email",info.email)
    checkValidation(null,"username",info.username)
  },[info.email,info.username])
  useEffect(()=>{

    const error= (type,value)=>{
      const classList = document.querySelector(`.form-item.${type}`).classList
      const reset =()=> classList.remove("error","wrong","green")
      switch(value){
        case 0:reset();break;

        case 1:reset();classList.add("error","wrong");break;
        case 2:reset();classList.add("green");break;
        default:break;
      }
      
    }
    
    
      error("email",isEmailValidate)
      error("username",isUsernameValidate)
      
  },[isEmailValidate,isUsernameValidate])
  function handleSubmit() {
    if(isEmailValidate===0||isUsernameValidate===0){
        

    
    
  }
    if(isEmailValidate===2&&isUsernameValidate===2){
      
      const request = Object.assign({},info)
      console.log(info)
      updateOauth2(request).then(res=>{

        if(res){
          getCurrentUser().then(res=>setCurrentUser(res))

        }
      })
    }

    
  }
  
  function checkValidation(e,type,value) {
    if(e){
     type = e.currentTarget.name;
     value = e.currentTarget.value;
  }

    const request = Object.assign({}, value);
    const setValue = (type, value) => {
      if (type === "email") {
        setIsEmailValidate(value);
      } else {
        setIsUsernameValidate(value);

      }
    };

    const regexUsername = /^[가-힣A-Za-z0-9_]{0,30}$/;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      (type === "email" && !regexEmail.test(value)) ||
      (type === "username" && !regexUsername.test(value))||!value
    ) {

      return setValue(type, 1);
    }
    
    // checkIsValid(value).then(response=>{
    //   if(response){
    //     return setValue(type,3)
    //   }
    //   else{
    //     return setValue(type,1)
    //   }

    // }).catch(err=>console.log(err))
    
    return setValue(type,2)
  }
  function checkValidStateValue(state){
    if(state===0){
      return ""
    }
    if(state===1){
      return "다른 값을 입력해주세요!"
    }
    if(state===2){
      return "확인!"
    }
  }
  
  const getImage = e => {
    const [file] = e.currentTarget.files;
    console.log(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsBinaryString(file);
    }
    reader.onload = () => {
      const fileRes = Buffer.from(reader.result, "binary").toString("base64");
      console.log(fileRes);
      if (fileRes) {
        setPreview(`data:image/jpg;base64,${fileRes}`);
        setInfo({...info,userimg:`data:image/jpg;base64,${fileRes}`})
      }
    };
  };
  const removeImage = ()=>{
    if(window.confirm("프로필 사진을 지우겠습니까?")){
    setPreview(null)
    setInfo({...info,userimg:null})
  }
  else{
    return false;
  }
    
  }
  return (
    <div className="UnVerified">
      <div className="additional-info-container">
        <div className="form-container">
          <div className="form-main-section">
            <div className="form-title-section">
              <span>almost there!</span>
            </div>
            <div className="form-center">
              <div className="left">
                <div className="profile-image-section">
                  <label htmlFor="profile-image">Profile Image</label>
                  <div className="profile-image-main">
                    <div className="image-container">
                      <img src={user.info&&user.info.userimg&&!preview?user.info.userimg:preview?preview:defaultUser} alt="user-img" />
                    </div>
                    <div className="button-container">
                      <input
                        type="file"
                        accept="image/*"
                        id="selectedFile"
                        style={{ display: "none" }}
                        onChange={getImage}
                      />
                      <button
                        type="button"
                        value="Upload"
                        onClick={() =>
                          document.getElementById("selectedFile").click()
                        }
                      >
                        upload
                      </button>
                      <button type="button"
                        onClick={removeImage}
                      >remove</button>
                    </div>
                  </div>
                </div>
                <div className="key-info-section">
                  <div className="form-item email">
                    <div className="input-left">
                      <label htmlFor="email">email*</label>
                      <input
                        className="text"
                        type="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={info.email}
                        onChange={e =>{
                          setInfo({
                            ...info,
                            email: e.currentTarget.value,
                          })
                          setIsEmailValidate(0)}
                        }
                        onBlur={e => checkValidation(e)}
                      />
                      <p>{checkValidStateValue(isEmailValidate)}</p>
                    </div>
                    <div className="input-right">
                      <FontAwesomeIcon icon={isEmailValidate===1?faTimes:isEmailValidate===2?faCheck:null} />
                    </div>
                  </div>
                  <div className="form-item username">
                    <div className="input-left">
                      <label htmlFor="username">username*</label>
                      <input
                        className="text"
                        type="text"
                        name="username"
                        placeholder="Username"
                        defaultValue={info.username}
                        onChange={e =>{
                          console.log(e.currentTarget.value)
                          setInfo({
                            ...info,
                            username: e.currentTarget.value,
                      
                          }
                      
                          )
                          setIsUsernameValidate(0)}
                        }
                        onBlur={e => checkValidation(e)}
                      />
                      <p>{checkValidStateValue(isUsernameValidate)}</p>
                    </div>
                    <div className="input-right">                    
                      <FontAwesomeIcon icon={isUsernameValidate===1?faTimes:isUsernameValidate===2?faCheck:null} />

                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="form-item">
                  <label htmlFor="height">height</label>

                  <div className="height-input">
                    <input
                      className="text"
                      type="number"
                      min="60"
                      max="251"
                      defaultValue="160"
                      name="height"
                      onChange={e =>
                        setInfo({
                          ...info,
                          height: e.currentTarget.value,
                        })
                      }
                    />
                    cm
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="sex">sex</label>
                  <div className="radio">
                    <Form.Check
                      inline
                      label="men"
                      defaultChecked
                      type={"radio"}
                      name="group-sex"
                      value={true}
                      onClick={e =>
                        setInfo({
                          ...info,
                          sex: e.currentTarget.value,
                        })
                      }
                    />

                    <Form.Check
                      inline
                      label="women"
                      value={false}
                      name="group-sex"
                      type={"radio"}
                      onClick={e =>
                        setInfo({
                          ...info,
                          sex: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label htmlFor="height">Social ID</label>
                  <div className="form-item-social">
                    <label htmlFor="sns-instagram">
                      <FontAwesomeIcon
                        className="insta-icon"
                        icon={faInstagram}
                      />
                    </label>
                    <input
                      className="text"
                      type="text"
                      name="sns-instagram"
                      placeholder="Instagram"
                      onChange={e =>
                        setInfo({
                          ...info,
                          instaid: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-item-social">
                    <label htmlFor="sns-twitter">
                      <FontAwesomeIcon
                        style={{ color: "#00acee" }}
                        icon={faTwitter}
                      />
                    </label>
                    <input
                      className="text"
                      type="text"
                      placeholder="Twitter"
                      onChange={e =>
                        setInfo({
                          ...info,
                          twitterid: e.currentTarget.value,
                        })
                      }
                      name="sns-twitter"
                    />
                  </div>
                  <div className="form-item-social">
                    <label htmlFor="sns-pinterest">
                      <FontAwesomeIcon
                        style={{ color: "#F0002A" }}
                        icon={faPinterest}
                      />
                    </label>
                    <input
                      className="text"
                      type="text"
                      placeholder="Pinterest"
                      onChange={e =>
                        setInfo({
                          ...info,
                          pinterestid: e.currentTarget.value,
                        })
                      }
                      name="sns-pinterest"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="button-section">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

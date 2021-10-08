import { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styled from 'styled-components';
// import { GlobalStyle } from './globalStyles';
// import { Modal } from './Modal';
import Tab from './Tab';
import "./MyPage.scss";
import "./Tab.scss";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import defaultUser from "../../res/default-user.jpeg";
import { UserContext } from "../../common/UserContext";
import { sendImage } from "../../util/APIUtils";

// const Container = styled.div`
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #141414;
//   z-index: 10;
// `;

// const Button = styled.button`
//   min-width: 50px;
//   padding: 8px 18px;
//   border-radius: 4px;
//   border: none;
//   background: #321812;
//   color: #fff;
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 75px;
// `;

export default function MyPage () {
    const [showForm, setShowForm] = useState(false);
    const [showPassForm, setShowPassForm] = useState(false);
    const element = <FontAwesomeIcon icon={faCamera} />
    const [preview, setPreview] = useState(defaultUser);
    const {user} = useContext(UserContext)
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //   setShowModal(prev => !prev);
    // };
    useEffect(()=>{
        if(user.auth){
            setPreview(user.info.userimg)
        }
    },[user.auth])
    useEffect(()=>{
        if(user.auth){
            if(preview!==user.info.userimg){

                // sendImage(sendImageRequest).then(response=>setPreview(preview)).catch(err=>console.log(err))
           
            }
        }
    },[preview])
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
            
          }
        };
      };
    const removeImage = ()=>{
        if(window.confirm("프로필 사진을 지우겠습니까?")){
        setPreview(null)
        
      }
      else{
        return false;
      }
    }
    return(
        <div className="MyPage">
            <div className="Profile-change">
                <div className="Profile-nav"> 
                <div className="close">
                    <button type="button"
                    onClick={removeImage} style={{background:"none"}}>
                        <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="Profile-img">
                        <img src={preview?preview:defaultUser}/>
                    </div>
                    <div className="camera">
                        
                        <button   onClick={() =>
                          document.getElementById("selectedFile").click()
                        } style={{background:"none"}}>
                            <FontAwesomeIcon icon={faCamera} />
                        </button >       
                           
                                <input onChange={getImage} type="file" style={{display:"none"}} name="photo" accept="image/*" placeholder="photo" id="selectedFile"/>   
                            </div>
                  
                    <div className="P-edit-container">
                        <p className="username">{user.info?user.info.username:null}</p>
                        <p className="email">{user.info?user.info.email:null}</p>
                        <div style={showForm?{display:"block"}:{display:"none"}} className="Profile-edit">
                            <form action ="MyPage.js" method="POST" onSubmit="" >
                                <input type="text" name="height" placeholder="height"/>
                                <input type="text" name="nickname" placeholder="Nickname"/>
                                <input type="text" name="email" placeholder="Email"/>
                                
                                <button className="edit-save">저장</button>
                                <button onClick={(e)=>{e.preventDefault();setShowForm(false)}} className="edit-save">닫기</button>
                            </form>
                        </div>
                        <button onClick={setShowForm} className="P-edit-btn">내정보수정</button>
                        {/* <button onClick={()=>setShowForm(false)} className="P-edit-btn">내정보수정</button> */}
                        <div style={showPassForm?{display:"block"}:{display:"none"}} className="Password">
                            <form action ="Mypage.js" method="POST" onSubmit="">
                                <p><input type="password" name="password" placeholder="Password" /></p>
                                <p><input type="password" name="passwordNew" placeholder="PasswordNew" /></p>
                                <p><input type="password" name="passwordNewRe" placeholder="PasswordNewRe"/></p>
                                <button className="Pass-save">저장</button>
                                <button onClick={(e)=>{e.preventDefault();setShowPassForm(false)}} className="Pass-save">닫기</button>
                            </form>
                        </div>
                        <button onClick={setShowPassForm} className="Pass-btn">비밀번호 변경</button>
                    </div>
                    {/* <Button onClick={openModal}>정보수정</Button> */}
                    
                </div>
                <div className="Profile-show">
                    <div className="Tab">
                        <Tab/>
                    </div>
                </div>
           

            </div>     
        </div>

    )
  
};


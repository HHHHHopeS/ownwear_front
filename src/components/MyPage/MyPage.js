import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { GlobalStyle } from './globalStyles';
import { Modal } from './Modal';
import Tab from './Tab';
import "./MyPage.scss";
import "./Tab.scss";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

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
    // const [showModal, setShowModal] = useState(false);
    const element = <FontAwesomeIcon icon={faCamera} />
    // const openModal = () => {
    //   setShowModal(prev => !prev);
    // };
    return(
        <div className="MyPage">
            <div className="Profile-change">
                <div className="Profile-nav"> 
                    <div className="Profile-img">
                        {/* <i class="fas fa-camera xs"></i> */}
                            <faCamera/>
                            <label for="input-file">
                                <input type="file" name="photo" placeholder="photo" id="input-file"/>   
                            </label>
                            
                    </div>
                    <div className="P-edit-container">
                        <p className="Nickname">Present Nickname</p>
                        <div style={showForm?{display:"block"}:{display:"none"}} className="Profile-edit">
                            <form action ="MyPage.js" method="POST" onSubmit="" >
                                <p><input type="text" name="username" placeholder="Username"/></p>
                                <p><input type="text" name="nickname" placeholder="Nickname"/></p>
                                <p><input type="text" name="email" placeholder="Email"/></p>
                                <p><input type="number" name="phone" placeholder="Phone"/></p>
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


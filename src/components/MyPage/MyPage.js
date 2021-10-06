import { useEffect, useState } from "react";
import styled from 'styled-components';
import { GlobalStyle } from './globalStyles';
import { Modal } from './Modal';
import Tab from './Tab';
import "./MyPage.scss";
import "./Tab.scss";

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #141414;
  z-index: 10;
`;

const Button = styled.button`
  min-width: 50px;
  padding: 8px 18px;
  border-radius: 4px;
  border: none;
  background: #321812;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  float: right;
  margin-top: 120px;
`;

export default function MyPage () {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(prev => !prev);
    };
    return(
        <div className="MyPage">
            <div className="Profile-change"> 
                <div className="Profile-img"></div>
                <div className="Profile-info">
                    <div className="Profile-index">  
                        <ul>
                            <li>이름 : 김선호</li>
                            <li>닉네임 : 주희 남친</li>
                            <li>SNS : seon_ho</li>
                            <li>성별 : 남</li>
                            <li>키 : 185 </li>
                            <li>이메일 : seonho@naver.com</li>
                            
                        </ul>
                    </div>
                    <Button onClick={openModal}>정보수정</Button>
                </div>
                <Container>
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                    <GlobalStyle />
                </Container>
                <div className="Tab">
                    <Tab/>
                </div>
            </div>     
        </div>

    )
{/* 
                    <ul>
                        <li>이름 : 김선호</li>
                        <li>닉네임 : 주희 남친</li>
                        <li>전화번호 : 010-1234-5678</li>
                        <li>이메일 : seonho@naver.com</li>
                        <li>성별 : 남</li>
                        <li>생년월일 : 86.05.08</li>
                    </ul>
                    <input
                    placeholder ="닉네임"/>
                    <button>정보수정</button> */}
{/* 
                <div class="Profile-infor" id="modal">
                    <div class="modal">
                    <button class="close-btn" id="close">
                        <i class="fa fa-times"></i>
                    </button>
                    <div class="modal-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div class="modal-content">
                        <p>Register with us to get offers, support and more</p>
                        <form class="modal-form">
                        <div>
                            <label for="name">Name</label>
                            <input type="text" id="name" placeholder="Enter Name" class="form-input">
                            </input>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="Enter email" class="form-input">
                            </input>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" class="form-input">
                            </input>
                        </div>
                        <div>
                            <label for="password2">Confirm Password</label>
                            <input type="password" id="password2" placeholder="Confirm password" class="form-input">
                            </input>
                        </div>

                        <input type="submit" value="submit" class="submit-btn">
                        </input>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="Profile-follow">
                <ul>
                    <li>최근활동 탭으로 하고 싶은데 왜 안돼</li>
                </ul>
            </div>
        </div> */}
    // )
};


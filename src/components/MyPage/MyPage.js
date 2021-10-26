import { faInstagram, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAt, faCamera, faMars, faRuler, faTrash, faUser, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from "react";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import { getChangePassword, getInfo, updateImage } from "../../util/APIUtils";
import "./MyPage.scss";
// import styled from 'styled-components';
// import { GlobalStyle } from './globalStyles';
// import { Modal } from './Modal';
import Tab from './Tab';
import "./Tab.scss";





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

export default function MyPage() {
    const [showForm, setShowForm] = useState(false);
    const [showPassForm, setShowPassForm] = useState(false);
    const element = <FontAwesomeIcon icon={faCamera} />
    const [preview, setPreview] = useState(defaultUser);
    const { setCurrentUser,user } = useContext(UserContext)

    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //   setShowModal(prev => !prev);
    // };

    const submitinfo = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
        console.log(e.target[3].value)


        if(parseInt(e.target[0].value)||!e.target[0].value){
        const request =Object.assign({}, {...user.info,height:e.target[0].value, instaid:e.target[1].value, twitterid:e.target[2].value, pinterestid:e.target[3].value})

        getInfo(request).then(response =>{ if(response){
            setShowForm(false)
            Alert.success("정보가 변경되었습니다.")
        }})
        .catch(err => console.log(err))

      
        }
      
    else{
        alert("숫자아님")
    }}
    const submit = (e) => {
        e.preventDefault()
       

       

        if (newPassword === newRePassword) {
            console.log("green")
            console.log(user)

            const request = Object.assign({}, { userid: user.info.userid, pw: inputs.password,newPw:inputs.newPassword})



            

            
            getChangePassword(request).then(response => {
                
               if(response){
                setShowPassForm(false,Alert.success("비밀번호가 변경되었습니다."))   
                
               }
               else{
                   console.log(response)
                
                   Alert.error("현재 비밀번호가 잘못되었습니다.")
               }
               

                // if (response.ok) {
                //     console.log(response.ok) 
                //     alert("비밀번호 변경완료") }
                //     else{
                //         console.log(response)
                //     }
            }).catch(err => console.log(err))
        } else if (newPassword != newRePassword) {

            alert("새비밀번호 확인부탁")
        }
    }
    

    const [inputs, setInputs] = useState({
        password: "",
        newPassword: "",
        newRePassword: ""
    })
    const [cameraActive,setCameraActive] = useState(false)
    const { password, newPassword, newRePassword } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        })
        console.log("password : " + password)
        console.log("newPassword : " + newPassword)
        console.log("newRePassword : " + newRePassword)
    }

    useEffect(() => {
        if (user.info) {
            setPreview(user.info.userimg)

        }
    }, [user.info])
    useEffect(() => {
        if (user.auth) {
            

            if (preview!=defaultUser&&preview !== user.info.userimg) {
                
                const req = Object.assign({},{...user.info,userimg:preview})
                updateImage(req).then(response=>setCurrentUser(response))
                // sendImage(sendImageRequest).then(response=>setPreview(preview)).catch(err=>console.log(err))

            }
        }
    }, [preview])
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
    const removeImage = () => {
        if (window.confirm("프로필 사진을 지우겠습니까?")) {
            setPreview(null)

        }
        else {
            return false;
        }
    }
    return (
        <div className="MyPage">
            <div className="profile-change">
                <div className="profile-nav">
                    <div className="close">
                        
                    </div>
                    <div className="profile-img">
                        <img src={preview ? preview : defaultUser} />
                    </div>
                    <div onMouseOver={setCameraActive} onMouseOut={e=>setCameraActive(false)} className="camera">

                        <button onClick={() =>
                            document.getElementById("selectedFile").click()
                        } style={{ background: "none" }}>
                            <FontAwesomeIcon icon={faCamera} />
                        </button >

                        <input onChange={getImage} type="file" style={{ display: "none" }} name="photo" accept="image/*" placeholder="photo" id="selectedFile" />
                        <button  type="button" className={cameraActive&&preview?"close-button active":"close-button"}
                            onClick={removeImage} style={{ background: "none" }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>

                    <div className="p-edit-container">
                        <p className="username"><FontAwesomeIcon icon={faUser}/>     {user.info ? user.info.username : null}</p>
                        <p className="email"><FontAwesomeIcon icon={faAt}/> {user.info ? user.info.email : null}</p>
                        <p className="sex"><FontAwesomeIcon icon={user.info && user.info.sex? faMars:faVenus}/>{user.info&& user.info.sex?"male":"female"}</p>
                        <div style={showForm ? { display: "block" } : { display: "none" }} className="profile-edit">
                            <form  onSubmit={submitinfo} >
                                
                                <div className="input-container">
                                    <span><FontAwesomeIcon icon={faRuler}/></span>
                                    <input type="text" name="height" defaultValue={user.info ? user.info.height : null} placeholder="height" />
                                </div>

                                
                                <div className="input-container">
                                    <span><FontAwesomeIcon icon={faInstagram}/></span>
                                    <input type="text" name="insta" defaultValue={user.info ? user.info.instaid : null} placeholder="instagram" />
                                    
                                </div>
                                <div className="input-container">
                                    <span><FontAwesomeIcon icon={faTwitter}/></span>
                                    <input type="text" name="twitter" defaultValue={user.info ? user.info.twitterid : null} placeholder="Twitter" />
                                    
                                </div>
                                <div className="input-container">
                                    <span><FontAwesomeIcon icon={faPinterest}/></span>
                                    <input type="text" name="pinterest" defaultValue={user.info ? user.info.pinterestid : null} placeholder="Pinterest" />
                                    
                                </div><div className="btt">
                                    <button type="submit" className="edit-save">저장</button>
                                    <button onClick={(e) => { e.preventDefault(); setShowForm(false) }} className="edit-save">닫기</button>
                                </div>
                            </form>
                        </div>
                        <button onClick={setShowForm} className="p-edit-btn">내정보수정</button>
                        {/* <button onClick={()=>setShowForm(false)} className="p-edit-btn">내정보수정</button> */}
                        <div style={showPassForm ? { display: "block" } : { display: "none" }} className="password">
                            <form action="Mypage.js" method="POST" onSubmit={submit}>
                                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
                                <input type="password" name="newPassword" placeholder="PasswordNew" value={newPassword} onChange={onChange} />
                                <input type="password" name="newRePassword" placeholder="PasswordNewRe" value={newRePassword} onChange={onChange} />

                                <div className="btt">
                                    <button onSubmit={submit} className="pass-save">저장</button>
                                    <button onClick={(e) => { e.preventDefault(); setShowPassForm(false) }} className="pass-save">닫기</button>
                                </div>
                            </form>

                        </div>
                        <button onClick={setShowPassForm} className="pass-btn">비밀번호 변경</button>
                    </div>
                    {/* <Button onClick={openModal}>정보수정</Button> */}

                </div>
                <div className="profile-show">
                    <div className="tab">
                        <Tab />
                    </div>
                </div>


            </div>
        </div>

    )

};


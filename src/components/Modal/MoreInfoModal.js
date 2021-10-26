import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import { updateAdditonalData } from "../../util/APIUtils";

export default function MoreInfoModal(props) {
    const [preview,setPreview] = useState(null)
    const {setCurrentUser,user} = useContext(UserContext)
    const array = Array.from({length:90},(x,i)=>({value:i+130,label:i+130+"cm"}))
    const selectStyles =  {
        input:(p,s)=>({
            ...p,width:100
        })
    }
    const setToggleMoreInfo = props.setToggleMoreInfo
    const [userimg,setUserimg] = useState(null)
    
    const imgupload= (e)=>{
        const [file] = e.currentTarget.files;
        
     const reader = new FileReader();
        if (file) {
        reader.readAsBinaryString(file);
        
        }
        reader.onload = () => {
            const fileRes = Buffer.from(reader.result, "binary").toString("base64");
            
            if (fileRes) {
              setPreview(`data:${file.type};base64,${fileRes}`);
              setUserimg(`data:${file.type};base64,${fileRes}`)
            }
          };
    }
    
    const submit = (e)=>{
        e.preventDefault();

        const instaid = e.target[2].value
        const pinterestid = e.target[3].value
        const twitterid = e.target[4].value
        const height = e.target[5].parentElement.children[0].innerText.split("cm")[0]
        let sex = e.target[6].parentElement.children[0].innerText
        if(sex==="male"){
            sex=true
        }
        else{
            sex=false
        }
        const request = Object.assign({},{...user.info,userimg,instaid,pinterestid,twitterid,height,sex})
        console.log(request)
        updateAdditonalData(request).then(res=>setCurrentUser(res,setToggleMoreInfo(false)))
    }

    return(
        <div className="MoreInfoModal">
            <Modal className="info-modal" {...props}>
                <Modal.Header>
                    <Modal.Title>추가정보를 입력해주세요</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <form id="add-form" onSubmit={submit}>
                    <div className="img-section">
                        <img src={user.info&&user.info.userimg&&!preview?user.info.userimg:preview?preview:defaultUser} alt="" />
                    <input
                        type="file"
                        accept="image/*"
                        id="imguploader"
                        style={{ display: "none" }}
                        onChange={imgupload}
                      />
                      <button
                        type="button"
                        value="Upload"
                        onClick={()=>
                            document.getElementById("imguploader").click()
                        }
                      >
                        upload
                      </button>
                    
                    </div>
                    <div className="info-section">
                    <div className="sns-input-container">
                            <div className="title"><span>SNS</span></div>
                            <input type="text"   defaultValue={user.info&&user.info.instaid?user.info.instaid:null} placeholder="Instagram"/>
                            <input type="text"  defaultValue={user.info&&user.info.instaid?user.info.pinterestid:null} placeholder="Pinterest"/>
                            <input type="text"   defaultValue={user.info&&user.info.instaid?user.info.twitterid:null} placeholder="Twitter"/>
                        </div>
                        <div className="height-sex-input-container">
                            
                        <Select placeholder={"Height"} isSearchable={false} defaultValue={user.info&&user.info.height?{value:user.info.height,label:user.info.height+"cm"}:null}   options={[...array]}></Select>
                        <Select placeholder={"Sex"} isSearchable={false} defaultValue={user.info&&user.info.sex?{value:true,label:"male"}:{value:false,label:'female'}} options={[{value:false,label:"female"},{value:true,label:"male"}]}></Select>
                                
                                    
                         

                        </div>
                        
                        
                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" form="add-form" >submit</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

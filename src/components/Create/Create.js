import { useContext, useEffect, useState } from "react";
import Alert from "react-s-alert";
import TextTransition, { presets } from "react-text-transition";
import { UserContext } from "../../common/UserContext";
import { getCurrentUser } from "../../util/APIUtils";
import "./Create.scss";
import ImageUploadModule from "./ImageUploadModule";
export default function Create(props) {
  const {user,setCurrentUser} = useContext(UserContext)
  const [phase,setPhase] = useState({
    phaseNo:0,
    phaseTitle:["upload Image!","crop Image!","verifying","select Tag you want","searching","edit your tag","add hashtag","sending","complete!"]
  })
  const [uploadedImage,setUploadedImage] = useState(null)
    useEffect(
     ()=>{
        if(!user.auth){
          getCurrentUser().then(response=>{
            setCurrentUser(response)
          }).catch(err=>{
            Alert.error("please login first!")
            props.history.push("/login") 
          })
          
        }
        
     }
     
    )
    
    
    

    return (
      
      <div className="Create">
        
        <div className="create-title-container">
          <div className="slide-content-container">
            <div className={"phase-"+phase.phaseNo}>
              <span className="phase-title">
                <TextTransition text={phase.phaseTitle[phase.phaseNo]} springConfig={presets.default}/ >
              
              </span>
            </div>
          </div>
        </div>
        <div className="create-main-container">
          
          
          {/* {phase.phaseNo===2||phase.phaseNo===4?
          <img src={loading} alt="" /> :null} */}
          
          
            <div className="img-container">
              <ImageUploadModule phase={phase} setPhase={setPhase}></ImageUploadModule>
              
            </div>
          
          
          
        
        </div>
       
        
  
      </div>
    
    );
  
  

}

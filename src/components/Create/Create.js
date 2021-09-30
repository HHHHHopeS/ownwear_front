import "./Create.scss";
import { useContext,useEffect,useState } from "react";
import { UserContext } from "../../common/UserContext";
import TextTransition ,{presets} from "react-text-transition"
import { getCurrentUser } from "../../util/APIUtils";
import loading from "../../res/loading.gif"
import Alert from "react-s-alert"
import ImageUploadModule from "./ImageUploadModule"
export default function Create(props) {
  const {user,setCurrentUser} = useContext(UserContext)
  const [phase,setPhase] = useState({
    phaseNo:0,
    phaseTitle:["upload Image!","crop Image!","verifying","select Tag you want","searching","edit your tag","add hashtag","complete"]
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
          
          
          {phase.phaseNo===2||phase.phaseNo===4?
          <img src={loading} alt="" /> :null}
          
          
            <div className="img-container">
              <ImageUploadModule phase={phase} setPhase={setPhase}></ImageUploadModule>
              
            </div>
          
          
          
        
        </div>
        <div className="create-sub-container">
        {phase.phaseNo>0?<button onClick={()=>setPhase({...phase,phaseNo:phase.phaseNo-1})}>
          minus
        </button>:null}
        {phase.phaseNo<7?
        <button onClick={()=>setPhase({...phase,phaseNo:phase.phaseNo+1})}>
          plus
        </button>:null}
        
        {/* phase.phaseNo===0?
          <div>im image0</div>
          :
          phase.phaseNo===1?
          <div>im image1</div>
          :
          phase.phaseNo===3?
          <div>im image3</div>
          :
          phase.phaseNo===5?
          <div>im image5</div>
          :
          phase.phaseNo===6?
          <div>im image6</div>
          :
          
          <div>im image7</div> */}
        </div>
        
  
      </div>
    
    );
  
  

}

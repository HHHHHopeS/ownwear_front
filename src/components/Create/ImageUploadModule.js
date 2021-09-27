import { useState } from "react";
import ReactCrop from 'react-image-crop';
import "./ImageUploadModule.scss";
import 'react-image-crop/src/ReactCrop.scss'


export default function Upload(props) {
    const [highlight, setHighlight] = useState(false);
    const [preview, setPreview] = useState("");
    const [drop, setDrop] = useState(false);
    const [crop,setCrop] = useState({
        unit:'%',
        keepSelection:true,
        locked:true,
        width:100,
        aspect:3/4})
    console.log(crop)
    const phase = props.phase
    const setPhase = props.setPhase
    const handleEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("enter!");
        
      preview === "" && setHighlight(true);
    };
  
    const handleOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("over!");
  
      preview === "" && setHighlight(true);
    };
  
    const handleLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("leave!");
      setHighlight(false);
    };
  
    const handleUpload = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("drop!");
      setHighlight(false);
      setDrop(true);
  
      const [file] = e.target.files || e.dataTransfer.files;
  
      uploadFile(file);
    };
  
    function uploadFile(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
  
      reader.onload = () => {
        // this is the base64 data
        const fileRes = btoa(reader.result);
        console.log(`data:image/jpg;base64,${fileRes}`);
        setPreview(`data:image/jpg;base64,${fileRes}`);
        setPhase({...phase,phaseNo:1})
      };
  
      reader.onerror = () => {
        console.log("There is a problem while uploading...");
      };
    }
  
    return (
      <>

        <div
          onDragEnter={(e) => handleEnter(e)}
          onDragLeave={(e) => handleLeave(e)}
          onDragOver={(e) => handleOver(e)}
          onDrop={(e) => handleUpload(e)}
          className={`upload${
            highlight ? " is-highlight" : drop ? " is-drop" : ""
          }`}
        //   style={{ backgroundImage: `url(${preview})` }}
        >
         <ReactCrop src={preview} crop={crop} onChange={newCrop => setCrop(newCrop)} />
          
        </div>
        <form className="my-form">
            <p>Drag and Drop image here</p>
            <div className="upload-button">
              <input
                type="file"
                className="upload-file"
                accept="image/*"
                onChange={(e) => handleUpload(e)}
              />
              
              <button className="button">
              {phase.phaseNo===0?
                  "Upload Here":"Reupload Image"
                }
                  </button>

            
            </div>
          </form>
      </>
    );
  };

 
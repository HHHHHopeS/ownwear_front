import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import Alert from "react-s-alert";
import { getClarifaiData } from "../../util/APIUtils";
import "./ImageUploadModule.scss";
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */

export default function Upload(props) {
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  const [drop, setDrop] = useState(false);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [rectors, setRectors] = useState([]);
  const imgRef = useRef();

  const previewCanvasRef = useRef();
  const [crop, setCrop] = useState(null);
  const phase = props.phase;
  const setPhase = props.setPhase;
  const handleEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");

    preview === "" && setHighlight(true);
  };
  useEffect(() => {
    if (crop) {
      setCompletedCrop(crop);
    }
  }, [crop]);
  const onLoad = useCallback(
    img => {
      imgRef.current = img;

      const aspect = 640 / 960;
      const width =
        img.width / aspect < img.height * aspect
          ? 100
          : ((img.height * aspect) / img.width) * 100;
      const height =
        img.width / aspect > img.height * aspect
          ? 100
          : ((img.width * aspect) / img.height) * 100;
      const y = (100 - height) / 2;
      const x = (100 - width) / 2;

      setCrop({ unit: "%", width, height, x, y, aspect });

      return false;
    },

    []
  );
  const handleOver = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over!");

    preview === "" && setHighlight(true);
  };

  const handleLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave!");
    setHighlight(false);
  };

  const handleUpload = e => {
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
    if (file) {
      reader.readAsBinaryString(file);
    }
    reader.onload = () => {
      // this is the base64 data
      const fileRes = btoa(reader.result);
      if (fileRes) {
        setPreview(`data:image/jpg;base64,${fileRes}`);
        setPhase({ ...phase, phaseNo: 1 });
      }
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
  }, [completedCrop]);
  useEffect(() => {
    switch (phase.phaseNo) {
      case 0:
        break;
      case 1:
        imgRef.current.hidden = false;
        previewCanvasRef.current.hidden = true;
        break;
      case 2:
        imgRef.current.hidden = true;
        previewCanvasRef.current.hidden = false;
        const base64 = previewCanvasRef.current.toDataURL();

        getClarifaiData(base64)
          .then(response => {
            console.log(response);
            if (response) {
                setRectors(response.regions)
              setPhase({ ...phase, phaseNo: 3 });
              
            }
          })
          .catch(err => {
            Alert.error("error!");
          });
        break;

      default:
        return false;
    }
  }, [phase.phaseNo]);
  function getCroppedImg(image, canv, crp) {
    const canvas = canv;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const crop = crp;

    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = (crop.width * pixelRatio * image.width) / 200;
    canvas.height = (crop.height * pixelRatio * image.height) / 200;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      ((crop.x * image.width) / 200) * scaleX * pixelRatio,
      ((crop.y * image.height) / 200) * scaleY * pixelRatio,
      ((crop.width * image.width) / 200) * scaleX * pixelRatio,
      ((crop.height * image.height) / 200) * scaleY * pixelRatio,
      0,
      0,
      (crop.width * image.width) / 200,
      (crop.height * image.height) / 200
    );

    if (ctx) {
      setPhase({ ...phase, phaseNo: 2 });

    }
  }

  return (
    <>
      <div
        onDragEnter={e => handleEnter(e)}
        onDragLeave={e => handleLeave(e)}
        onDragOver={e => handleOver(e)}
        onDrop={e => handleUpload(e)}
        className={`upload${
          highlight ? " is-highlight" : drop ? " is-drop" : ""
        }`}
      >
        <ReactCrop
          onComplete={(c, percentCrop) => {
            setCompletedCrop(percentCrop);
          }}
          ref={imgRef}
          src={preview}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(newCrop, newpercentCrop) => {
            setCrop(newpercentCrop);
          }}
        />
        <div className="img-section" style={phase.phaseNo===0||phase.phaseNo===1?{
    
        }:
        {width: "100%",
    height: "100%",
    justifyContent: "center",
    display: "flex",}}>
        <div style={phase.phaseNo>=2?{
            width:previewCanvasRef.current.width,
            height:previewCanvasRef.current.height
        }:null} className="img-container">
        <canvas ref={previewCanvasRef}></canvas>
        {phase.phaseNo === 3
          ? rectors.map(rector => {
              console.log(1)
              let mt = rector.regionInfo.boundingBox.topRow;
              let ml = rector.regionInfo.boundingBox.leftCol;
              let mr = rector.regionInfo.boundingBox.rightCol;
              let mb = rector.regionInfo.boundingBox.bottomRow;
              let tag = rector.data.concepts[0].name;
              const style = {
                backgroundPosition: `${ml * 100 + 16}% ${mb * 100 - 7}% `,
                position: "absolute",
                top: `${mt * 100}%`,
                left: `${ml * 100}%`,
                right: `${mr * 100}%`,
                bottom: `${mb * 100}%`,
                border: "1px black solid",
                width: `${(mr - ml) * 100}%`,
                height: `${(mb - mt) * 100}%`,
              };
              return (
                <div className="image-rector" style={style} key={tag}>
                  <button>{tag}</button>
                  
                </div>
                
              );
            })
          : null}
      </div>    
      </div>
        </div>
        
      <form className="my-form">
        <p>Drag and Drop image here</p>
        <div className="upload-button">
          <input
            type="file"
            className="upload-file"
            accept="image/*"
            onChange={e => handleUpload(e)}
          />

          <button
            onClick={
              phase.phaseNo === 2
                ? () => {
                    setCompletedCrop(null);
                    setPhase({ ...phase, phaseNo: 1 });
                  }
                : null
            }
            className="button"
          >
            {phase.phaseNo === 0 ? "Upload Here" : "Reupload Image"}
          </button>
        </div>
      </form>
      {phase.phaseNo === 1 ? (
        <button
          onClick={() =>
            getCroppedImg(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop
            )
          }
          className="button"
        >
          Crop Image
        </button>
      ) : null}
    </>
  );
}

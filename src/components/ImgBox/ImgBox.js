import {useState , useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons"
import { faCaretDown, faCaretUp, faHeart } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "./ImgBox.scss"

export default function ImgBox(props) {
    const data = props.data
    const [hover,setHover] = useState(false)
    const [imgHover,setImgHover] = useState(false)

    useEffect(()=>{
        
        
    },[hover])
    if(data){
        const tagX = data[0].tagData[0].rectorX
        const tagY = data[0].tagData[0].rectorY 
    return(

        <div className="ImgBox">
            <div className="img-container"
                onMouseOver={setImgHover}
                onMouseOut={()=>{
                    setImgHover(false);
                    
                    }}>
                <img src={ data[0].imgUrl} 
                    alt={data[0].imgIndex}  
                    style={imgHover? {opacity:0.5}:{opacity:1}}
                    />
                <div className="img-rector" style={imgHover?tagY>=0.6? { display:"flex",flexDirection:"column-reverse",top:`${tagY*100}%`
                ,left:`${tagX*100}%`}:{ display:"flex",flexDirection:"column",top:`${tagY*100}%`
                ,left:`${tagX*100}%`}:{display:"none"} } >

                        
                    
                    <div className="product-tag-container" style={tagX>=0.5?{marginLeft:"-90%",}:{marginLeft:""}}>
                    <FontAwesomeIcon icon={tagY>=0.6 ? faCaretDown: faCaretUp}  />
                        <div className="product-tag-info-section" style={tagY>=0.6? {marginTop:"-53px"}:{marginTop: "-10px"}} >
                        
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="info-container">
                <div className="profile-section">
                    <div className="profile-img-section" >
                        <Link to=""><img src={data[0].profileImgUrl} alt="sd" /></Link>
                    </div>
                    <div className="profile-info-section">
                        <span className="username">{data[0].userName}</span>
                        <span className="height">{data[0].height}cm</span>
                    </div>
                </div>
                <div className="button-section">
                    <button onMouseOver={setHover} onMouseOut={()=>{setHover(false)}} ><FontAwesomeIcon icon={hover? faHeart :emptyHeart} /></button>
                    <span>{data[0].likecount}</span>
                </div>
            </div>
        </div>
    )
}
return false 
}
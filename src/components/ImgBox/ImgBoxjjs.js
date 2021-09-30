import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons"
import { faCaretDown, faCaretUp, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ImgBoxjjs.scss"

export default function ImgBoxjjs(props) {
    const data = props.data
    const [hover,setHover] = useState(false)
    const [imgHover,setImgHover] = useState(false)

    useEffect(()=>{
        
    },[hover])

    if(data){
        const tagX = data[0].tagData[0].rectorX
        const tagY = data[0].tagData[0].rectorY 
    return(

        <div className="ImgBoxBig">
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

                        
                    
                    <div className="product-tag-container" >
                    <FontAwesomeIcon icon={tagY>=0.6 ? faCaretDown: faCaretUp}  />
                        <div className="product-tag-info-section" style={tagY>=0.6?tagX>=0.5? {marginTop:"-53px",marginLeft:"-90%"}:{marginTop:"-53px",marginLeft:"",flexDirection:"row-reverse"}:tagX>=0.5?{marginTop: "-10px",marginLeft:"-90%"}:{marginTop: "-10px",marginLeft:"",flexDirection:"row-reverse"}} >
                            <div className="product-tag-img-section">
                                <img src={data[0].tagData[0].productInfo.productImgUrl} alt="productUrl" />
                            </div>
                            <div className="product-tag-text-section">
                                <span className="product-name">{data[0].tagData[0].productInfo.brandName}</span>
                                <span className="product-price">{data[0].tagData[0].productInfo.price}원</span>
                            </div>
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
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons"
import { faCaretDown, faCaretUp, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AiOutlineMessage } from "react-icons/ai"
import { Link, useHistory } from "react-router-dom"
import defaultUser from "../../res/default-user.jpeg"
import "./ImgBox.scss"

export default function ImgBox(props) {
    const data = props.data
    const history = useHistory()
    const [hover,setHover] = useState(false)
    const [imgHover,setImgHover] = useState(false)
    useEffect(()=>{
    },[hover])

    if(data&&data.imgdata&&data.imgdata.tagData){
        const tagX = data.imgdata.tagData[0].rectorX
        const tagY = data.imgdata.tagData[0].rectorY
    return(

        <div className="ImgBox">
            <div onClick={()=>history.push("/detail/"+data.postid)} className="img-container"
                onMouseOver={setImgHover}
                onMouseOut={()=>{
                    setImgHover(false);
                    
                    }}>
                <img src={ data.imgdata.imgUrl}
                    alt="..."
                    // {data.imgIndex}
                    style={imgHover? {opacity:0.5}:{opacity:1}}
                    />
                    {window.innerWidth>1023?
                <div className="img-rector" style={imgHover?tagY>=0.6? { display:"flex",flexDirection:"column-reverse",top:`${tagY*100}%`
                ,left:`${tagX*100}%`}:{ display:"flex",flexDirection:"column",top:`${tagY*100}%`
                ,left:`${tagX*100}%`}:{display:"none"} } >

                        
                    
                    <div className="product-tag-container" >
                    
                    <FontAwesomeIcon icon={tagY>=0.6 ? faCaretDown: faCaretUp}  />
                        <div className="product-tag-info-section" style={tagY>=0.6?tagX>=0.5? {marginTop:"-53px",marginLeft:"-90%"}:{marginTop:"-53px",marginLeft:"",flexDirection:"row-reverse"}:tagX>=0.5?{marginTop: "-10px",marginLeft:"-90%"}:{marginTop: "-10px",marginLeft:"",flexDirection:"row-reverse"}} >
                            <div className="product-tag-img-section">
                                <img src={data.imgdata.tagData[0].productInfo.productImgUrl} alt="productUrl" />
                            </div>
                            <div className="product-tag-text-section">
                                <span className="product-name">{data.imgdata.tagData[0].productInfo.brandName}</span>
                                <span className="product-price">{data.imgdata.tagData[0].productInfo.price}원</span>
                            </div>
                        </div>
        
                    </div>
                </div>:null
                }
            </div>
        
            <div className="info-container">
                <div className="profile-section">
                    <div className="profile-img-section" >
                        <Link key={data.user.userimg} to={`/profile/${data.user.username}`}><img src={data.user.userimg?data.user.userimg:defaultUser} alt="sd" /></Link>
                    </div>
                    <div className="profile-info-section">
                        <Link to={"/profile/"+data.user.username}>{data.user.username}</Link>
                        <span className="height">{data.user.height}cm</span>
                    </div>
                </div>
                <div className="button-section">
                    <button onClick={()=>history.push("/detail/"+data.postid)}><AiOutlineMessage/></button>
                    <button onClick={()=>history.push("/detail/"+data.postid)} onMouseOver={setHover} onMouseOut={()=>{setHover(false)}} ><FontAwesomeIcon icon={hover? faHeart :emptyHeart} /></button>
                    {/* <span>{data.likecount}</span> */}
                </div>
            </div>
        </div>
    )
}
return false 
}
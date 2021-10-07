import "./Profile.scss"
import {useState,useEffect} from "react"
import { setAlertChecked } from "../../util/APIUtils"

export default function Profile() {
    const [isDataFinished,setIsDataFinished] = useState(false)
    const [contentCount,setContentCount] = useState(0)
    const [isGetToBottom,setIsGetToBottom] = useState(false)
    const [loading,setLoading] = useState(false)
    const [contents,setContents] = useState([])
    // 16

    useEffect(()=>{ 
        console.log(contentCount)
        if(isGetToBottom){
            setLoading(true)
            
            if(!isDataFinished&&loading){
                setContentCount(contentCount+1)
                
            }
            
        }
        if(!isGetToBottom&&!isDataFinished&&!loading){
            window.onscroll = function(e){
            if((window.innerHeight + document.documentElement.scrollTop)>=document.body.offsetHeight){
                
                setIsGetToBottom(true)
                return window.onscroll = null
            }
            
        }
    }
    if(!isDataFinished&&loading){
        let arr = [...contents,{data:"a"}]
        setContents(arr)
        
        
        
        
    }
    console.log(contentCount)
    if(contentCount===20){
        setIsDataFinished(true)
    }
    
    },[contentCount,isGetToBottom,loading,isDataFinished])
    useEffect(()=>{
        setLoading(false)
        
    },[])
    
    return(
        <div className="Profile">
            {contents.map(content=>(
            
            <div style={{width:"100%",height:"100vh"}} className="">
                <span>{content.data}</span>
            </div>
        
        ))}
        </div>
            )
};

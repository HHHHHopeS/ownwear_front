import { useEffect,useRef } from "react";
import { useLocation } from "react-router";

import _ from "lodash";

import { useScrollPosition } from "./ScrollContext";

export default function ScrollHandler() {
    const {getScrollPosition,setScrollPosition} = useScrollPosition()
    const location = useLocation()
    const pathnameRef = useRef(location.pathname)
    
    useEffect(()=>{
        const scrollY = getScrollPosition(pathnameRef.current)
        
        window.scrollTo(0,scrollY)
        const handleScroll = ()=>{
            setScrollPosition(pathnameRef.current,window.scrollY)
        }

        const debounceHandleScroll = _.debounce(handleScroll,250)
        window.addEventListener('scroll',debounceHandleScroll)
        return()=>{
            window.removeEventListener('scroll',debounceHandleScroll)
        }
    },[])
    
};

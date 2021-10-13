import { useContext,createContext,useState } from "react";

const ScrollPositionContext = createContext()

export const ScrollPosition = ({children}) =>{
    const [scrollPositions,setScrollPositions] = useState({})

    const setScrollPosition = (pathname,scrollY)=>{
        setScrollPositions(scrollPositions=>({...scrollPositions,[pathname]:{scrollY}}))
    }

    const getScrollPosition  = (pathname) =>{
        if(!scrollPositions[pathname]){
            setScrollPosition(pathname,0)
            return 0
        }
        return scrollPositions[pathname].scrollY
    }

    return (
        <ScrollPositionContext.Provider value={{setScrollPosition,getScrollPosition}}>
            {children}
        </ScrollPositionContext.Provider>
    )
    
}
export const useScrollPosition = ()=> useContext(ScrollPositionContext)
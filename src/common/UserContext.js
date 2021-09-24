import { createContext, useState } from "react";

export const UserContext = createContext()
export const UserProvider = ({children})=>{
    const [user,setUser] = useState({info:null,auth:false})

    const setCurrentUser = (userInfo) =>{
        if(userInfo){
            console.log(userInfo)
        setUser((user) => ({
            info: userInfo,
            auth:true,
        }))
    }
    else{

        setUser((user)=>({
            info:null,
            auth:false
        }))
    }
    }
    
    return(
        <UserContext.Provider value={{user,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}
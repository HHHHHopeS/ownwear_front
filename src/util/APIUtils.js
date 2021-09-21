import { ACCESS_TOKEN, API_BASE_URL } from "../constants";

// 기본 베이스 건들지마셈
const request = (options) =>{
    const headers = new Headers({
    "Content-Type":'application/json',
})
if(localStorage.getItem(ACCESS_TOKEN)){
    headers.append("Authorization","Bearer " + localStorage.getItem(ACCESS_TOKEN))
    
}
const defaults = {headers:headers};
options = Object.assign({},defaults,options)
return fetch(options.url,options).then(
    response=>
    response.json().then(json=>{
        if(!response.ok){
            return Promise.reject(json);
        }
        return json
    })
)
}

//현재 유저 정보 가져오기
export function getCurrentUser(){
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject("No access token set.");

    }
    return request ({
        url:API_BASE_URL + "/user/me",
        method: "get"        
    })

}

// 로그인
export function login(loginRequest){
    return request({
        url:API_BASE_URL+"/auth/login",
        method:"POST",
        body:JSON.stringify(loginRequest)
    })
}
export function signup(signupRequest){
    return request({
        url:API_BASE_URL+"/auth/signup",
        method:"POST",
        body:JSON.stringify(signupRequest)
    })
}

//좋아요 토글
export function toggleLike(toggleLikeRequest){
    return request({
        url:API_BASE_URL+"/toggleLike",
        method:"POST",
        body:JSON.stringify(toggleLikeRequest)
    })
}


//디테일페이지 

//초기 데이터 가져오기 
export function getDetailData(detailDataReqeust){
    return request({
        url:API_BASE_URL+"/getDetailData",
        method:"POST",
        body:JSON.stringify(detailDataReqeust)
    })
}
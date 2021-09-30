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




//디테일페이지 

//초기 데이터 가져오기 
export function getDetailData(detailDataReqeust){
    return request({
        url:API_BASE_URL+"/detail",
        method:"POST",
        body:JSON.stringify(detailDataReqeust)
    })
}


//좋아요 했는지 조회

export function getIsLike(getIsLikeRequest){
    return request({
        url:API_BASE_URL+"/checkIsLike",
        method:"POST",
        body:JSON.stringify(getIsLikeRequest)
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

//좋아요한 유저 목록 조회 (유저 권한은 필요 없을듯?)
export function getLikeUserList(LikeUserListRequest){
    return request({
        url:API_BASE_URL+"/getLikeUserList",
        method:"POST",
        body:JSON.stringify(LikeUserListRequest)
    })
}
// 댓글 추가 요청

export function fetchCreateComment(createCommentRequest){
    return request({
        url:API_BASE_URL+"/createComment",
        method:"POST",
        body:JSON.stringify(createCommentRequest)
    })
}

// 댓글 수정 요청

export function updateComment(updateCommentRequest){
    return request({
        url:API_BASE_URL+"/updateComment",
        method:"POST",
        body:JSON.stringify(updateCommentRequest)
    })
}
export function fetchDeleteComment(deleteCommentRequest){
    return request({
        url:API_BASE_URL+"/updateComment",
        method:"POST",
        body:JSON.stringify(deleteCommentRequest)
    })
}

//해시태그 자동완성 요청
export function hashtagAutoComplete(hashtagAutoCompleteRequest){
    return request({
        url:API_BASE_URL+"/hashtagAutoComplete",
        method:"POST",
        body:JSON.stringify(hashtagAutoCompleteRequest)
    })
}


//유저태그 자동완성 요청
export function usertagAutoComplete(usertagAutoCompleteRequest){
    return request({
        url:API_BASE_URL+"/usertagAutoComplete",
        method:"POST",
        body:JSON.stringify(usertagAutoCompleteRequest)
    })
}

//좋아요모달 팔로우

export function updateModalFollow(updateModalFollowRequest){
    return request({
        url:API_BASE_URL+"/usertagAutoComplete",
        method:"POST",
        body:JSON.stringify(updateModalFollowRequest)
    })
}


// clarifai 데이터 가져오기

export function getClarifaiData(getClarifaiDataRequest){
    return request({
        url:API_BASE_URL+"/getRectorData",
        method:"POST",
        body:getClarifaiDataRequest
    })
}

export function getGoogleData(getGoogleDataRequest){
    return request({
        url:API_BASE_URL+"/getGoogleData",
        method:"POST",
        body:JSON.stringify(getGoogleDataRequest)
    })
}
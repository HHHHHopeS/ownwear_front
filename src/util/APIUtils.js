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
console.log(options);
return fetch(options.url,options).then(
    response=>
    response.json()
).then(json=>json)
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
        url:API_BASE_URL+"/detail/"+detailDataReqeust.post_id,
        method:"POST",
        body:JSON.stringify(detailDataReqeust)
    })
}


//좋아요 했는지 조회

    export function getIsLike(getIsLikeRequest){
        return request({
            url:API_BASE_URL+"/like/check",
            method:"POST",
            body:JSON.stringify(getIsLikeRequest)
        })
    }


    //좋아요 토글
    export function toggleLike(toggleLikeRequest){
        return request({
            url:API_BASE_URL+"/like/toggle",
            method:"POST",
            body:JSON.stringify(toggleLikeRequest)
        })
    }

//좋아요한 유저 목록 조회 (유저 권한은 필요 없을듯?)
export function getLikeUserList(LikeUserListRequest){
    return request({
        url:API_BASE_URL+"/like/getlist",
        method:"POST",
        body:JSON.stringify(LikeUserListRequest)
    })
}
// 댓글 추가 요청

export function fetchCreateComment(createCommentRequest){
    return request({
        url:API_BASE_URL+"/comment/create",
        method:"POST",
        body:JSON.stringify(createCommentRequest)
    })
}

// 댓글 수정 요청

export function updateComment(updateCommentRequest){
    return request({
        url:API_BASE_URL+"/comment/update",
        method:"POST",
        body:JSON.stringify(updateCommentRequest)
    })
}
export function fetchDeleteComment(deleteCommentRequest){
    return request({
        url:API_BASE_URL+"/comment/update",
        method:"POST",
        body:JSON.stringify(deleteCommentRequest)
    })
}

//해시태그 자동완성 요청
export function hashtagAutoComplete(hashtagAutoCompleteRequest){
    return request({
        url:API_BASE_URL+"/hashtag/autocomplete",
        method:"POST",
        body:JSON.stringify(hashtagAutoCompleteRequest)
    })
}


//유저태그 자동완성 요청
export function usertagAutoComplete(usertagAutoCompleteRequest){
    return request({
        url:API_BASE_URL+"usertag/autocomplete",
        method:"POST",
        body:JSON.stringify(usertagAutoCompleteRequest)
    })
}

//좋아요모달 팔로우

export function updateModalFollow(updateModalFollowRequest){
    return request({
        url:API_BASE_URL+"usertag/autocomplete",
        method:"POST",
        body:JSON.stringify(updateModalFollowRequest)
    })
}

//페이징
export function getdata(getDataRequest){
    return request({
        url:API_BASE_URL+"/getdata",
        method:"POST",
        body:JSON.stringify(getDataRequest)
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
// google 상품 데이터 가져오기
export function getGoogleData(getGoogleDataRequest){
    return request({
        url:API_BASE_URL+"/getGoogleData",
        method:"POST",
        body:JSON.stringify(getGoogleDataRequest)
    })
}


//인덱스 게시물데이터
export function getIndexData(url,position){
    return request({
        url:API_BASE_URL+"/getlist/?url="+url+"&position="+position,
        method:"GET"
    })
}

//브랜드데이터
export function getBrandData(getBrandDataRequest){
    return request({
        url:API_BASE_URL+"/getBrandData",
        method:"POST",
        body:getBrandDataRequest
    })
}

//유저리스트
export function getHotUserData(getHotUserDataRequest){
    return request({
        url:API_BASE_URL+"/getHotUserData",
        method:"POST",
        body:getHotUserDataRequest
    })
}

// create 전송

export function insertImageData(insertImageDataReqeust){
    return request({
        url:API_BASE_URL+"/create",
        method:"POST",
        body:JSON.stringify(insertImageDataReqeust)
    })
}


export function sendImage(sendImageRequest){
    return request({
        url:API_BASE_URL+"/uploadImageFile",
        method:"POST",
        body:sendImageRequest
    })
}


// 이메일, 유저네임 중복확인

export function checkIsValid(checkIsValidRequest){
    return request({
        url:API_BASE_URL+"/validationCheck/",
        method:"POST",
        body:checkIsValidRequest
    })
}
export function updateAdditonalData(updateAdditonalDataRequest){
    return request({
        url:API_BASE_URL+"/user/update/oauth2",
        method:"POST",
        body:JSON.stringify(updateAdditonalDataRequest)
    })
}


// 알람 리스트 받아오기 

export function getAlertList(getAlertListRequestData){
    return request({
        url:API_BASE_URL+"/user/alert",
        method:"POST",
        body:getAlertListRequestData
    })
}

// 알람 읽음으로 체크
export function setAlertChecked(setAlertCheckedRequest){
    return request({
        url:API_BASE_URL+"/user/alert",
        method:"POST",
        body:setAlertCheckedRequest
    })
}

export function getAutoComplete(getAutoCompleteData){
    return request({
        url:API_BASE_URL+"autocomplete",
        method:"POST",
        body:JSON.stringify(getAutoCompleteData)
    })
}

//비밀번호 변경
export function getChangePassword(getChangePasswordData){
    return request({
        url:API_BASE_URL+"/changepassword",
        method:"POST",
        body:JSON.stringify(getChangePasswordData)
    })
}
export function getCheckPassword(getCheckPasswordData){
    return request({
        url:API_BASE_URL+"/checkpassword",
        method:"POST",
        body:JSON.stringify(getCheckPasswordData)
    })
}
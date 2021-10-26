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

export function getDetailData(postid){
    return request({
        url:API_BASE_URL+"/detail/"+postid,
        method:"get",

    })
}


//좋아요 했는지 조회

    export function getIsLike(userid,postid){
        return request({
            url:API_BASE_URL+"/detail/like/check?userid="+userid+"&postid="+postid,
            method:"get",

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


//팔로우 유저 목록 조회 (유저 권한은 필요 없을듯?) // 좋아요, 팔로워, 팔로잉 리스트 전부 통일
export function getUserList(getUserListRequest){
    return request({
        url:API_BASE_URL+"/user/modal",
        method:"POST",
        body:JSON.stringify(getUserListRequest)
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
export function fetchDeleteComment(fetchDeleteCommentRequest){
    return request({
        url:API_BASE_URL+"/comment/delete",
        method:"get",
        body:JSON.stringify(fetchDeleteCommentRequest)
    })
}

//해시태그 자동완성 요청
export function hashtagAutoComplete(data,type){
    return request({
        url:API_BASE_URL+"/index/AutoComplete/"+type+"?data="+data,
        method:"GET",

    })
}





//detail 페이지 delete
export function deleteDetailPage(deleteDetailPageRequest){
    return request({
        url:API_BASE_URL+"/detail/delete",
        method:"POST",
        body:JSON.stringify(deleteDetailPageRequest)
    })
}


//페이징
export function getdata(type,page,value){
    return request({
        url:API_BASE_URL+"/detail/postlist?type="+type+"&page="+page+"&value="+value,
        method:"get",

    })
}

export function getProfileData(username,pageno){
    return request({
        url:API_BASE_URL+"/user/"+username+"/posts/"+pageno,
        method:"get"
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


//인덱스 게시물추가데이터   /index/getindex로 바꿀것
export function getIndexMoreData(getIndexMoreDataRequest){
    return request({
        url:API_BASE_URL+"/index/getindex",
        method:"POST",
        body:JSON.stringify(getIndexMoreDataRequest)
    })
}
//인덱스 초기데이터
export function getIndexDataInit(url){
    return request({
        url:API_BASE_URL+"/index/getindex?url="+url,
        method:"GET",
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
        url:API_BASE_URL+"/detail/create",
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
        url:API_BASE_URL+"/user/mypage/updateImg",
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


//이거 보고 추가하셈

// 프로필 subnav 데이터 가져오기
export function getProfileSubNavData(current_userid,profile_username){
    return request({
        url:API_BASE_URL+"/user/"+profile_username+"?current_userid="+current_userid,
        method:"get",

    })
}

export function getDetailProfileSubNavData(current_userid,postid){
    return request({
        url:API_BASE_URL+"/detail/post/profile?current_userid="+current_userid+"&postid="+postid,
        method:"get",
    })
}

// 팔로우 토글 (모달포함 )

export function toggleFollow(current_userid,target_userid){
    return request ({
        url:API_BASE_URL+"/follow/toggle?target_userid="+target_userid+"&current_userid="+current_userid,
        method:"get",
    })
}


//자동완성
export function getAutoComplete(inputText,keyword){

    return request({
        url:API_BASE_URL+"/index/srchdata?keyword="+keyword+"&value="+inputText,

        method:"GET",
    })
}

//비밀번호 변경
export function getChangePassword(getChangePasswordData){
    return request({
        url:API_BASE_URL+"/user/updateprofile",
        method:"POST",
        body:JSON.stringify(getChangePasswordData)
    })
}
export function getCheckPassword(getCheckPasswordData){
    return request({
        url:API_BASE_URL+"/user/checkpw",
        method:"POST",
        body:JSON.stringify(getCheckPasswordData)

    })
}

// 랭킹페이지 리스트 불러오기
// type = like or brand or user
// filter = all or man or women ** brand filter always null
// count = page count 

// return 
// like.content = [post]
// user.content = [userinfo] 팔로잉 팔로워 카운트 포함 유저 프로필 subnav데이터 불러올때랑 완죤 똑같은 데이터유형
// brand.content = [brandinfo]
// brandinfo = {
//     brandname:,
//     postedcount: 브랜드 태깅한 포스트 카운트,
//     [post]: 태깅한 포스트 단 3개 순서는 최신순이던 인기순이던 상관 무,

// }
export function getRankingData(type,filter,count,current_userid){
    return request({
        url:API_BASE_URL+"/detail/ranking?type="+type+"&filter="+filter+"&page="+count+"&current_userid="+current_userid,
        method:"get"
    })

}
//최근활동
export function getActivity(username){
    return request({
        url:API_BASE_URL+"/activity/"+username,
        method:"get",
    
    })
}

//정보수정(키, SNS ID)
export function getInfo(getInfoData){
    return request({
        url:API_BASE_URL+"/user/mypage/update",
        method:"POST",
        body:JSON.stringify(getInfoData)

    })
}
//이미지 업로드

export function updateImage(updateImageRequest){
    return request({
        url:API_BASE_URL+"/user/mypage/updateImg",
        method:"POST",
        body:JSON.stringify(updateImageRequest)

    })

}
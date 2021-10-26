import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";
import { UserContext } from "../../common/UserContext";
import defaultUser from "../../res/default-user.jpeg";
import { toggleFollow } from "../../util/APIUtils";
export default function ListModal(props) {
  const title = props.title
  const show = props.show;
  const setShow = props.setShow;
  const userList = props.userList;
  const setUserList = props.setUserList;
  const modalLoading = props.modalLoading
  const history = useHistory()
  const handleClose = () => setShow(false);
  const {user} = useContext(UserContext);
  console.log(modalLoading)
  const controlFollow = (e, index, userid) => {
    const target = e.currentTarget;
    
    const toggleText=(el,obj,response)=>{
      const arr = userList.slice(0,userList.length)
      if(response){
        target.className="following"
        target.innerText="following"
        arr[index]={...arr[index],follower:arr[index].follower+1}
      }
      else{
        target.className="follow"
        target.innerText="follow"
        arr[index]={...arr[index],follower:arr[index].follower-1}
      }
      setUserList(arr)
    }
    let arr = [...userList];
    const obj = userList[index];
    if(user.auth){
      toggleFollow(user.info.userid,obj.user.userid).then(response => {
        
          toggleText(target,obj,response)
        
        
      }).catch(
          err=>{
            Alert.error("oops cannot follow")
          }
      );
    //   arr[index] = obj;
    //   console.log(arr)
    // setUserList(arr.slice(0,arr.length));
    } 
    
    else{
        Alert.error("Please Login First")
        setShow(false)
        history.push("/login")
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className="ListModal">
      <Modal.Header>
        <span>{title}</span>
        <button onClick={handleClose} className="btn-close"></button>
      </Modal.Header>
      <Modal.Body>
        {
          modalLoading?
          (
            <LoadingIndicator />
          ):
        userList.length>0 ? (
          userList.map((data, index) => (
            <div key={index} className="user-container">
            <div className="user-info-section">
              <div className="user-info-image">
                <Link onClick={()=>setShow(false)} to={"/profile/" + data.user.username}>
                  <img src={data.user.userimg?data.user.userimg:defaultUser} alt="" />
                </Link>
              </div>
              <div className="user-info-text">
                <Link onClick={()=>setShow(false)} to={"/profile/" + data.user.username}>
                  {data.user.username}
                </Link>
                <span>{data.follower} followers </span>
              </div>
            </div>
            <div className="user-follower-section">
              {data.isTrue ? (
                <button
                  onClick={e => {
                    controlFollow(e, index, data.user.userid);
                  }}
                  className="following"
                >
                  following
                </button>
              ) : (
                <button
                  onClick={e => {
                    controlFollow(e, index, data.user.userid);
                  }}
                  className="follow"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))
        ) : (
          <h1> no list</h1>
        )}
      </Modal.Body>
    </Modal>
  );
}

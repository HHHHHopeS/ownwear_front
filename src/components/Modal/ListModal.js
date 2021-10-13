import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import { getCurrentUser, toggleFollow } from "../../util/APIUtils";
export default function ListModal(props) {
  const title = props.title
  const show = props.show;
  const setShow = props.setShow;
  const userList = props.userList;
  const setUserList = props.setUserList;
  const history = useHistory()
  const handleClose = () => setShow(false);
  const {user} = useContext(UserContext);
  const controlFollow = (e, index, userid) => {
    const target = e.currentTarget;
    const toggleText=(el,obj)=>{
      if(el.className==="follow"){
        target.className="following"
        target.innerText="following"
        obj.follower+=1
      }
      else{
        target.className="follow"
        target.innerText="follow"
        obj.follower-=1
      }
    }
    let arr = [...userList];
    const obj = userList[index];
    if(user.auth){
      
      toggleFollow(user.info.userid,obj.userid).then(response => {
        if (response) {
          toggleText(target,obj)
        }
        else{
          console.log(response)
        }
        
      }).catch(
          err=>{
            Alert.error("oops cannot follow")
          }
      );
      arr[index] = obj;
    setUserList(arr);
    } 
    
    else{
        Alert.error("Please Login First")
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
        {userList.length > 0 ? (
          userList.map((user, index) => (
            <div key={index} className="user-container">
              <div className="user-info-section">
                <div className="user-info-image">
                  <Link to={"profile/" + user.username}>
                    <img src={user.userImg} alt="" />
                  </Link>
                </div>
                <div className="user-info-text">
                  <Link to={"profile/" + user.username}>
                    {user.username}
                  </Link>
                  <span>{user.follower} followers </span>
                </div>
              </div>
              <div className="user-follower-section">
                {/* follow trigger */}
                {user.isUserFollowed ? (
                  <button
                    onClick={e => {
                      controlFollow(e, index, user.userid);
                    }}
                    className="following"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      controlFollow(e, index, user.userid);
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

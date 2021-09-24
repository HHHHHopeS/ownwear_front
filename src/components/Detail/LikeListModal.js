import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import { updateModalFollow } from "../../util/APIUtils";
export default function LikeListModal(props) {
  const show = props.show;
  const setShow = props.setShow;
  const likeUserList = props.likeUserList;
  const setLikeUserList = props.setLikeUserList;
  const history = useHistory()
  const handleClose = () => setShow(false);
  const {user} = useContext(UserContext);
  const controlFollow = (e, index, userno) => {
    const target = e.currentTarget;
    let arr = [...likeUserList];
    const obj = likeUserList[index];
    if(user.auth){
    if (target.className === "follow") {
      const updateModalFollowRequest = Object.assign(
        {},
        { targetuserno: userno, userno: user.info.id, operator: "plus" }
      );
      updateModalFollow(updateModalFollowRequest).then(response => {
        if (response) {
          target.className = "following";
          target.innerText = "Following";
          obj.follower += 1;
        }
        
      }).catch(
          err=>{
            Alert.error("oops cannot follow")
          }
      );
    } else {
      const updateModalFollowRequest = Object.assign(
        {},
        { targetuserno: userno, userno: user.info.id, operator: "minus" }
      );
      updateModalFollow(updateModalFollowRequest).then(
          response =>{
            target.className = "follow";
            target.innerText = "Follow";
            obj.follower -= 1;
          }
      ).catch(err=>{
          Alert.error("oops cannot follow")
      });
      
    }




    arr[index] = obj;
    setLikeUserList(arr);
}
    else{
        Alert.error("Please Login First")
        history.push("/login")
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className="LikeListModal">
      <Modal.Header>
        <span>Likes</span>
        <button onClick={handleClose} className="btn-close"></button>
      </Modal.Header>
      <Modal.Body>
        {likeUserList.length > 0 ? (
          likeUserList.map((likeUser, index) => (
            <div className="user-container">
              <div className="user-info-section">
                <div className="user-info-image">
                  <Link to={"profile/" + likeUser.username}>
                    <img src={likeUser.userImg} alt="" />
                  </Link>
                </div>
                <div className="user-info-text">
                  <Link to={"profile/" + likeUser.username}>
                    {likeUser.username}
                  </Link>
                  <span>{likeUser.follower} followers </span>
                </div>
              </div>
              <div className="user-follower-section">
                {/* follow trigger */}
                {likeUser.isUserFollowed ? (
                  <button
                    onClick={e => {
                      controlFollow(e, index, likeUser.userno);
                    }}
                    className="following"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      controlFollow(e, index, likeUser.userno);
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
          <h1> no like list</h1>
        )}
      </Modal.Body>
    </Modal>
  );
}

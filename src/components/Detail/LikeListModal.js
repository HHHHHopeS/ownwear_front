import { useContext } from "react"
import { Modal } from "react-bootstrap"
import {Link} from "react-router-dom"
import { UserContext } from "../../common/UserContext"


export default function LikeListModal(props) {
    const show = props.show
    const setShow = props.setShow
    const likeUserList = props.likeUserList
    const handleClose =()=> setShow(false)
    const user = useContext(UserContext)

    return(
        <Modal show={show} onHide={handleClose} className="LikeListModal">
            <Modal.Body>
                {likeUserList.length>0?
                likeUserList.map(likeUser=>(
                 <div className="user-container">
                     <div className="user-info-section">
                        <div className="user-info-image">
                            <img src={likeUser.userImg} alt="" />
                        </div>
                        <div className="user-info-text">
                        <Link to={"profile/"+likeUser.username}>{likeUser.username}</Link>
                        <span>{likeUser.follower}</span>    
                        </div>
                     </div>
                     <div className="user-follower-section">
                         {/* follow trigger */}
                         {likeUser.isUserFollowed?
                         (<button className="following">Following</button>):(<button >Follow</button>)
                        }
                         
                     </div>
                 </div>   
                ))
                :<h1> no like list</h1>}
            </Modal.Body>
        </Modal>
    )
};

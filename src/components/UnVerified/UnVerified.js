import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../common/UserContext";
import "./UnVerified.scss";
import defaultUser from  "../../res/default-user.jpeg"
export default function UnVerified(props) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  if (user.auth) {
    if (user.info.isverified) {
      history.push("/");
    }
  } else {
    history.push("/login");
  }
  return (
    <div className="UnVerified">
      <div className="additional-info-container">
        <div className="form-container">
          <div className="form-title-section"></div>
          <div className="form-main-section">
              <div className="left">
                <div className="profile-image-section">
                    <img src={user.info.userimg?user.info.userimg:defaultUser} alt="user-img" /> 
                    
                </div>
                <div className="key-info-section">
                    
                </div>
              </div>
              <div className="right">

              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

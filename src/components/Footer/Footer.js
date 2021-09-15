import { faAppStoreIos, faGithub, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="footer-content">
        <div className="left-section">
          <div className="logo-section">
            <div className="logo">
              <h1>ownwear</h1>
            </div>
            <div className="copyright">
              <p>© 2021 h5pes, lnc.</p>
            </div>
          </div>
          <div className="contact-section">
            <p>서울특별시 금천구 가산동 426-5 월드메르디앙 2차 401호</p>
            <p>+82-(10)-8722-4828</p>
          </div>
          <div className="terms-section">
            <a href="#none">privacy</a>
            <a href="#none">terms</a>
            <a href="#none">contact</a>
          </div>
        </div>
        <div className="right-section">
          <div className="icon-section">
              <a href="#none"><FontAwesomeIcon icon={faGithub}/></a>
              <a href="#none"><FontAwesomeIcon icon={faGooglePlay}/></a>
              <a href="#none"><FontAwesomeIcon icon={faAppStoreIos}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

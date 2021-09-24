import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImgBox from "../ImgBox/ImgBox";
import "./Main.scss";

export default function Main(props) {
  const [data, setData] = useState(null);

  const [currentUrl, setCurrentUrl] = useState(null);

  const [brand, setBrand] = useState(null);

  const [hotuser, setHotuser] = useState(null);
  
  const address = "";

  const sampleBrand = [
    {"name":"Nike"},
    {"name":"MaisonKitsune"},
    {"name":"Dr.Martens"}
  ]

  const sampleUser = [
    {"nick":"aaa",
    "follow":"1,222,222"
  }
  ]

  //인기 브랜드
  useEffect(()=>{
    fetch(address)
    .then(response=>response.json())
    .then(data =>{
      setBrand(data)
    })
    .catch(error =>{

    })
  },[brand])

  
  //인기 유저
  useEffect(()=>{
    const list = []
    fetch(address)
    .then(response=>response.json())
    .then(data =>{
      setHotuser({list:data})
    })
    .catch(error =>{

    })
  },[hotuser])

  useEffect(() => {
    if (!data || currentUrl !== props.match.path) {
      switch (props.match.path) {
        case "/":
          setData([
            {
              imgIndex: 1,
              user: "abc",
              imgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
              likecount: 141,
              userName: "Winter-Aespa",
              height: 164,
              profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
              tagData: [
                {
                  rectorX: 0.5,
                  rectorY: 0.6,
                  productInfo: {
                    brandName: "MaisonKitsune",
                    category: "top",
                    productName: "green t-shirt",
                    productUrl:
                      "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                    productImgUrl:
                      "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                    price: 16500,
                  },
                },
              ],
            },
          ]);
          break;
        case "/men":
          setData([
            {
              imgIndex: 2,
              user: "abc",
              imgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
              likecount: 141,
              userName: "Winter-Aespa",
              height: 164,
              rdate: "2021-09-15",
              profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
              tagData: [
                {
                  rectorX: 0.432,
                  rectorY: 0.21,
                  productInfo: {
                    brandName: "MaisonKitsune",
                    category: "top",
                    productName: "green t-shirt",
                    productUrl:
                      "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                    productImgUrl:
                      "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                    price: 16500,
                  },
                },
              ],
            },
          ]);

          break;
        case "/women":
          setData([
            {
              imgIndex: 3,
              user: "abc",
              imgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
              likecount: 141,
              userName: "Winter-Aespa",
              height: 164,
              rdate: "2021-09-15",
              profileImgUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
              tagData: [
                {
                  rectorX: 0.125,
                  rectorY: 0.325,
                  productInfo: {
                    brandName: "MaisonKitsune",
                    category: "top",
                    productName: "green t-shirt",
                    productUrl:
                      "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                    productImgUrl:
                      "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                    price: 16500,
                  },
                },
              ],
            },
          ]);
          break;
        default:
          break;
      }
    }

    setCurrentUrl(props.match.path);
  }, [data, currentUrl, props.match.path]);

  return (
    <div className="Main">
      <div className="side-section">
        <div className="sidebar-container">
          <div className="sidebar-contentbox-container first">
              <span className="search-title">
                Search
              </span>
              <li><Link to="/"><button >코디찾기</button ></Link></li>
              <li><Link to="/"><button>유저검색</button></Link></li>
              <li><Link to="/"><button>제품검색</button></Link></li>
              <li><Link to="/"><button>브랜드찾기</button></Link></li>

              <div className="sidebar-content-section"></div>
          </div>
          <div className="sidebar-contentbox-container second">
            <span className="ranking-user">
              User
            </span>
            <ol>
              <li className="user-list">
                <div className="user-image">
                  <p className="user-profileImage">
                    <Link to="/userprofile"><img src="" alt="..."/></Link>
                  </p>
                </div>
                <div className="user-name">
                  <p className="user-profileName">username</p>
                  <p className="user-follow">1,000,000</p>
                </div>
              </li>
              <li className="user-list">
                <div className="user-image">
                  <p className="user-profileImage">
                    <Link to="/userprofile"><img src="" alt="..."/></Link>
                  </p>
                </div>
                <div className="user-name">
                  <p className="user-profileName">username</p>
                  <p className="user-follow">1,000,000</p>
                </div>
              </li>
            </ol>
            <div className="more-button-section">
              <button className="more">More</button>
            </div>
          </div>
          <div className="sidebar-contentbox-container third">
            <span className="brand-title">
                  Brand
            </span>
            <ol>
              <p className="brand-name">{sampleBrand[0].name}</p>
              <p className="brand-name">MaisonKitsune</p>
              <p className="brand-name">Dr.Martens</p>
            </ol>
            <div className="more-button-section">
              <button className="more">More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-section">
        <div className="list-section top-like">
          <div className="title-section">Top Likes</div>
          <span className="line"></span>
          <div className="imgbox-section">
            <ImgBox data={data} />
            <ImgBox data={data} />
            <ImgBox data={data} />
          </div>
          <div className="more-button-section">
            <button className="more">More</button>
          </div>
        </div>
        <div className="list-section prefered-tag1">
          <div className="title-section">Top Likes</div>
          <span className="line"></span>
          <div className="imgbox-section">
            <ImgBox data={data} />
            <ImgBox data={data} />
            <ImgBox data={data} />
          </div>
          <div className="more-button-section">
            <button className="more">More</button>
          </div>
        </div>
        <div className="list-section preferd-tag2n">
          <div className="title-section">Top Likes</div>
          <span className="line"></span>
          <div className="imgbox-section">
            <ImgBox data={data} />
            <ImgBox data={data} />
            <ImgBox data={data} />
          </div>
          <div className="more-button-section">
            <button className="more">More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./Main.scss";
import ImgBox from "../ImgBox/ImgBox";
import { Link } from "react-router-dom"
import { GiClothes } from 'react-icons/gi'
import { FaCameraRetro } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { BiFace } from "react-icons/bi";
import { VscBold } from "react-icons/vsc";
import { getIndexData } from "../../util/APIUtils"
import "./Main.scss";
import exPhoto from "../../res/iu.jpg";

export default function Main(props) {

  const [data, setData] = useState(null);

  const [currentUrl, setCurrentUrl] = useState(null);

  const winter = {
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
  }
  const gongyou = {
    imgIndex: 2,
    user: "abc",
    imgUrl:
      "https://image.ajunews.com/content/image/2016/11/28/20161128223905832496.jpg",
    likecount: 141,
    userName: "공유",
    height: 185,
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
  }
  const iu = {
    imgIndex: 1,
    user: "abc",
    imgUrl:
      exPhoto,
    likecount: 141,
    userName: "IU",
    height: 164,
    profileImgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_LAbna89nKNsUK8o6HKYB1_gocK2IqjniA&usqp=CAU",
    tagData: [
      {
        rectorX: 0.5,
        rectorY: 0.6,
        productInfo: {
          brandName: "Tombrown",
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
  }
  const sampleGongyou=[
    gongyou,gongyou,gongyou,gongyou,gongyou,gongyou
  ]
  const sampleIU = [
    iu, iu, iu, iu, iu, iu
  ]
  const sampleMoredata = [
    {
      imgIndex: 1,
      user: "abc",
      imgUrl:
        "https://pbs.twimg.com/media/C5_aBiPUoAAPtRm.jpg",
      likecount: 141,
      userName: "IU",
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
    {
      imgIndex: 2,
      user: "abc",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9c4hQnWkv0eB7FFWh2zAJxsmEFSGA4Cm3cQ&usqp=CAU",
      likecount: 141,
      userName: "song",
      height: 178,
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
    {
      imgIndex: 3,
      user: "abc",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wxmUpwYAtipUVmA4JZ4bWC0L9d30mGZxRQ&usqp=CAU",
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
            brandName: "Tombrown",
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
    {
      imgIndex: 4,
      user: "abc",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyVarTkwhXmX5_rMYmsFbfKur_vD83hDbEQ&usqp=CAU",
      likecount: 141,
      userName: "IU",
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
    {
      imgIndex: 5,
      user: "abc",
      imgUrl:
        "data:image/jpeg;base64,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",
      likecount: 141,
      userName: "IU",
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
    {
      imgIndex: 6,
      user: "abc",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakVMKjlmybjA9mZ4UeqIunBfMD-7m2wh8AQ&usqp=CAU",
      likecount: 141,
      userName: "IU",
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
    }
  ]

  const newsample = 
    {
      imgIndex:6,
      imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRakVMKjlmybjA9mZ4UeqIunBfMD-7m2wh8AQ&usqp=CAU",
      userName:"IU",
      height:164,
      profileImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
      tagData:[{
        rectorX:0.432,
        rectorY:0.21,
        productInfo:{
          productImgUrl:"http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
          brandName:"MaisonKitsune",
          price:123000
        }
      }],
    }
  // useEffect(() => {
  //   getIndexData().then(response => {
  //     setData(response.content)
  //     console.log(response)
  //     console.log(data)
  //   })
  // }, [JSON.stringify(data)])

  const scrollEvent = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 1800) {

    }
    if (scrollTop > 2500) {

    }
    if (scrollTop > 3300) {

    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
  }, [])

  useEffect(() => {
    if (!data || currentUrl !== props.match.path) {
      switch (props.match.path) {
        case "/":
          setData(
            newsample
          );
          break;
        case "/men": 
          setData(
            newsample
          );
          break;
        case "/women":
          setData(
            newsample
          );
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
          {/* <div className="sidebar-contentbox-container first">
            <span className="search-title">
              Search
            </span>
            <div className="sidebar-content-section">
              <ol>
                <p /><FaCameraRetro /><Link to="/">코디</Link>
                <p /><BiFace /><Link to="/">유저</Link>
                <p /><GiClothes /><Link to="/">제품</Link>
                <p /><VscBold /><Link to="/">브랜드</Link>
              </ol>
            </div>
          </div> */}
          <div className="sidebar-contentbox-container second">
            <div className="title-more-section">
              <div className="title">
                <span className="ranking-user">User</span>
              </div>
              <div className="more-button-section">
                <Link to="/">more</Link>
              </div>
            </div>
            <Hotuser />
          </div>
          <div className="sidebar-contentbox-container third">
            <div className="title-more-section">
              <div className="title">
                <span className="brand-title">Brand</span>
              </div>
              <div className="more-button-section">
                <Link to="/">more</Link>
              </div>
            </div>
            <ol>
              <HotBrand />
            </ol>
          </div>
          <div className="sidebar-contentbox-container fourth">
            <div className="title-more-section">
              <div className="title">
                <span className="brand-title">Category</span>
              </div>
              <div className="more-button-section">
                <Link to="/">more</Link>
              </div>
            </div>
            <ol>
              <p /><Link to="/">top</Link>
              <p /><Link to="/">shoes</Link>
            </ol>
          </div>
        </div>
      </div>

      <div className="container">
        {/* {getpost ?
          getpost => ( */}
            <div className="main-section">
              <div className="list-section">
                <div className="title-section">ranking</div>
                <span className="line"></span>
                <div className="imgbox-section">
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                </div>
                <div className="imgbox-section second">
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                </div>
                <div className="more-button-section">
                  <Link to={{ pathname: '/list/jjs', state: data }}>More</Link>
                </div>
              </div>
              <div className="list-section prefered-tag1">
                <div className="title-section">tag1</div>
                <span className="line"></span>
                <div className="imgbox-section">
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                </div>
                <div className="imgbox-section second">
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                </div>
                <div className="more-button-section">
                  <Link to={{ pathname: '/list/', state: data }}>More</Link>
                </div>
              </div>
              <div className="list-section preferd-tag2n">
                <div className="title-section">tag2</div>
                <span className="line"></span>
                <div className="imgbox-section">
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                  <ImgBox data={data} />
                </div>
                <div className="imgbox-section second">
                  <ImgBox data={data} />
                </div>
                <div className="more-button-section">
                  <Link to={{ pathname: '/list/jjs', state: data }}>More</Link>
                </div>
              </div>
            </div>
          {/* ) : null} */}
        <div className="loadmore-section">
          <div className="title-section">코디추천</div>
          <span className="line"></span>
          <div className="imgbox-section">
            <ImgBox data={data} />
            <ImgBox data={data} />
            <ImgBox data={data} />
          </div>
          <div className="imgbox-section second">
            <ImgBox data={data} />
            <ImgBox data={data} />
            <ImgBox data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
const HotBrand = () => {
  const [brand, setBrand] = useState([]);
  const sampleBrand = [
    { brand: "Nike" },
    { brand: "MaisonKitsune" },
    { brand: "Dr.Martens" }
  ]

  useEffect(() => {
    // const getBrandDataRequest='/getBrandData';
    // getBrandData(getBrandData).then(response=>{
    //   setBrand(response)
    // })
    setBrand(sampleBrand)
  }, [])

  return (
    <div>
      {brand.map((name) => (
        <Link key={name.brand} to="/"><p className="brand-name">{name.brand}</p></Link>
      ))}
    </div>
  )
}

const Hotuser = () => {
  const userIu = {
    username: "aaaaaa",
    follow: "1,222",
    userimage: "data:image/jpeg;base64,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"
  }
  const sampleUser = [
    {
      username: "IU",
      follow: "1,222,222",
      userimage: "data:image/jpeg;base64,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"
    }, userIu, userIu, userIu, userIu, userIu, userIu
  ]
  const [hotuser, setHotuser] = useState([]);

  useEffect(() => {
    // const getHotUserData='/getHotUserData';
    // getHotUserData(getHotUserData).then(response=>{
    //   setHotuser(response)
    // })
    setHotuser(sampleUser);
  }, [])

  return (
    <div className="hotuser-info">
      {
        hotuser.map((user) => (
          <div className="user">
            <div className="user-image">
              <Link key={user.username} to={
                `/profile/${user.username}`
              }><img src={user.userimage} alt="..." /></Link>
            </div>

            <div className="user-info">

              <span className="user-profileName">{user.username}</span>
              <div className="follow">
                <FiUserPlus /><span className="user-follow">{user.follow}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
import { useState, useEffect } from "react";
import Paging from "../../Paging/Paging";
import ImgBox from "../ImgBox/ImgBox";
import "./List.scss";
import Masonry from "react-masonry-css";
import {getdata} from "../../util/APIUtils"
import Alert from "react-s-alert";



export default function List(props) {
  
  const imgData = props.location.state;
  const [page,setPage]= useState(1)
  const [totalcount,setTotalcount] = useState(152)
  

  const [data, setData] = useState(
    [
      
    {
      imgIndex: 1,
      user: "abc",
      imgUrl:
        "https://news.nateimg.co.kr/orgImg/my/2020/11/27/202011270741372275_1.jpg",
      likecount: 14100,
      userName: "주희남자친구",
      height: 183,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2020/12/23/104600447.1.jpg",
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
        "https://cdnimage.dailian.co.kr/news/202012/news_1609137990_950347_m_2.jpeg",
      likecount: 1430,
      userName: "송강",
      height: 187,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://img.marieclairekorea.com/2020/11/mck_5fb7903729fa8.jpg",
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
        "https://i.pinimg.com/474x/58/c1/68/58c1686570907e3f1c39a88cab04f490.jpg",
      likecount: 15100,
      userName: "지민",
      height: 172,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://blog.kakaocdn.net/dn/bGsfPU/btqvMx9r8mN/X0oJFvGJDxH2BpkiL6jlXk/img.png",
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
      imgIndex: 4,
      user: "abc",
      imgUrl:
        "https://pbs.twimg.com/media/EkIlWRtVcAAEi4m.jpg",
      likecount: 15100,
      userName: "태형",
      height: 178,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://pbs.twimg.com/media/EU52waRUwAAj7VL.jpg",
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
        "https://t1.daumcdn.net/cfile/tistory/9998A44D5BCE848E12",
      likecount: 14100,
      userName: "박서준",
      height: 183,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDVfMjQw/MDAxNTgzMzc5ODc5ODEw.j7XNZ1YT-uDIm4hfcYGZtcHZjeSv5QOSNVK9a5Psvdgg.tTBHrJHdjyP1jTRa548mcKmTQTfd0GQIpJERRgbUtYEg.PNG.wonch888/image.png?type=w800",
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
        "https://pbs.twimg.com/media/ES-WzIRU4AAz4MX.jpg",
      likecount: 14100,
      userName: "주희남자친구",
      height: 183,
      rdate: "2021-09-15",
      profileImgUrl:
        "https://dimg.donga.com/wps/SPORTS/IMAGE/2020/12/23/104600447.1.jpg",
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
     
  ]

  );
  // response
//   {
//     totalcount:1521
//     ,
//   data:[
    
//   {
//     imgIndex: 1,
//     user: "abc",
//     imgUrl:
//       "https://news.nateimg.co.kr/orgImg/my/2020/11/27/202011270741372275_1.jpg",
//     likecount: 14100,
//     userName: "주희남자친구",
//     height: 183,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://dimg.donga.com/wps/SPORTS/IMAGE/2020/12/23/104600447.1.jpg",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
//   {
//     imgIndex: 2,
//     user: "abc",
//     imgUrl:
//       "https://cdnimage.dailian.co.kr/news/202012/news_1609137990_950347_m_2.jpeg",
//     likecount: 1430,
//     userName: "송강",
//     height: 187,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://img.marieclairekorea.com/2020/11/mck_5fb7903729fa8.jpg",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
//   {
//     imgIndex: 3,
//     user: "abc",
//     imgUrl:
//       "https://i.pinimg.com/474x/58/c1/68/58c1686570907e3f1c39a88cab04f490.jpg",
//     likecount: 15100,
//     userName: "지민",
//     height: 172,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://blog.kakaocdn.net/dn/bGsfPU/btqvMx9r8mN/X0oJFvGJDxH2BpkiL6jlXk/img.png",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
//   {
//     imgIndex: 4,
//     user: "abc",
//     imgUrl:
//       "https://pbs.twimg.com/media/EkIlWRtVcAAEi4m.jpg",
//     likecount: 15100,
//     userName: "태형",
//     height: 178,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://pbs.twimg.com/media/EU52waRUwAAj7VL.jpg",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
//   {
//     imgIndex: 5,
//     user: "abc",
//     imgUrl:
//       "https://t1.daumcdn.net/cfile/tistory/9998A44D5BCE848E12",
//     likecount: 14100,
//     userName: "박서준",
//     height: 183,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMDVfMjQw/MDAxNTgzMzc5ODc5ODEw.j7XNZ1YT-uDIm4hfcYGZtcHZjeSv5QOSNVK9a5Psvdgg.tTBHrJHdjyP1jTRa548mcKmTQTfd0GQIpJERRgbUtYEg.PNG.wonch888/image.png?type=w800",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
//   {
//     imgIndex: 6,
//     user: "abc",
//     imgUrl:
//       "https://pbs.twimg.com/media/ES-WzIRU4AAz4MX.jpg",
//     likecount: 14100,
//     userName: "주희남자친구",
//     height: 183,
//     rdate: "2021-09-15",
//     profileImgUrl:
//       "https://dimg.donga.com/wps/SPORTS/IMAGE/2020/12/23/104600447.1.jpg",
//     tagData: [
//       {
//         rectorX: 0.432,
//         rectorY: 0.21,
//         productInfo: {
//           brandName: "MaisonKitsune",
//           category: "top",
//           productName: "green t-shirt",
//           productUrl:
//             "http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
//           productImgUrl:
//             "http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
//           price: 16500,
//         },
//       },
//     ],
//   },
   
// ]
// }
  
  const pathName = props.location.pathname;

  const isHashtag = pathName.split("/")[2];
  const title = pathName.split("/")[3];
  const pageno = pathName.split("/")[4];
  // const totalFetch =() => {
  //   fetch(URL)
  //   .then(response => response.json())
  //   .then(body => {
  //     setData([...body.page]);
  //   })
  //   .catch(error => console.error('Error',error))
  // };

  
  useEffect(()=>{
    
    const getListDataRequest = Object.assign({},{
      isHashtag,  //해시태그 //프로필
      title, //해시태그 value #장준석 // user_id
      pageno // 0
    });
    getdata(getListDataRequest)
    .then(response => {
      setData(response.data)
    setTotalcount(response.totalcount);
    })
    .catch(err => {
      Alert.error("해당 페이지가 없습니다");
    });

    getdata(getListDataRequest).then(response=>setData(data)).catch(err=>console.log(err))
  },[pathName])
  useEffect(()=>{

    props.history.push(`/list/${isHashtag}/${title}/${page}`)
  },[page])





  return (
    <div className="List">
      <div className="list-section">
      {data ? data.map(img=>
        (<ImgBox data={img}></ImgBox>
      )):null}
</div>
<Paging page={page} totalcount={totalcount} setPage={setPage}/>
    </div>
  );

      }
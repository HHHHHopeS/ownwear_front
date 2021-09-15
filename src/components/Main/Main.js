import { useEffect, useState } from "react"
import "./Main.scss"
import ImgBox from "../ImgBox/ImgBox"




export default function Main(props) {
    
    
    
    const [data,setData] = useState(null)

    const [currentUrl,setCurrentUrl] = useState(null)

    useEffect(()=>{

        if(!data || currentUrl!==props.match.path){

            switch(props.match.path){
                case "/": setData([{
                    imgIndex:1,
                    user:"abc",
                    imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
                    likecount:141,
                    userName:"Winter-Aespa",
                    height:164,
                    profileImgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
                    tagData:[
                        {
                            rectorX:0.5,
                            rectorY:0.6,
                            productInfo:{
                                brandName:'MaisonKitsune',
                                category:'top',
                                productName:"green t-shirt",
                                productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                                productImgUrl:"http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                                price:16500
                            }
    
                        }
                    ]
                }]);break;
                case "/men":
                    setData([{
                        imgIndex:2,
                        user:"abc",
                        imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
                        likecount:141,
                        userName:"Winter-Aespa",
                        height:164,
                        rdate:"2021-09-15",
                        profileImgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
                        tagData:[
                            {
                                rectorX:0.432,
                                rectorY:0.21,
                                productInfo:{
                                    brandName:'MaisonKitsune',
                                    category:'top',
                                    productName:"green t-shirt",
                                    productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                                    productImgUrl:"http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                                    price:16500
                                }
        
                            }
                        ]
                    }])

                break;
                case "/women":
                    setData([{
                        imgIndex:3,
                        user:"abc",
                        imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
                        likecount:141,
                        userName:"Winter-Aespa",
                        height:164,
                        rdate:"2021-09-15",
                        profileImgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn36JZPyW1BmGR_QM8SRGpBL44mjr1yLwAFw&usqp=CAU",
                        tagData:[
                            {
                                rectorX:0.125,
                                rectorY:0.325,
                                productInfo:{
                                    brandName:'MaisonKitsune',
                                    category:'top',
                                    productName:"green t-shirt",
                                    productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                                    productImgUrl:"http://m.5pajamas.com/web/upload/NNEditor/20210507/860%200%20(2)_shop1_163525.jpg",
                                    price:16500
                                }
        
                            }
                        ]
                    }])
                     break;
                     default:break;
            }

        }
        
    

    setCurrentUrl(props.match.path)
    
},[data,currentUrl,props.match.path])
    





    return(
        <div className="Main">

            <div className="side-section">
            
            
            </div>
            <div className="main-section">
            <div className="first-section">
            <ImgBox data={data}/>
            <ImgBox data={data}/>
            <ImgBox data={data}/>
            </div>
            
            
            </div>

        </div>
    )
};



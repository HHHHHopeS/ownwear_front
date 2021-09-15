import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./Main.scss"


export default function Main(props) {
    const [isDataRendered,setIsDataRendered] = useState(false)
    const [data,setData] = useState(null)
    const history = useHistory()
    const [currentUrl,setCurrentUrl] = useState(null)

    useEffect(()=>{

        if(!data ||currentUrl!==props.match.path){
            console.log(props.match.path)
            switch(props.match.path){
                case "/": setData([{
                    imgIndex:1,
                    user:"abc",
                    imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
                    likecount:141,
                    profileImgUrl:"../../res/exPhoto.jpeg",
                    tagData:[
                        {
                            rectorX:0.4,
                            rectorY:0.5,
                            productInfo:{
                                brandName:'MaisonKitsune',
                                category:'top',
                                productName:"green t-shirt",
                                productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
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
                        profileImgUrl:"../../res/exPhoto.jpeg",
                        tagData:[
                            {
                                rectorX:0.4,
                                rectorY:0.5,
                                productInfo:{
                                    brandName:'MaisonKitsune',
                                    category:'top',
                                    productName:"green t-shirt",
                                    productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                                    price:16500
                                }
        
                            }
                        ]
                    }])
                    console.log("asdasd");
                break;
                case "/women":
                    setData([{
                        imgIndex:3,
                        user:"abc",
                        imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9r91yA63eVBG3-AT4Re3pwyqXNKb_ZgWjNx_CDj7IwnSxwG0lQQ-POHV-YjTQCHCJT6w&usqp=CAU",
                        likecount:141,
                        profileImgUrl:"../../res/exPhoto.jpeg",
                        tagData:[
                            {
                                rectorX:0.4,
                                rectorY:0.5,
                                productInfo:{
                                    brandName:'MaisonKitsune',
                                    category:'top',
                                    productName:"green t-shirt",
                                    productUrl:"http://m.5pajamas.com/product/detail.html?product_no=1151&cate_no=42&display_group=1",
                                    price:16500
                                }
        
                            }
                        ]
                    }])
                     break;
                     default:break;
            }

        }
        

    console.dir(data)

    setCurrentUrl(props.match.path)
    
})
    
    return(
        <div className="Main">

            <div className="side-section">
            <textarea name="" id="" cols="30" rows="10" value={data ? data[0].imgIndex : "none"}></textarea>

            </div>
            <div className="main-section">

            
            </div>

        </div>
    )
};


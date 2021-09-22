import { useEffect,useState } from "react"
import "./List.scss"
import ImgBox from "../ImgBox/ImgBox";

export default function List(props) {
    const [data, setData] = useState(null);


    useEffect(()=>{
        console.log(props.match.path)
        setData()
    })
    return(
        <div className="List">
            <div className="list-section">
                
            </div>
        </div>
    )
};

import { useEffect, useState } from "react"
import "./List.scss"
import ImgBox from "../ImgBox/ImgBox";

export default function List(props) {

  const imgData = props.location.state;
  const [data, setData] = useState();
  useEffect(()=>{
    setData(imgData);
  },[])

  console.log(data)
  return (
    <div className="List">
      <div className="list-section">
        <ImgBox data={data}/>
      </div>
    </div>
  )
};
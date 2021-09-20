import { useLocation } from "react-router"

export default function NotFound() {
    const location = useLocation();
    const cutlocation = location.search.split("=")
    console.log(cutlocation[1])

    return(
        <div className="NotFound">
            404!!!!
        </div>
    )
    
};

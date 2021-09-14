import "./Main.scss"
function Main(props) {
    
    
    
    return(
        <div className="Main">          
                <div className="List">
                <div className="side-section">
                
                {props.match.path}
            </div>
            <div className="main-section">
                123123
            </div>
            </div>

        </div>
    )
};
export default Main

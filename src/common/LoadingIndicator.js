import Loader from "react-loader-spinner";

export default function LoadingIndicator(props) {
  return (
    <div
      className="loading-indicator"
      style={{
        height: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "30px",
        fontWeight:"bold",
        
        
      }}
    >
      <Loader
        type="MutatingDots"
        color="#c0e7f6"
        secondaryColor="#bfd7ed"
        height={100}
        width={100}
      />
      Loading ...
    </div>
  );
}

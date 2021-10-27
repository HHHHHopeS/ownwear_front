import {
  faChevronLeft,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { useHistory } from "react-router";
import Alert from "react-s-alert";
import { UserContext } from "../../common/UserContext";
import {
  getClarifaiData,
  getGoogleData,
  hashtagAutoComplete,
  insertImageData,
  sendImage
} from "../../util/APIUtils";
import "./ImageUploadModule.scss";
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */

export default function Upload(props) {
  // props from parent component
  const phase = props.phase;
  const setPhase = props.setPhase;
  const { user } = useContext(UserContext);
  const history = useHistory();
  // usestate
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  const [drop, setDrop] = useState(false);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [rectors, setRectors] = useState({});
  const [croppedRectors, setCroppedRectors] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [crop, setCrop] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);
  const [activeInputFocus, setActiveInputFocus] = useState(false);

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // ref
  const imgRef = useRef();
  const previewImageRef = useRef();
  const previewCanvasRef = useRef();
  const tagContainerRef = useRef();
  const tagsRef = useRef();
  const hashTagInputRef = useRef();
  const productTagRef = useRef([]);
  productTagRef.current = productTags.map(
    (productTag, i) => productTagRef.current[i] ?? createRef()
  );
  const filterDuplicateCategory = filter => {
    if (
      filter[0].regionInfo.boundingBox.leftCol >
      filter[1].regionInfo.boundingBox.leftCol
    ) {
      filter[0].data.concepts[0].name = "shoes L";
      filter[1].data.concepts[0].name = "shoes R";
    } else {
      filter[1].data.concepts[0].name = "shoes L";
      filter[0].data.concepts[0].name = "shoes R";
    }
  };

  useEffect(() => {
    if (crop) {
      setCompletedCrop(crop);
    }
  }, [crop]);
  useEffect(() => {
    switch (phase.phaseNo) {
      case 0:
        break;
      case 1:
        imgRef.current.hidden = false;
        break;
      case 2:
        imgRef.current.hidden = true;
        const base64 = previewCanvasRef.current.toDataURL();
        const list = [];
        setPreviewImage({ data: base64 });
        //clarifai 데이터 요청
        getClarifaiData(base64)
          .then(response => {
            if (response) {
              const filter = response.regions.filter(
                region => region.data.concepts[0].name === "shoes"
              );
              if (filter.length > 0) {
                filterDuplicateCategory(filter);
              }
              response.regions.map(region => {
                for (let data of filter) {
                  if (JSON.stringify(data.regionInfo) === region.regionInfo) {
                    region = data;
                  }
                }

                if (region.value > 0.95) list.push(region);
                return false;
              });

              setRectors(list);

              setPhase({ ...phase, phaseNo: 3 });
            } else {
              console.log("결과가 없습니다.");
            }
            return false;
          })
          .catch(err => {
            console.log(err);
            Alert.error("error!");
          });
        break;
      case 3:
        tagsRef.current.style.width = "30%";
        const childs = document.querySelector(".tag-container").children;
        for (let child of childs) {
          child.style.display = "flex";
        }
        tagContainerRef.current.style.marginLeft = "0";
        break;
      case 5:
        tagContainerRef.current.style.marginLeft = "-100%";
        break;
      case 6:
        tagContainerRef.current.style.marginLeft = "-200%";
        break;
      default:
        return false;
    }
  }, [phase, phase.phaseNo, setPhase]);
  useEffect(() => {
    croppedRectors.map((croppedRector, index) => {
      getCroppedImgForTag(
        previewImageRef.current,

        document.querySelector(`.cropped-img-${index}`),
        croppedRector
      );
      return null;
    });
  }, [croppedRectors]);

  //이미지 로드
  const handleEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");

    preview === "" && setHighlight(true);
  };

  //이미지 로드 후 크롭영역 생성
  const onLoad = useCallback(
    img => {
      imgRef.current = img;

      const aspect = 640 / 960;
      const width =
        img.width / aspect < img.height * aspect
          ? 100
          : ((img.height * aspect) / img.width) * 100;
      const height =
        img.width / aspect > img.height * aspect
          ? 100
          : ((img.width * aspect) / img.height) * 100;
      const y = (100 - height) / 2;
      const x = (100 - width) / 2;

      setCrop({ unit: "%", width, height, x, y, aspect });

      return false;
    },

    []
  );
  const handleOver = e => {
    e.preventDefault();
    e.stopPropagation();
    preview === "" && setHighlight(true);
  };

  const handleLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleUpload = e => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(file);
  };

  function uploadFile(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsBinaryString(file);
    }
    reader.onload = () => {
      // this is the base64 data
      const fileRes = Buffer.from(reader.result, "binary").toString("base64");
      if (fileRes) {
        setPreview(`data:image/jpg;base64,${fileRes}`);
        setPhase({ ...phase, phaseNo: 1 });
      }
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }

  //이미지 크롭
  function getCroppedImg(image, canv, crp) {
    const canvas = canv;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const crop = crp;
    const ctx = canvas.getContext("2d");

    canvas.width = (crop.width * image.naturalWidth) / 100;

    canvas.height = (crop.height * image.naturalHeight) / 100;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      (crop.x * image.naturalWidth) / 100,
      (crop.y * image.naturalHeight) / 100,
      (crop.width * image.naturalWidth) / 100,
      (crop.height * image.naturalHeight) / 100,
      0,
      0,
      (crop.width * image.naturalWidth) / 100,
      (crop.height * image.naturalHeight) / 100
    );

    if (ctx) {
      previewImageRef.current.width = canvas.width / scaleX;

      previewImageRef.current.height = canvas.height / scaleY;

      return true;
    }
    return false;
  }
  //태그 이미지 크롭
  function getCroppedImgForTag(image, canv, crp) {
    const canvas = canv;

    console.log(image.naturalWidth);
    console.log(image.naturalHeight);

    const crop = crp;
    console.log(crop);
    const ctx = canvas.getContext("2d");

    canvas.width = (crop.width * image.naturalWidth) / 100;

    canvas.height = (crop.height * image.naturalHeight) / 100;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      (crop.x * image.naturalWidth) / 100,
      (crop.y * image.naturalHeight) / 100,
      (crop.width * image.naturalWidth) / 100,
      (crop.height * image.naturalHeight) / 100,
      0,
      0,
      (crop.width * image.naturalWidth) / 100,
      (crop.height * image.naturalHeight) / 100
    );

    if (ctx) {
      return true;
    }
    return false;
  }

  // 원하는 태그 선택하기
  function addCroppedRectors(e) {
    const el = e.currentTarget.parentElement;
    const label = e.currentTarget.innerText;
    const width = parseFloat(el.style.width.split("%")[0]);
    const height = parseFloat(el.style.height.split("%")[0]);
    const x = parseFloat(el.style.left.split("%")[0]);
    const y = parseFloat(el.style.top.split("%")[0]);
    const crop = {
      unit: "%",
      width,
      height,
      x,
      y,
      label,
    };

    function isInclude(arr, item) {
      let itemAsString = JSON.stringify(item);
      let contains = arr.some(el => {
        return JSON.stringify(el) === itemAsString;
      });
      return contains;
    }
    if (!isInclude(croppedRectors, crop)) {
      croppedRectors.push(crop);
      setCroppedRectors([...croppedRectors]);
    }
  }

  function backProgress() {
    if (phase.phaseNo === 6) {
      setPhase({ ...phase, phaseNo: phase.phaseNo - 1 });
    }
    if (phase.phaseNo === 5) {
      setPhase({ ...phase, phaseNo: phase.phaseNo - 3 });
    }
  }

  // 상품데이터 로딩
  function getProductData() {
    const base64List = [];
    const canvasList = document.getElementsByClassName("cropped");
    for (let canvas of canvasList) {
      base64List.push(canvas.toDataURL());
    }
    const dataRequest = Object.assign({}, { list: base64List });
    const arr = productTags.slice(0, productTags.length - 1);
    if (base64List.length > 0) {
      setPhase({ ...phase, phaseNo: 4 });
      getGoogleData(dataRequest)
        .then(response => {
          response.map(data =>
            arr.push(data.responses[0].productSearchResults.results)
          );
          setProductTags(arr);
          const indexes = [];
          for (let i = 0; i < rectors.length; i++) {
            for (let croppedRector of croppedRectors) {
              if (croppedRector.label === rectors[i].data.concepts[0].name) {
                indexes.push(i);
              } else if (
                croppedRector.label === "shoes L" &&
                rectors[i].data.concepts[0].name === "shoes R"
              ) {
                indexes.push(i);
              } else if (
                croppedRector.label === "shoes R" &&
                rectors[i].data.concepts[0].name === "shoes L"
              ) {
                indexes.push(i);
              }
            }
          }
          const rArr = [];
          for (let i = 0; i < rectors.length; i++) {
            if (indexes.includes(i)) {
              rArr.push(rectors[i]);
            }
          }
          setRectors(rArr);
          setPhase({ ...phase, phaseNo: 5 });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setPhase({ ...phase, phaseNo: 6 });
      setRectors([]);
    }
  }

  // 원하는 태그 제거
  function removeTag(e, croppedRector) {
    for (let i = 0; i < croppedRectors.length; i++) {
      if (JSON.stringify(croppedRectors[i]) === JSON.stringify(croppedRector)) {
        croppedRectors.splice(i, 1);
      }
      // console.log(e.currentTarget.parentElement.parentElement);

      setCroppedRectors(croppedRectors.slice(0, croppedRectors.length));
    }
  }

  // 상품리스트 토글 접기/펼치기
  function toggleExpand(e, container) {
    if (!e.currentTarget.classList.contains("active")) {
      document
        .querySelectorAll(".products-container-toggle.active")
        .forEach(el => el.classList.remove("active"));
      e.currentTarget.classList.add("active");
    } else {
      e.currentTarget.classList.remove("active");
    }
    if (container.classList.contains("active")) {
      container.classList.remove("active");
    } else {
      document
        .querySelectorAll(".products-container.active")
        .forEach(el => el.classList.remove("active"));
      container.classList.add("active");
    }
  }

  // 상품 선택시 이벤트
  function toggleSeleted(e, index) {
    document
      .querySelectorAll(`.product-box.selected.box-${index}`)
      .forEach(el => {
        el.classList.remove("selected");
        el.classList.add("non-selected");
      });
    e.currentTarget.classList.remove("non-selected");

    e.currentTarget.classList.add("selected");
    productTagRef.current[index].current.classList.remove("active");
    productTagRef.current[
      index
    ].current.children[1].children[0].classList.remove("active");

    // document.querySelectorAll(".product-box.non-selected").forEach(el=>el.style.top="0")
    // document.querySelectorAll(".product-box.non-selected")[0].style.top="100px"
  }

  // 상품태그 확정
  function confirmTag() {
    const selectedElement = document.querySelectorAll(".product-box.selected");

    console.log(rectors);
    console.log(productTags);
    console.log(croppedRectors);
    setTagData([]);

    function getEl(className, targetString) {
      return document.querySelector(`.${className} ${targetString}`);
    }
    for (let i = 0; i < croppedRectors.length; i++) {
      console.log(i);

      const className = selectedElement[i].classList.value.replaceAll(" ", ".");
      const rector = rectors.filter(
        rector => rector.data.concepts[0].name === croppedRectors[i].label
      );
      const boundingBox = rector[0].regionInfo.boundingBox;
      const rectorX =
        boundingBox.leftCol + (boundingBox.rightCol - boundingBox.leftCol) / 2;
      const rectorY =
        boundingBox.topRow + (boundingBox.bottomRow - boundingBox.topRow) / 2;
      let rectorX2 = null;
      let rectorY2 = null;
      if (
        rector[0].data.concepts[0].name === "shoes L" ||
        rector[0].data.concepts[0].name === "shoes R"
      ) {
        let rector2 = null;

        if (rector[0].data.concepts[0].name === "shoes L") {
          rector2 = rectors.filter(
            rector => rector.data.concepts[0].name === "shoes R"
          );
        } else {
          rector2 = rectors.filter(
            rector => rector.data.concepts[0].name === "shoes L"
          );
        }
        console.log(rector2);
        if(rector2.length>0){
        const boundingBox2 = rector2[0].regionInfo.boundingBox;
        rectorX2 =
          boundingBox2.leftCol +
          (boundingBox2.rightCol - boundingBox2.leftCol) / 2;
        rectorY2 =
          boundingBox2.topRow +
          (boundingBox2.bottomRow - boundingBox2.topRow) / 2;
        }
      }

      const brandName = getEl(className, ".product-brand").innerText;
      const productName = getEl(className, ".product-name span").title;
      const productUrl = getEl(className, ".product-name").href;
      const productImgUrl = getEl(className, ".product-image").src;
      const price = getEl(className, ".product-price").innerText;
      let productInfo = {
        brandName,
        productName,
        productUrl,
        productImgUrl,
        price,
      };
      let data = {
        rectorX,
        rectorY,
        rectorX2,
        rectorY2,
        productInfo,
      };
      tagData.push(data);
    }
    setTagData(tagData);
    setPhase({ ...phase, phaseNo: 6 });
  }

  function addHashTag(e, el) {
    console.log(e)
    document.querySelector(".hashtag-error").innerText = "";
    let tag = null;
    if (el) {
      tag = el.state.text;
    } else {
      tag = e.currentTarget.value;
    }

    const regExp = /[!?@#$%^&*():;+-=~{}<>[\]|\\"',./`₩]/g;
    // const regExp = /[!?@#$%^&*():;+-=~{}<>\[\]\|\\\"\'\,\.\/\`\₩]/g;
    var check = /[가-힣A-Za-z0-9_]{1,30}/;

    if (regExp.test(tag) !== true) {
      if (!tag.includes(" ")) {
        if (check.test(tag)) {
          if (!hashtagData.includes(tag)) {
            console.log(tag)
            console.log(hashtagData)
            setHashtagData([...hashtagData, tag]);
            document.querySelector(".hashtag-error").innerText =
              "태그가 추가 되었습니다.";
          } else {
            document.querySelector(".hashtag-error").innerText =
              "이미 있는 태그입니다.";
          }
        } else {
          document.querySelector(".hashtag-error").innerText =
            "한글은 자음 및 모음만 입력할 수 없습니다.";
        }
      } else {
        document.querySelector(".hashtag-error").innerText =
          "'_'를 제외한 공백, 특수문자는 입력할 수 없습니다.";
      }
    } else {
      document.querySelector(".hashtag-error").innerText =
        "'_'를 제외한 공백, 특수문자는 입력할 수 없습니다.";
    }
  }
  function removeHashtag(e) {
    const hashtag = e.currentTarget.className.substring(
      e.currentTarget.className.indexOf("-") + 1
    );
    console.log(hashtag);
    const hashtagDataCopied = hashtagData.splice(0, hashtagData.length);

    for (let i = 0; i < hashtagDataCopied.length; i++) {
      if (hashtag === hashtagDataCopied[i]) {
        hashtagDataCopied.splice(i, 1);
      }
    }

    setHashtagData(hashtagDataCopied);
  }
  function finishCreate() {
    const brands = [];
    tagData.map(tag => brands.push(tag.productInfo.brandName));
    // insertImageData()
    setPhase({ ...phase, phaseNo: 7 });
    sendImage(previewImageRef.current.src)
      .then(response => {
        let imgUrl = response.data;
        const imgData = {
          imgUrl,
          tagData,
        };
        
        const request = Object.assign(
          {},
          {
            user: { userid: user.info.userid },
            imgdata:imgData,
            hashtags: hashtagData,
            brands,
          }
        );
        insertImageData(request)
          .then(response =>
            setTimeout(() => history.push(`/detail/${response}`), 2000)
          )
          .catch(err => console.log(err));
        setPhase({ ...phase, phaseNo: 8 });
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <div className="upload-main-section">
        <div
          style={
            phase.phaseNo >= 1
              ? {
                  background: "none",

                  maxHeight: "100%",
                }
              : { width: "40%" }
          }
          onDragEnter={e => handleEnter(e)}
          onDragLeave={e => handleLeave(e)}
          onDragOver={e => handleOver(e)}
          onDrop={e => handleUpload(e)}
          className={`upload${
            highlight ? " is-highlight" : drop ? " is-drop" : ""
          }`}
        >
          {phase.phaseNo === 0 ? "이미지를 드래그 앤 드랍 하세요" : null}

          <ReactCrop
            onComplete={(c, percentCrop) => {
              setCompletedCrop(percentCrop);
            }}
            ref={imgRef}
            src={preview}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(newCrop, newpercentCrop) => {
              setCrop(newpercentCrop);
            }}
            style={phase.phaseNo > 1 ? { display: "none" } : {}}
          />
          <div
            className="img-section"
            style={
              phase.phaseNo === 0 || phase.phaseNo === 1
                ? {}
                : previewCanvasRef.current
                ? {
                    width: previewImageRef.current.width,
                    height: previewImageRef.current.height,
                    justifyContent: "end",
                    display: "flex",
                  }
                : null
            }
          >
            <div
              style={
                phase.phaseNo < 2
                  ? { display: "none" }
                  : previewImageRef.current
                  ? {
                      width: previewImageRef.current.width,
                      height: previewImageRef.current.height,
                    }
                  : null
              }
              className={completedCrop ? "img-box active" : "img-box"}
            >
              <canvas hidden={true} ref={previewCanvasRef}></canvas>
              <img
                ref={previewImageRef}
                src={
                  previewImage && phase.phaseNo > 1 ? previewImage.data : null
                }
                alt=""
              />
              {phase.phaseNo >= 3 && rectors
                ? rectors.map((rector, index) => {
                    let mt = rector.regionInfo.boundingBox.topRow;
                    let ml = rector.regionInfo.boundingBox.leftCol;
                    let mr = rector.regionInfo.boundingBox.rightCol;
                    let mb = rector.regionInfo.boundingBox.bottomRow;
                    let tag = rector.data.concepts[0].name;
                    const style = {
                      // backgroundPosition: `${ml * 100 + 16}% ${mb * 100 - 7}% `,
                      position: "absolute",
                      top: `${mt * 100}%`,
                      left: `${ml * 100}%`,
                      right: `${mr * 100}%`,
                      bottom: `${mb * 100}%`,
                      width: `${(mr - ml) * 100}%`,
                      height: `${(mb - mt) * 100}%`,
                      zIndex: 0,
                    };
                    const buttonStyle = {
                      position: "relative",
                      top: `50%`,
                      left: `50%`,

                      zIndex: 0,
                    };
                    return (
                      <div className="image-rector" style={style} key={tag}>
                        <button
                          className="tag-button"
                          style={buttonStyle}
                          onClick={e => addCroppedRectors(e, index)}
                        >
                          {tag}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        <div className="tag-container" ref={tagsRef}>
          <div className="tag-container-title">
            <span>{phase.phaseNo > 5 ? "Your HashTag" : "Your Tag"}</span>
            <button onTouchEnd={()=>{
              document.querySelector(".tag-container").style.display=null;
              document.body.style.overflow="unset"



            }
            } hidden={window.innerWidth>757?true:false}><FontAwesomeIcon icon={faTimes}/></button>
          </div>
          <div className="tag-container-main">
            <div className="cropped-tag-container" ref={tagContainerRef}>
              {croppedRectors
                ? croppedRectors.map((croppedRector, index) => (
                    <div className="cropped-container tag-box">
                      <canvas
                        className={"cropped cropped-img-" + index}
                      ></canvas>
                      <div className="center-section">
                        <span>{croppedRector.label}</span>
                      </div>
                      <div className="right-section">
                        <button onClick={e => removeTag(e, croppedRector)}>
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="related-products-tag-container ">
              {productTags.length > 0
                ? productTags.map((tag, index) => {
                    return (
                      <div
                        ref={productTagRef.current[index]}
                        className="products-container"
                      >
                        <div className="products-section">
                          {tag.map((data, innerIndex) => (
                            <div
                              onClick={e => toggleSeleted(e, index)}
                              className={
                                innerIndex === 0
                                  ? "product-box box-" + index + " selected"
                                  : "product-box box-" + index + " non-selected"
                              }
                            >
                              <a
                                href={data.product.productLabels[4].value}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  className="product-image"
                                  src={
                                    data.product.productLabels[1].value[2] ===
                                    "1"
                                      ? "https://storage.googleapis.com/it-is-clothing-product-storage/product/" +
                                        data.product.productLabels[5].value
                                      : "https://storage.googleapis.com/it-is-clothing-product-storage/product" +
                                        data.product.productLabels[1].value[2] +
                                        "/" +
                                        data.product.productLabels[5].value
                                  }
                                  alt=""
                                />
                              </a>
                              <div className="text-section">
                                <a
                                  className="product-name"
                                  href={data.product.productLabels[4].value}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span title={data.product.displayName}>
                                    {data.product.displayName.includes("]") &&
                                    data.product.displayName[0] === "["
                                      ? data.product.displayName.substring(
                                          data.product.displayName.indexOf(
                                            "]"
                                          ) + 1
                                        )
                                      : data.product.displayName}
                                  </span>
                                </a>
                                <span className="product-brand">
                                  {data.product.productLabels[0].value}
                                </span>
                                <span className="product-price">
                                  {data.product.productLabels[2].value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="button-section">
                          <button
                            className="products-container-toggle"
                            onClick={e =>
                              toggleExpand(
                                e,
                                productTagRef.current[index].current
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="hash-tag-container">
              <div className="input-container">
                <div className="input-section">
                  <div
                    style={{ display: "flex" }}
                    className={activeInputFocus ? "active" : null}
                  >
                    <label htmlFor="input">#</label>
                    <AsyncTypeahead
                      id="hashtag-input"
                      minLength={1}
                      options={autoCompleteResult ? autoCompleteResult : []}
                      isLoading={isLoading}
                      onSearch={q => {
                        setIsLoading(true);
                        const arr = []
                        hashtagAutoComplete(q, "hashtag").then(response =>{
                          response.map(data=>arr.push(data.hashtagname))
                          
                          setAutoCompleteResult(arr,setIsLoading(false))
                        }
                        ).catch(err=>console.log(err));
                      }}
                      ref={hashTagInputRef}
                      onFocus={() => setActiveInputFocus(true)}
                      onBlur={() => {
                        setActiveInputFocus(false);
                      }}
                      // onInputChange={(text, e) => configureHashtag(text, e)}
                      onKeyDown={e => {
                        if (e.keyCode === 13) {
                          
                          addHashTag(e);

                          hashTagInputRef.current.clear();
                        }
                      }}
                      searchText={"searching"}
                    />
                    {/* <input
                      value={hashtagInputValue}
                      onChange={e => configureHashtag(e)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          addHashTag(e);
                          setHashtagInputValue("");
                        }
                      }}
                      onFocus={setActiveInputFocus}
                      onBlur={() => {
                        setActiveInputFocus(false);
                      }}
                      ref={hashTagInputRef}
                      type="text"
                    /> */}
                  </div>
                  <button
                    onClick={e => addHashTag(e, hashTagInputRef.current)}
                    className={activeInputFocus ? "active" : null}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="error-container">
                <p className="hashtag-error"></p>
              </div>
              <div className="result-container">
                {hashtagData
                  ? hashtagData.map(hashtag => (
                      <div className="hashtag-box">
                        <span>#{hashtag}</span>
                        <button
                          onClick={e => removeHashtag(e)}
                          className={"hashtag-" + hashtag}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>

          <div className="tag-container-footer">
            <button
              className={
                phase.phaseNo === 5 || phase.phaseNo === 6
                  ? "undo-active"
                  : null
              }
              onClick={backProgress}
            >
              undo
            </button>
            <button
              onClick={
                phase.phaseNo < 5
                  ? getProductData
                  : phase.phaseNo === 5
                  ? confirmTag
                  : finishCreate
              }
            >
              {phase.phaseNo < 5 ? "next" : "confirm"}
            </button>
          </div>
        </div>
      </div>

      <div className="footer-button-section">
        <button
          onTouchEnd={e => {

            if (
              (!document.querySelector(".tag-container").style.display||document.querySelector(".tag-container").style.display==="none")&&croppedRectors.length>0
            ){
              document.querySelector(".tag-container").style.display = "block";
              document.body.style.overflow="hidden"
            // document.body.classList.add("modal");
            // document.body.style.display="block"
          }
            
          }}
          hidden={phase.phaseNo<3||window.innerWidth > 757 ? true : false}
        >
          <span>{croppedRectors.length}</span> tags selected
        </button>
        <div className="upload-button">
          <input
            type="file"
            className="upload-file"
            accept="image/*"
            onChange={e => handleUpload(e)}
          />

          <button
            onClick={
              phase.phaseNo >= 2
                ? () => {
                    setCompletedCrop(null);
                    setPhase({ ...phase, phaseNo: 1 });
                  }
                : null
            }
            className="button"
          >
            {phase.phaseNo === 0 ? "Upload Here" : "Reupload Image"}
          </button>
        </div>

        {phase.phaseNo === 1 ? (
          <button
            onClick={() =>
              getCroppedImg(
                imgRef.current,
                previewCanvasRef.current,
                completedCrop
              )
                ? setPhase({ ...phase, phaseNo: 2 })
                : null
            }
            className="button"
          >
            Crop Image
          </button>
        ) : null}
      </div>
    </>
  );
}

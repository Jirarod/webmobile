import React,{useEffect,useState} from 'react'
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import Usernav from "@/pages/addon/Usernav";
import styles from "@/styles/Home.module.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import styles2 from "@/styles/list.module.css";
import { decode } from "jsonwebtoken";
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ImagePopup from "@/pages/addon/ImagePopup";

function listbuy() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [id, setId] = useState();



    
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const openPopup = (imageUrl) => {
      setSelectedImage(imageUrl);
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setSelectedImage(null);
      setShowPopup(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = decode(token);
        if (token) {
          setId(decoded.id);
        }
        fetchdata(id);
    }
    , [id]);



    const fetchdata = async (id) => {
        try{
        const res = await axios.post("/api/showbuy"
        , {  id   });
        setData(res.data.rows);
        setLoading(false);
        console.log(res.data.rows)


        }catch(err){
          console.log(err);
        }
        
      }


  return (
    <div className="bg-light vh-100">
      <Usernav />
      <Container>
        <Row>
          <Col sm={3} className="">
            <Usermenuaccount />
          </Col>
          <Col sm={9} className="">
            <Container className={styles.UinCon}>
              <Row>
                <Col sm={10} className="mt-3">
                  <h3 className={styles.UinTitle}>รายการสั่งซื้อ</h3>
                  <p className={styles.UinSubTitle}> รายการสั่งซื้อของคุณ</p>
                </Col>
                <hr />
              </Row>
              {data.map((data) => (
                <Row className={styles2.rowitem}>
                  
                   
                      <Col sm={8}>
                        <span className={styles.UinName}>{data.PDname}</span>
                        {" | "}
                        <span className={styles.UinPrice}>
                          ราคา {data.PDprice} บาท
                        </span>
                        {" | "}
                        <span className={styles.UinPrice}>
                          จำนวน {data.PAY_numberproduct} ชิ้น
                        </span>
                        <p className={styles.UinPrice}>
                          ราคารวม {data.PAY_Total} บาท
                        </p>
                      </Col>
                      <Col sm={3}>
                        <span className={styles.UinName}>สถานะ</span> {"  "}
                        <span className={`${styles.UinPrice} 
                         ${
                            data.PAY_status === "จัดส่งแล้ว"
                              ? "text-success mx-2 fw-bold"
                              : data.PAY_status === "รอผู้ขายจัดส่ง"
                              ? "text-warning mx-2 fw-bold"
                              :  ""
                             
                          }
                           `}>{data.PAY_status}</span>
                      </Col>

                        <Col sm={1}>
                        {data.PAY_status === "จัดส่งแล้ว" ? (
                        <FontAwesomeIcon icon={faEye}  className={styles2.iconeye} 
                        onClick={() => openPopup(data.PAY_admin_track)}/>
                        ) : (
                          ""
                        )}
                        </Col>
                       <Col sm={12}>
                        <span className={styles.UinName}>ที่อยู่ในการจัดส่ง</span> {"  "}
                        <span className={styles.UinPrice}>{data.ADDaddress} {data.ADDdistrict} {data.ADDprovince} {data.ADDzipcode}</span>
                        </Col>
                 

              
                 
                </Row>
              ))}





{showPopup && (
        <ImagePopup imageUrl={selectedImage} onClose={closePopup} />
      )}
              </Container>
              </Col>
              </Row>
              </Container>
              </div>
  )
}

export default listbuy
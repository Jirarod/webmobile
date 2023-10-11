import React, { useEffect,useState } from "react";
import { Container, Navbar, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Usernav from "./addon/Usernav";
import axios from "axios";
import styles from "@/styles/Market.module.css";
import { decode } from "jsonwebtoken";
import Link from "next/link";

function Marketpage() {
  const [product, setProduct] = useState([]);
  const [product1, setProduct1] = useState([]);  //มือ1
  const [product2, setProduct2] = useState([]);  //มือ2
  const [ipad, setIpad] = useState([]);  //มือไอแพด
  const [gadjet, setGadjet] = useState([]);  //มือกาจเจ็ต
  const [other, setOther] = useState([]);  //อื่นๆ
  const [id, setId] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decode(token);
    if (token) {
      setId(decoded.id);
    }

   
  }, [id]);

  useEffect(() => {

    

    fetchdata();
  }, []);

  const [loading, setLoading] = useState(true);
  const fetchdata = async () => {
    try{
    const res = await axios.get("/api/allproduct");
    setProduct(res.data.combinedData);
    const res2hand = await axios.get("/api/2handproduct");
    setProduct2(res2hand.data.combinedData);
    const res1hand = await axios.get("/api/1handproduct");
    setProduct1(res1hand.data.combinedData);
    const resipad = await axios.get("/api/Ipadtabproduct");
    setIpad(resipad.data.combinedData);
    const resgadjet = await axios.get("/api/gadjetproduct");
    setGadjet(resgadjet.data.combinedData);
    const resother = await axios.get("/api/Anotherproduct");
    setOther(resother.data.combinedData);



    setLoading(false);
    console.log(res.data)
    }catch(err){
      console.log(err);
    }
    
  };

  const addincart = async (PDid) => {
    try {
      if (!id) {
        alert("กรุณาเข้าสู่ระบบ");
        return;
      }
      else{
      const res = await axios.post("/api/addincart", { 
        productID: PDid
        , userID : id
       
       });
      console.log(res.data);
      if (res.data.message === "Product added") {
        window.location.href = "/user/account/cart";
      }
    }

    } catch (err) {
      console.log(err);
    }
  };



  if (loading) {
    return (<>
      <Usernav />
      <Container fluid className={styles.ContainMarket}>
      <div
            className="p-5 text-center border border-light rounded-3 shadow-5 "
            style={{
              backgroundImage:
                "url('https://9to5mac.com/wp-content/uploads/sites/6/2022/06/ios-16-remove-background-image.jpeg?quality=82&strip=all')",
              height: "500px",
              marginTop: "4%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <h1 className="mb-3 text-white textdiv">Store</h1>
            <h4 className="mb-3 text-white textdiv">
              เลือกสมาร์ทโฟนที่เหมาะกับตัวคุณ
            </h4>
          </div>

          <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-3 text-dark">สินค้าทั้งหมด</h2>
               <div>loading...</div>
            </div>
          </Container>

    </>);
  } 



  return (
    <div className="over-flow">
      <Usernav />
  
        <Container fluid className={styles.ContainMarket}>
          <div
            className="p-5 text-center border border-light rounded-3 shadow-5 "
            style={{
              backgroundImage:
                "url('https://9to5mac.com/wp-content/uploads/sites/6/2022/06/ios-16-remove-background-image.jpeg?quality=82&strip=all')",
              height: "500px",
              marginTop: "4%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <h1 className="mb-3 text-white textdiv">Store</h1>
            <h4 className="mb-3 text-white textdiv">
              เลือกสมาร์ทโฟนที่เหมาะกับตัวคุณ
            </h4>
          </div>

          <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-3 text-dark">สินค้าทั้งหมด</h2>
            <Row>
              {product.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>
          </div>

          <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-4 text-dark">สินค้ามือสอง</h2>
            <Row>
              {product2.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>

             
            

          </div>

          <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-4 text-dark">สินค้ามือหนึ่ง</h2>
            <Row>
            {product1.length === 0 ? <div>ไม่มีสินค้า</div> : null}
              {product1.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>

            </div>

            <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-4 text-dark">ไอแพ็ดและแท็บเล็ต</h2>
            <Row>
            {ipad.length === 0 ? <div>ไม่มีสินค้า</div> : null}
              {ipad.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>

            </div>

            <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-4 text-dark">อุปกรณ์เสริม</h2>
            <Row>
              {gadjet.length === 0 ? <div>ไม่มีสินค้า</div> : null}
              {gadjet.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>

            </div>

            <div className="p-5 text-center t rounded-3 shadow-5 ">
            <h2 className="mb-4 text-dark">อื่นๆ</h2>
            <Row>
            {other.length === 0 ? <div>ไม่มีสินค้า</div> : null}
              {other.map((item) => (
              <Col key={item} sm={3} className={styles.Colmiddle}>
                <Link className="text-decoration-none" href={`/product/${item.product.PDid}`}>
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={styles.Cardfooter}>
                    <Row>
                  <Col sm={6}>
                  <Card.Text className="text-start" >{item.product.PDcategory}</Card.Text>
                  </Col>

                    <Col sm={6}>
                  <Card.Text className="text-end" >{parseInt(item.product.PDprice).toLocaleString()} บาท</Card.Text>
                  </Col>
                  </Row>
               
                </Card.Footer>
                </Card>
                </Link>
              </Col>
              ))}
              </Row>

            </div>


        </Container>
    
    </div>
  );
}

export default Marketpage;

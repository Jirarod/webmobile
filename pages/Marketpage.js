import React, { useEffect,useState } from "react";
import { Container, Navbar, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Usernav from "./addon/Usernav";
import axios from "axios";
import styles from "@/styles/Market.module.css";
import { decode } from "jsonwebtoken";


function Marketpage() {
  const [product, setProduct] = useState([]);
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
    setLoading(false);
    console.log(res.data)
    }catch(err){
      console.log(err);
    }
    
  };

  const addincart = async (PDid) => {
    try {
      const res = await axios.post("/api/addincart", { 
        productID: PDid
        , userID : id
       
       });
      console.log(res.data);
      if (res.data.message === "Product added") {
        window.location.href = "/user/account/cart";
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
                <Card className={styles.Card} >
                  <div className={styles.Cardimgover}>
                  <Card.Img className={styles.Cardimg} variant="top" src={item.IMGurl.IMGurl} />
                  </div>
                  <Card.Body className={styles.Cardbody}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textdetail}>
                      {item.product.PDdetails}
                    </Card.Text>

                   <Button variant="primary" onClick={()=> addincart(item.product.PDid)}>เพิ่มลงตะกร้า</Button>

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
              </Col>
              ))}

           

          


              </Row>

             
            

          </div>
        </Container>
    
    </div>
  );
}

export default Marketpage;

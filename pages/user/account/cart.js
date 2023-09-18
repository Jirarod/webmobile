import React ,{useEffect,useState}from "react";
import Usernav from "@/pages/addon/Usernav";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "@/styles/Cart.module.css";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { set } from "react-hook-form";
import { event } from "jquery";


function cart() {
  const [id, setId] = useState("");

  const [data,setData] = useState([]);




  useEffect(() => {
    const token = localStorage.getItem('token') //erorถ้ารีเฟรชหน้า
    const decoded = decode(token)
    
    if (token) {

      setId(decoded.id)
      fetchdata();
    } 
      
  }, [id])

  const [loading, setLoading] = useState(true);
         const fetchdata = async () => {
      try{
      const res = await axios.post("/api/itemincart",{userID : id});
        console.log(res.data.combinedData);
  
      if (await res.data.message === "itemincart") {
        setData(res.data.combinedData);
        setLoading(false);

      }
     

      }catch(err){
        console.log(err);
      }

    };
 const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [sum, setSum] = useState(0);
    const handleCheckboxChange = (cart) => (event) => {
      if (!isFirstCheckboxChecked) {
        const isChecked = event.target.checked;
        const price = parseInt(cart.PDprice);
    
        if (isChecked) {
          setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, cart]);
          setSum((prevSum) => prevSum + price);
        } else {
          setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((item) => item !== cart));
          setSum((prevSum) => prevSum - price);
        }
      }
    };
    



   

    const handleallSelectedProducts = (event) => {
      const isChecked = event.target.checked;
    
      if (isChecked) {
        setIsFirstCheckboxChecked(true);
    
        const allProducts = data.map((item) => item.product);
        setSelectedProducts(allProducts);
    
        const totalPrice = allProducts.reduce((total, product) => total + parseInt(product.PDprice), 0);
        setSum(totalPrice);
      } else {
        setIsFirstCheckboxChecked(false);
    
        setSelectedProducts([]);
        setSum(0);
      }
    };




  return (
    <div className={styles.layoutcontainner}>
      
      <div className={styles.layoutcontainner__main}>
        <div className={styles.layoutnav}>
      <Usernav />
          </div>
         
    
      
     <Container className={styles.layoutcontainner__content}>


            {data.map((item) => (<>
          <Col className="mb-3" key={item} sm={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={1} className={styles.Colmiddle}>
                    <Form.Check  type="checkbox" onChange={handleCheckboxChange(item.product)}  
              
                    checked={isFirstCheckboxChecked|| selectedProducts.includes(item.product)}/>
                  </Col>
                  <Col sm={2 } className={styles.Colmiddle}>
                    <Card.Img
                        className={styles.Cardimg}
                    
                      src={item.IMGurl.IMGurl}
                    />
                  </Col>
                  <Col sm={4} className={styles.Colmiddle}>
                    <Card.Title>{item.product.PDname}</Card.Title>
                    <Card.Text className={styles.textlimit}>
                      {item.product.PDdetails}
                    </Card.Text>
                  </Col>
                    <Col sm={2} className={styles.Colmiddle}>   
                    <Form.Control className="text-center" type="number" 
                    placeholder={item.product.C_numberproduct} />
                    </Col>
                    <Col sm={2} className={styles.Colmiddle}>
                    <Card.Title>฿{parseInt(item.product.PDprice).toLocaleString()}</Card.Title>
                    </Col>
                    <Col sm={1} className={styles.Colmiddle}>
                    <Button variant="danger">X</Button>
                    </Col>

                    

                </Row>
              </Card.Body>
            </Card>
          </Col>


  

          </>
            ))}
            </Container>

              <div className={styles.layoutcontainner__footer}>
            <Container className={styles.Containnerfooter}>
              <Row>
              <Col sm={1} className={styles.Colmiddlefooter}>
              <Form.Check  type="checkbox"  onClick={handleallSelectedProducts}></Form.Check>
              </Col>

              <Col sm={2} className={styles.Colmiddlefooter}>
               รายการทั้งหมด({data.length})
              </Col>
              <Col sm={4} className={styles.Colmiddlefooter}>
                </Col>

              <Col sm={3} className={styles.Colendfooter}>
                รวม({selectedProducts.length} สินค้า) : ฿{sum.toLocaleString()}
              </Col>
              
              <Col sm={2} className={styles.Colmiddlefooter}>
              <Button variant="success" >ยืนยันการซื้อ</Button>
              </Col>
              </Row>

              </Container>
              </div>
         
        
          
        
    
            </div>
    </div>
  );
}

export default cart;

import React,{useState,useRef, useEffect} from "react";
import Usernav from "../../addon/Usernav";
import styles from "@/styles/buyservice.module.css";
import { Container, Form, Button,Row,Col } from "react-bootstrap";
import { decode } from "jsonwebtoken";

function sellservice() {
  const [formData, setFormData] = useState({
    Uid: "",
    brand: "",
    model: "",
    problem: "",
    price: "",
    detail: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decode(token);

    if (token) {
      setFormData({ ...formData, Uid: decoded.id });
    }
  }, []);
 
  const handleSubmit = async (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams(formData).toString();

        window.location.href = `/user/service/sellserviceupload?${queryParams}`;
      


  };
   

  return (
    <>
      <Usernav />
      <Container className={styles.buyCon}>
        <Form className={styles.buyForm} onSubmit={handleSubmit}>
          <h5 className={styles.title}>บริการรับซื้อ</h5>
          <hr className={styles.hr} />
          <Form.Group className="mb-3"  as={Row}>
            <Col sm={6}>
            <Form.Label>ยี่ห้อ</Form.Label>
            <Form.Control type="text" placeholder="กรุณากรอกยี่ห้อ"  
            onChange={(e)=> setFormData({...formData,brand:e.target.value})}  />
            </Col>

            <Col sm={6}>
            <Form.Label>รุ่น</Form.Label>
            <Form.Control type="text" placeholder="กรุณากรอกรุ่น" 
             onChange={(e)=> setFormData({...formData,model:e.target.value})}/>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>ปัญหา</Form.Label>
            <Form.Control type="text" placeholder="กรุณากรอกปัญหา" 
             onChange={(e)=> setFormData({...formData,problem:e.target.value})}/>
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>ราคาที่ต้องการ</Form.Label>
            <Form.Control type="text" placeholder="กรุณากรอกราคาที่ต้องการ" 
             onChange={(e)=> setFormData({...formData,price:e.target.value})}/>
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
            <Form.Control
              className="pb-5"
              type="text"
              placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
              onChange={(e)=> setFormData({...formData,detail:e.target.value})}

            />
          </Form.Group>

          <button type="submit" className={styles.btn}>
            ส่งข้อมูล
          </button>
        </Form>
      </Container>
    </>
  );
}

export default sellservice;

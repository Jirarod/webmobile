import React, { useState, useRef, useEffect } from "react";
import Usernav from "../../addon/Usernav";
import styles from "@/styles/buyservice.module.css";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { decode } from "jsonwebtoken";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./animation_lnj75u8f.json";
import { fa1, fa2, fa3, fa4, fa5 } from "@fortawesome/free-solid-svg-icons";
import "animate.css"; 
import animationData2 from "./animation_bg.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function sellservice() {
  const [animationStep, setAnimationStep] = useState(1);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setShowContainer(!showContainer);
  };
  const [showContainer, setShowContainer] = useState(false);

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
      {/* <Usernav />
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
      </Container> */}

      <Usernav />
      <Container className={styles.buyCon}>
        <Row>
          <Col md={6} className="float-left">
            <h1
              className={`${styles.title} animate__animated animate__backInRight`}
            >
              Service steps
            </h1>

            <div className={styles.circleContainer}>
              <div
                className={`${styles.circle} ${
                  animationStep >= 1 ? styles.clicked : ""
                }`}
              >
                <FontAwesomeIcon icon={fa1} className={styles.icon} />
                {animationStep >= 1 ? (
                  <>
                    <div className={styles.speechBubbleContainer}>
                      <div className={styles.speechBubble}>
                        <h4>Fill in the details</h4>
                        <p>(กรอกรายละเอียดข้อมูลของสินค้า)</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className={`${styles.circle} ${
                  animationStep >= 1 ? styles.clicked : ""
                }`}
              >
                <FontAwesomeIcon icon={fa2} className={styles.icon} />
                {animationStep >= 1 ? (
                  <>
                    <div className={styles.speechBubbleContainer}>
                      <div className={styles.speechBubble}>
                        <h4>Waiting for admin's response</h4>
                        <p>(รอการตอบกลับของผู้ดูแลระบบ)</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className={`${styles.circle} ${
                  animationStep >= 1 ? styles.clicked : ""
                }`}
              >
                <FontAwesomeIcon icon={fa3} className={styles.icon} />
                {animationStep >= 1 ? (
                  <>
                    <div className={styles.speechBubbleContainer}>
                      <div className={styles.speechBubble}>
                        <h4>Agree to buy-sell products</h4>
                        <p>(ตกลงซื้อ-ขายสินค้า)</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className={`${styles.circle} ${
                  animationStep >= 1 ? styles.clicked : ""
                }`}
              >
                <FontAwesomeIcon icon={fa4} className={styles.icon} />
                {animationStep >= 1 ? (
                  <>
                    <div className={styles.speechBubbleContainer}>
                      <div className={styles.speechBubble}>
                        <h4>The customer sends the product to the store</h4>
                        <p>(ลูกค้าส่งสินค้าให้ทางร้าน)</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className={`${styles.circle} ${
                  animationStep >= 1 ? styles.clicked : ""
                }`}
              >
                <FontAwesomeIcon icon={fa5} className={styles.icon} />
                {animationStep >= 1 ? (
                  <>
                    <div className={styles.speechBubbleContainer}>
                      <div className={styles.speechBubble}>
                        <h4>The store checks the product and makes payment</h4>
                        <p>(ร้านค้าตรวจสอบสินค้าและชำระเงินให้กับลูกค้า)</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            
            </div>
          </Col>

          <Col md={6} className="float-right">
            <Form className={styles.buyForm} onSubmit={handleSubmit}>
              <h5 className={styles.title1}>บริการรับซื้อ</h5>
              {/* <hr className={styles.hr} /> */}
              <div className={styles.lottiecontainer}>
                <Lottie animationData={animationData} />
              </div>
              <Form.Group className="mb-3" as={Row}>
                <Col sm={6}>
                  <Form.Label>ยี่ห้อ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรุณากรอกยี่ห้อ"
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </Col>

                <Col sm={6}>
                  <Form.Label>รุ่น</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรุณากรอกรุ่น"
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>ปัญหา</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรุณากรอกปัญหา"
                  onChange={(e) =>
                    setFormData({ ...formData, problem: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>ราคาที่ต้องการ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรุณากรอกราคาที่ต้องการ"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <Form.Control
                  className="pb-5"
                  type="text"
                  placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
                  onChange={(e) =>
                    setFormData({ ...formData, detail: e.target.value })
                  }
                />
              </Form.Group>

              <button type="submit" className={styles.btn}>
                ส่งข้อมูล
              </button>
            </Form>
          
          </Col>
        </Row>

        <div className={styles.boxfooter}>
        <Lottie animationData={animationData2} className={styles.bg} />
        <Lottie animationData={animationData2} className={styles.bg1} />
        </div>
      </Container>
    </>
  );
}

export default sellservice;

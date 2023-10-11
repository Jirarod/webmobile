import React, { useEffect, useState } from "react";
import Usernav from "../../addon/Usernav";
import { Container, Form, Button ,Row,Col} from "react-bootstrap";
import styles from "@/styles/service.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";

import { fa1, fa2, fa3, fa4, fa5 } from "@fortawesome/free-solid-svg-icons";
import "animate.css";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./animation_lnj75u8f.json";
import animationData2 from "./animation_bg.json";

function repairservice() {
  const [animationStep, setAnimationStep] = useState(1);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setShowContainer(!showContainer);
  };
  const [showContainer, setShowContainer] = useState(false);

  const [barnd, setBarnd] = useState("");
  const [model, setModel] = useState("");
  const [problem, setProblem] = useState("");
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decode(token);

    if (token) {
      setToken(token);
      setId(decoded.id);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      console.log(token);
      console.log(id);

      const res = await axios.post("/api/repairserviceapi", {
        id,
        barnd,
        model,
        problem,
      });

      if ((await res).data.message === "Repair service added") {
        Swal.fire({
          title: "ส่งข้อมูลสำเร็จ",
          text: "ระบบได้รับข้อมูลแล้ว",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/user/account/listrepair";
          }
        });
      }
    } else {
      Swal.fire({
        title: "คุณยังไม่ได้เข้าสู่ระบบ",
        text: "โปรดเข้าสู่ระบบก่อน",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "เข้าสู่ระบบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/Loginpage";
        }
      });
    }
  };

  return (
    <>
      {/* <Usernav/>

    <Container className={styles.Contain} >
    

        <Form className={styles.form} onSubmit={onSubmit}>
           <h5 className={styles.title}>กรอกข้อมูลมือถือที่ต้องการซ่อม</h5>
           <hr className={styles.hr}/>
           <Form.Group className='mt-3'>
                <Form.Label>ยี่ห้อ</Form.Label>
                <Form.Control type="text" placeholder="กรุณากรอกยี่ห้อ" required onChange={(e)=>setBarnd(e.target.value)}/>
          </Form.Group> 

          <Form.Group className='mt-3'>
                <Form.Label>รุ่น</Form.Label>
                <Form.Control type="text" placeholder="กรุณากรอกรุ่น" required onChange={(e)=>setModel(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mt-3'>
                <Form.Label>ปัญหา</Form.Label>
                <Form.Control className='pb-5 ' type="text" placeholder="กรุณากรอกปัญหา" required onChange={(e)=>setProblem(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mt-3'>
                <button className={styles.btnsubmit} type="submit"> ส่งข้อมูล</button>
          </Form.Group>

       

        </Form>
        

    </Container> */}

      <Usernav />

      <Container className={styles.Contain}>
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
                        <h4>The product has been received</h4>
                        <p>(ได้รับสินค้าที่ลูกค้าส่งมาแล้ว)</p>
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
                        <h4>Under investigation</h4>
                        <p>(อยู่ระหว่างการตรวจสอบสินค้า)</p>
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
                        <h4>Under repair</h4>
                        <p>(อยู่ระหว่างการดำเนินการซ่อมแซม)</p>
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
                        <h4>Repair completed</h4>
                        <p>(ซ่อมแซมสินค้าเสร็จแล้ว)</p>
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
                        <h4>The product has been shipped</h4>
                        <p>
                          (จัดส่งสินค้าแล้ว
                          เมื่อลูกค้าได้รับสินค้าแล้วให้ทำการกดยืนยันบนหน้าเว็บ)
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            
            </div>
          </Col>

          <Col md={6} className="float-right">
            <Form className={styles.form} onSubmit={onSubmit}>
              <h5 className={styles.titleform}>
                กรอกข้อมูลมือถือที่ต้องการซ่อม
              </h5>
              {/* <hr className={styles.hr}/> */}
              <div className={styles.lottiecontainer}>
                <Lottie animationData={animationData} className={styles.emoteicon}/>
              </div>
              <Form.Group className="mt-3">
                <Form.Label>ยี่ห้อ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรุณากรอกยี่ห้อ"
                  required
                  onChange={(e) => setBarnd(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>รุ่น</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรุณากรอกรุ่น"
                  required
                  onChange={(e) => setModel(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>ปัญหา</Form.Label>
                <Form.Control
                  className="pb-5 "
                  type="text"
                  placeholder="กรุณากรอกปัญหา"
                  required
                  onChange={(e) => setProblem(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <button className={styles.btnsubmit} type="submit">
                  {" "}
                  ส่งข้อมูล
                </button>
              </Form.Group>
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

export default repairservice;

import React, { useState,useEffect } from "react";
import Usernav from "@/pages/addon/Usernav";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import Userformadress from "@/pages/addon/Userformadress";
import Showaddress from "@/pages/addon/Showaddress";
import Link from "next/link";
import { useRouter } from "next/router";  // Refresh หน้าเว็บเมื่อ Modal ถูกปิด


function address() {

  
   
 


  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.reload(); // Refresh หน้าเว็บเมื่อ Modal ถูกปิด
  };
 
  return (
    <>
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
                    <h3 className={styles.UinTitle}>ที่อยู่</h3>
                    <p className={styles.UinSubTitle}>
                      {" "}
                      เพิ่มข้อมูลที่อยู่จัดส่งเพื่อให้การจัดส่งสินค้าเข้าถึงคุณได้ง่ายขึ้น
                    </p>
                  </Col>
                  <Col sm={2} className="mt-3">
                    <button className={styles.Ubtnad}  onClick={() => setShowModal(true)}>
                      {" "}
                      <FontAwesomeIcon
                        icon={faPlus}
                      />{" "}
                      เพิ่มที่อยู่{" "}
                    </button> 
                  </Col>
                  <hr />
                </Row>
 
                <Showaddress/>

              
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <Userformadress show={showModal} onHide={ handleCloseModal} />

    </>
  );
}

export default address;

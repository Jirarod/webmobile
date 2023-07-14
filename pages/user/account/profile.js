import React, { useEffect, useState } from "react";
import Usernav from "../../addon/Usernav";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";

import styles from "@/styles/Home.module.css";
import { decode } from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

function profile() {
  const [accountname, setAccountname] = useState("");
  const [accountemail, setAccountemail] = useState("");



//   validation รูปภาพอัพโหลด
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 1024 * 1024; // 1 MB = 1024 * 1024 bytes

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        // setSelectedFile(file);
      } else {
        // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
        console.error('ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB');
      }
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
   console.log("Form submitted");
   const name = e.target.elements.name.value;
   const phone = e.target.elements.phone.value;
   const gender = e.target.elements.gender.value;
   const birthday = e.target.elements.birthday.value;
   console.log(name, phone, gender, birthday);

};



  useEffect(() => {
    const token = localStorage.getItem("token"); //erorถ้ารีเฟรชหน้า
    const decoded = decode(token);
    if (token) {
      setAccountname(decoded.name);
      setAccountemail(decoded.email);
    } else {
      setAccountname("");
    }
  }, []);

  return (
    <div className="bg-light vh-100">
      <Usernav />

      <Container className="">
        <Row>
          <Col sm={3}>
            {" "}
            {/*menu user*/}
            <Container className={styles.UinMeCon}>
              <Row>
                <Col sm={3} className="mt-3">
                  <FontAwesomeIcon
                    icon={faUser}
                    size="3x"
                    className={styles.UinIcon}
                  />
                </Col>
                <Col sm={9} className="mt-3">
                  <h3 className={styles.UinTitle}>Profile</h3>
                  <p>{accountname}</p>
                </Col>
              </Row>
              <hr />
              <ul className={styles.UinUl}>
                <FontAwesomeIcon icon={faUser} className="mx-2" /> บัญชีของฉัน
                <Link href="/user/account/profile">
                  {" "}
                  <li className={styles.Uinli}>ข้อมูลส่วนตัว</li>{" "}
                </Link>
                <Link href="/user/account/address">
                  {" "}
                  <li className={styles.Uinli}>ที่อยู่จัดส่ง</li>{" "}
                </Link>
                <li className={styles.Uinli}> เปลี่ยนรหัสผ่าน</li>
              </ul>
            </Container>
          </Col>

          {/* ข้อมูลส่วนตัว------------------------------------------------------- */}
          <Col sm={9}>
            <Container className={styles.UinCon}>
              <h3 className={styles.UinTitle}>ข้อมูลส่วนตัว</h3>
              <p className={styles.UinSubTitle}>
                {" "}
                จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
              </p>
              <hr />
              {/* แก้ไขข้อมูลส่วนตัว */}

              <Row>
                <Col sm={8} className="mt-3">
                  <Form className="mt-3"  onSubmit={handleFormSubmit} id="form1">
                    <Form.Group className="mb-3" as={Row} controlId="name">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        ชื่อ
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder={accountname}
                          className="mx-3"

                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} >  
                    {/* ยังไม่ได้ส่งข้อมูลใช้ otp nodemailer  */}
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        อีเมล
                      </Form.Label>
                      <Col sm="8">
                        <Form.Label className="pt-2 mx-5">
                          {accountemail}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="phone">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        เบอร์โทรศัพท์
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="เบอร์โทรศัพท์"
                          className="mx-3"

                          
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}  controlId="gender">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        เพศ
                      </Form.Label>
                      <Col sm="8" className="mt-2 mx-3">
                        <Form.Check
                          inline
                          label="ชาย"
                          name="group1"
                          type="radio"
                          value="ชาย"
                        
                        
                        />
                        <Form.Check
                          inline
                          label="หญิง"
                          name="group1"
                          type="radio"
                          value="หญิง"
                     
                         
                        />
                        <Form.Check
                          inline
                          label="อื่นๆ"
                          name="group1"
                          type="radio"
                          value="อื่นๆ"
                         
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="birthday">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        วันเกิด
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="date"
                          placeholder="วันเกิด"
                          className="mx-3"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}>
                      <Col sm="3"></Col>

                      <Col sm="8">
                        <Button
                          variant="secondary"
                          type="submit"
                          className="mx-3 my-3"
                          form="form1"
                        >
                          บันทึก
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col sm={4} className="mt-3">
                  <Container className={styles.UiConprofile}>
                    <Form>
                      <Form.Group>
                        <Image
                          src="https://via.placeholder.com/150"
                          roundedCircle
                          className={styles.UiImgprofile}
                        />
                      </Form.Group>

                      <Form.Group className="mt-4" as={Row}>
                        <Col sm="12" className="d-flex justify-content-center">
                          <div className="btn btn-secondary btn-rounded">
                            <label
                              className="form-label text-white m-1"
                              for="customFile1"
                            >
                              เลือกรูป
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile1"
                              accept="image/jpeg, image/png"
                              onChange={handleFileChange}
                            />
                          </div>
                        </Col>
                      </Form.Group>
   
                        <Form.Group className="mt-4" as={Row}>
                            <Col sm="12" className="d-flex justify-content-center">
                                <Form.Label className={styles.UinSubTitle} >
                                ขนาดไฟล์: สูงสุด 1 MB <br/>
                                ไฟล์ที่รองรับ: .JPEG, .PNG
                                </Form.Label>
                            </Col>
                        </Form.Group>

                        



                    </Form>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default profile;

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
import Swal from "sweetalert2";
import styles from "@/styles/Home.module.css";
import { decode } from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser ,faPen} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import axios from "axios";

import Usermenuaccount from "@/pages/addon/Usermenuaccount";


function profile() {
  const [accountname, setAccountname] = useState("");
  const [accountemail, setAccountemail] = useState("");
  const [accountid, setAccountid] = useState("");
  const [accountgender,setAccountgender] = useState("");
  const [accountphone, setAccountphone] = useState("");
  const [accountbirthday,setAccountbirthday] = useState("");
  

  const [selectedFile, setSelectedFile] = useState(null);
  const [accountprofileimage, setAccountprofileimage] = useState("");

  const [showdate, setShowdate] = useState(true);
  const [showphone, setShowphone] = useState(true);
  const [showname, setShowname] = useState(true);
  const [showgender, setShowgender] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");


  

  //   validation รูปภาพอัพโหลด
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 1024 * 1024; // 1 MB = 1024 * 1024 bytes

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setSelectedFile(file);
      } else {
        // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
        console.error(
          "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
        );
      }
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "Profileuser"); // เปลี่ยนเป็น upload preset ของคุณ

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
          formData
        );

        if (response.status === 200) {
          const res = await axios.post("/api/UploadProfileimage", {
            image: response.data.url, // ส่งค่า URL รูปภาพไปด้วย เพื่อให้ API ทำการอัปเดตรูปภาพโปรไฟล์ของผู้ใช้
            id: accountid, // ส่งค่า id ไปด้วย เพื่อให้ API ทำการอัปเดตรูปภาพโปรไฟล์ของผู้ใช้
          });

          console.log("รูปถูกอัปโหลดและบันทึกในฐานข้อมูลสำเร็จ");
        } else {
          // การอัปโหลดและบันทึกข้อมูลรูปภาพผิดพลาด
          console.error("การอัปโหลดและบันทึกข้อมูลรูปภาพผิดพลาด");
        }
      } catch (error) {
        // เกิดข้อผิดพลาดในการเชื่อมต่อ API
        console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ API", error);
      }
    } else {
      // ไม่มีไฟล์ที่เลือก
      console.error("ไม่มีไฟล์ที่เลือก");
    }
    //----------------------//
    console.log("Form submitted");
 
    console.log(name, phone, gender, birthday);

    const res = await axios.post("/api/UpdateProfile", {
      name: name,
      phone: phone,
      gender: gender,
      birthday: birthday,
      id: accountid,
    });
    if ((await res).data.message === "User update profile") {
      localStorage.setItem("token", (await res).data.token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "โปรไฟล์ของคุณได้รับการอัปเดตแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
      window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); //erorถ้ารีเฟรชหน้า
    const decoded = decode(token);
      
    if (token) {
      setAccountname(decoded.name);
      setAccountemail(decoded.email);
      setAccountid(decoded.id); 
      setAccountprofileimage(decoded.image);
      setAccountbirthday(decoded.birthday);
      setAccountphone(decoded.phone);
      setAccountgender(decoded.gender);
      if(accountphone){
      setShowphone(true);
      }
      if(accountbirthday){
      setShowdate(true);
      }
      if(accountname){
      setShowname(true);
      }
      if(accountgender){
      setShowgender(true);
      }

      
    } else {
      setAccountname("");
      setAccountprofileimage("");
      setAccountgender("");
      setAccountphone("");
      setAccountbirthday("");


    }
  }, []);

  const handleclosedate = () => setShowdate(false);
  const handleclosephone = () => setShowphone(false);
  const handleclosename = () => setShowname(false);
  const handleclosegender = () => setShowgender(false);

  return (
    <div className="bg-light vh-100">
      <Usernav />

      <Container className="">
        <Row>
          <Col sm={3}>
            {" "}
           <Usermenuaccount/>
          </Col>

          {/* ข้อมูลส่วนตัว------------------------------------------------------- */}
          <Col sm={9}>
            <Container className={styles.UinCon}>
              <div className="mt-3">
              <h3 className={styles.UinTitle}>ข้อมูลส่วนตัว</h3>
              <p className={styles.UinSubTitle}>
                {" "}
                จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
              </p>
              <hr />
              </div>
              {/* แก้ไขข้อมูลส่วนตัว */}

              <Row>
                <Col sm={8} className="mt-3">
                  <Form className="mt-3" onSubmit={handleFormSubmit} id="form1">
                    <Form.Group className="mb-3" as={Row} controlId="name">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        ชื่อผู้ใช้
                      </Form.Label>
                      <Col sm="8">
                      {showname?(
                        <div><Form.Label
                          className="mx-4 mt-2"
                        > {accountname}</Form.Label> 
                        
                         <FontAwesomeIcon icon={faPen}  
                         className="mx-1 border-1  border-bottom"  onClick={handleclosename}/>
                         
                        </div>
                       ):(
                        <Form.Control
                          type="text"
                          placeholder={accountname}
                          className="mx-3"
                          onChange={(e) => setName(e.target.value)}
                        />)}
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}>
                      {/* ยังไม่ได้ส่งข้อมูลใช้ otp nodemailer  */}
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        อีเมล
                      </Form.Label>
                      <Col sm="8">
                        <Form.Label className=" mx-4">
                          {accountemail}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="phone">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        เบอร์โทรศัพท์
                      </Form.Label>
                      <Col sm="8">
                      {showphone?(
                        <div><Form.Label
                          className="mx-4 mt-2"
                        > {accountphone}</Form.Label> 
                        
                         <FontAwesomeIcon icon={faPen}   
                         className="mx-1 border-1  border-bottom"  onClick={handleclosephone}/>
                         
                        </div>
                       ):(
                        <Form.Control
                          type="text"
                          placeholder="เบอร์โทรศัพท์"
                          className="mx-3"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        )}
                        
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="gender">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        เพศ
                      </Form.Label>
                      <Col sm="8" className="mt-2 mx-3">
                      {showgender?(<div>
                         <Form.Check
                          inline
                          label="ชาย"
                          name="group1"
                          type="radio"
                          value="ชาย"
                          checked={accountgender === "ชาย"}
                          disabled
                        />
                        <Form.Check
                          inline
                          label="หญิง"
                          name="group1"
                          type="radio"
                          value="หญิง"
                          checked={accountgender === "หญิง"}
                          disabled
                        />
                        <Form.Check
                          inline
                          label="อื่นๆ"
                          name="group1"
                          type="radio"
                          value="อื่นๆ"
                          checked={accountgender === "อื่นๆ"}
                          disabled
                        /> 
                         <FontAwesomeIcon icon={faPen}   
                         className="mx-1 border-1  border-bottom"  onClick={handleclosegender}
                         />
                         </div>
                      ):(
                      <div><Form.Check
                        inline
                        label="ชาย"
                        name="group1"
                        type="radio"
                        value="ชาย"
                       onChange={(e) => setGender(e.target.value)}
                      />
                      <Form.Check
                        inline
                        label="หญิง"
                        name="group1"
                        type="radio"
                        value="หญิง"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <Form.Check
                        inline
                        label="อื่นๆ"
                        name="group1"
                        type="radio"
                        value="อื่นๆ"
                        onChange={(e) => setGender(e.target.value)}
                      /></div>
                        )}
                      </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="birthday">
                      <Form.Label column sm="3" className={styles.UinFormLabel}>
                        วันเกิด
                      </Form.Label>
                      <Col sm="8">
                       {showdate?(
                        <div><Form.Label
                          className="mx-4 mt-2"
                        > {accountbirthday}</Form.Label> 

                         
                         <FontAwesomeIcon icon={faPen}
                         className="mx-1 border-1 border-bottom" onClick={handleclosedate}/>
                         
                        </div>
                       ):(
                        <Form.Control
                          type="date"
                          placeholder="วันเกิด"
                          className="mx-3"
                          onChange={(e) => setBirthday(e.target.value)}
                        />)} 
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
                          src={accountprofileimage}
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
                          <Form.Label className={styles.UinSubTitle}>
                            ขนาดไฟล์: สูงสุด 1 MB <br />
                            ไฟล์ที่รองรับ: .JPEG, .PNG.
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

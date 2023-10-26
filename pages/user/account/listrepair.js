import React, { useEffect, useState } from "react";
import Usernav from "@/pages/addon/Usernav";
import styles from "@/styles/Home.module.css";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import styles2 from "@/styles/list.module.css";
import { decode } from "jsonwebtoken";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import {
  faTrashCan,
  faChevronCircleDown,
  faChevronDown,
  faEye,
  faTruck,
  faMoneyBill1,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { set } from "react-hook-form";
function listrepair() {
  const [id, setId] = useState("");
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = decode(token);
    if (token) {
      setId(decoded.id);
    }
    fetchData(id);
  }, [id]);

  const [loading, setLoading] = useState(true);
  const fetchData = async (id) => {
    try {
      const res = await axios.post("/api/showrepairitemapi", { id });
      setDataRows(res.data.rows);
      setLoading(false);
      
    } catch (err) {
      console.log(err);
    }
  };

  const [showpayment, setShowpayment] = useState(false);
  const handleClosepayment = () => setShowpayment(false);
  const handleshowpayment = async (row) => {
    console.log(row);
    setData(row);
    setShowpayment(true);
  };

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [tracking, setTracking] = useState([]); //เก็บค่า tracking number ที่ลูกค้ากรอก
  const handleClose = () => setShow(false);
  const handleshow = async (row) => {
    console.log(row);
    setData(row);
    setShow(true);
  };

  const updatetrack = async (e) => {
    e.preventDefault();
    try {
      if (tracking.length === 0) {
        alert("กรุณาใส่tracking number");
        return;
      } else {
        const token = localStorage.getItem("token");
        const decoded = decode(token);
        const id = decoded.id;
        const res = await axios.post("/api/trackrepair", {
          Uid: id,
          RSid: data.RSid,
          brand: data.RSbrand,
          model: data.RSmodel,
          status: "อยู่ระหว่างการส่งซ่อม",
          trackid: tracking,
        });
        console.log(res.data);
        alert("บันทึกข้อมูลเรียบร้อย");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleterepair = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/trackrepair", {
        RSid: data.RSid,
        status: "ลบรายการซ่อม",
      });
      console.log(res.data);
      alert("ลบข้อมูลเรียบร้อย");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [disable, setDisable] = useState(true);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    console.log(file);
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      setDisable(false);
     

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        console.error(
          "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
        );
      }
    }
  };



  const uploadslip = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
    formData.append("upload_preset", "Slipeduser");
        formData.append("cloud_name", "dsacsgwkl");
      
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
        formData
      );
      const token = localStorage.getItem("token");
        const decoded = decode(token);
        const id = decoded.id;
      const res = await axios.post("/api/trackrepair", {
        Uid: id,
        RSid: data.RSid,
        status: "รอการตรวจสอบ",
        slipedimg: response.data.secure_url,
      });
      console.log(res.data);
      fetchData(id);
      alert("บันทึกข้อมูลเรียบร้อย");
      window.location.reload();


   


     
    }
    catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return <div>Loading...</div>; // หน้าโหลดข้อมูล
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
                  <h3 className={styles.UinTitle}>รายการซ่อม</h3>
                  <p className={styles.UinSubTitle}> รายการซ่อมของคุณ</p>
                </Col>
                <hr />
              </Row>

              <Row className={styles2.over}>
                <Col sm={12} className="mt-3">
                  {dataRows.map((row, index) => (
                    <div key={index}>
                      <Form className={styles2.reForm}>
                        <Form.Group as={Row}>
                          <Col sm={3} className={styles2.reBox}>
                            <Form.Label className={styles2.reTitle}>
                              ยี่ห้อ :
                            </Form.Label>
                            <Form.Label className={styles2.resubTitle}>
                              {" "}
                              {row.RSbrand}
                            </Form.Label>
                          </Col>
                          <Col sm={3} className={styles2.reBox}>
                            <Form.Label className={styles2.reTitle}>
                              รุ่น :
                            </Form.Label>
                            <Form.Label className={styles2.resubTitle}>
                              {" "}
                              {row.RSmodel}
                            </Form.Label>
                          </Col>
                          <Col sm={5}>
                            <Form.Label className={styles2.reTitle}>
                              วันที่ :
                            </Form.Label>
                            <Form.Label className={styles2.resubTitle}>
                              {" "}
                              {dayjs(row.RStime).format("YYYY-MM-DD HH:mm:ss")}
                            </Form.Label>
                          </Col>
                          {row.RSstatus === "ตอบรับคำขอซ่อม" ? (
                            <Col sm={1}>
                              {" "}
                              <FontAwesomeIcon
                                icon={faEye}
                                className={styles2.sellIcon}
                                onClick={() => handleshow(row)}
                              />
                            </Col>
                          ) : (
                            <></>
                          )}
                        </Form.Group>

                        <Form.Group as={Row} className="mt-2 mb-1 ">
                          <Col sm={6}>
                            <Form.Label className={styles2.reTitle}>
                              สถานะการตอบกลับ :
                            </Form.Label>
                            <Form.Label
                              className={`styles2.resubTitle 
                          ${
                            row.RSstatus === "ตอบรับคำขอซ่อม"
                              ? "text-success mx-2 fw-bold"
                              : row.RSstatus === "รอการตอบรับ"
                              ? "text-warning mx-2 fw-bold"
                              : row.RSstatus === "ปฎิเสธคำขอซ่อม"
                              ? "text-danger mx-2 fw-bold"
                              : row.RSstatus === "ดำเนินการการซ่อม"
                              ? "text-success mx-2 fw-bold"
                              : row.RSstatus === "ชำระเงินแล้ว"
                              ? "text-success mx-2 fw-bold"
                              :  "text-warning mx-2 fw-bold"
                             
                          }`}
                              id="status"
                            >
                              {" "}
                              {row.RSstatus}{" "}
                              {row.RSstatus === "อยู่ระหว่างการส่งซ่อม" ? (
                                <FontAwesomeIcon
                                  icon={faTruck}
                                  className={styles2.truck}
                                />
                              ) : row.RSstatus === "รอการชำระเงิน" ? (
                                <FontAwesomeIcon
                                  icon={faMoneyBill1}
                                  
                                />
                              ) :   (
                                ""
                              )}

                              {row.RSstatus === "ชำระเงินแล้ว" ? (<><FontAwesomeIcon
                                  icon={faCheckCircle}
                               
                                />  </>):null}



               
                            </Form.Label>
                           
                          </Col>
                          {row.RS_ad_trackid !== "" ? (
                            
                          <Col sm={6}>
                            <Form.Label className={styles2.reTitle}>
                              เลขพัสดุ :
                            </Form.Label>
                            <Form.Label className={styles2.resubTitle}>
                              {row.RS_ad_trackid}
                            </Form.Label>
                          </Col>
                          ) : (
                            <></>
                          )}


                          {row.RSstatus === "ชำระเงินแล้ว" ? (<>
                                 <p className={styles2.textnotice}> ลูกค้าติดตามเลขพัสดุได้ทางe-mailหรือหน้าwebที่สมัครไว้Adminจะทำการส่งภายใน24ชั่วโมง</p> </>):null}
                          {row.RSstatus === "รอการชำระเงิน" ? (
                            <Col
                              sm={6}
                              className="align-items-center d-flex justify-content-center"
                            >
                              <Button
                                variant="primary"
                                size="sm"
                                className={styles2.btn}
                                onClick={(e) => handleshowpayment(row)}
                              >
                                ชำระเงิน
                              </Button>
                            </Col>
                          ) : (
                            <></>
                          )}
                        </Form.Group>

                        {row.RSstatus === "ดำเนินการการซ่อม" ? (
                          <>
                            <hr className="mb-2" />
                            <Form.Group as={Row}>
                              <Col sm={6}>
                                <Form.Label className={styles2.reTitle}>
                                  ราคาหลังจากแอดมินตรวจสอบ :
                                </Form.Label>
                                <Form.Label className={styles2.resubTitle}>
                                  {" "}
                                  {row.RS_ad_appraise}
                                </Form.Label>
                              </Col>
                              <Col sm={6}>
                                <Form.Label className={styles2.reTitle}>
                                  วันที่ซ่อมเสร็จโดยประมาณ :
                                </Form.Label>
                                <Form.Label className={styles2.resubTitle}>
                                  {" "}
                                  {dayjs(row.RS_ad_finishtime).format(
                                    "YYYY-MM-DD"
                                  )}
                                </Form.Label>
                              </Col>
                            </Form.Group>

                            <p className="text-secondary fst-italic fw-light">
                              รายละเอียดดั้งกล่าวเป็นการตอบกลับจากแอดมินตรวจความเสียหายรวมถึงเวลาที่ใช้ในการซ่อมโดยประมาณ
                            </p>
                          </>
                        ) : null}
                      </Form>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการซ่อม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label className={`text-center ${styles2.reTitle}`}>
                รายการซ่อมของคุณ
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={4}>
                <Form.Label className={styles2.reTitle}>ยี่ห้อ :</Form.Label>
                <Form.Label className={styles2.resubTitle}>
                  {" "}
                  {data.RSbrand}
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Label className={styles2.reTitle}>รุ่น :</Form.Label>
                <Form.Label className={styles2.resubTitle}>
                  {" "}
                  {data.RSmodel}
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Label className={styles2.reTitle}>วันที่ :</Form.Label>
                <Form.Label className={styles2.resubTitle}>
                  {" "}
                  {dayjs(data.RStime).format("YYYY-MM-DD HH:mm:ss")}
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={2}>
                <Form.Label className={styles2.reTitle}>ปัญหา :</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Label className={styles2.problem}>
                  {" "}
                  {data.RSproblem}
                </Form.Label>
              </Col>
            </Form.Group>

            <hr className="my-2" />
            <Form.Group as={Row}>
              <Form.Label className={`text-center ${styles2.reTitle}`}>
                การตอบกลับจากแอดมิน
              </Form.Label>
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row}>
                  <Col sm={4}>
                    <Form.Label className={styles2.reTitle}>
                      รายละเอียดเพิ่มเติม:
                    </Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Label className={styles2.reAns}>
                      {" "}
                      {data.RS_ad_details}
                    </Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm={4}>
                    <Form.Label className={styles2.reTitle}>
                      ที่อยู่ส่งซ่อม:
                    </Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Label className={styles2.reAns}>
                      {" "}
                      157/3 ถนนประชาธิปไตย ตำบลท่าพี่เลี้ยง อำเภอเมือง
                      จังหวัดสุพรรณบุรี
                    </Form.Label>
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group as={Row}>
                  <Col sm={4}>
                    <Form.Label className={styles2.reTitle}>
                      ราคาประเมิน:
                    </Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Label className="mt-1">
                      {data.RS_ad_appraise}
                    </Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label
                    className={`text-center fw-bold text-warning`}
                    column="12"
                  >
                    กรุณาใส่tracking number
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Control
                    type="text"
                    placeholder="tracking number"
                    className="text-center w-75 mx-auto"
                    as="textarea"
                    rows={2}
                    onChange={(e) => setTracking(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <p className="text-danger">
                **กรุณาใส่เลขรหัสพัสดุเพื่อให้แอดมินติดตามสถานะอุปกรณ์ที่ส่งซ่อม
                ก่อนที่กดยืนยันซ่อมเพื่อเป็นการเปลี่ยนสถานะการซ่อมของลูกค้า{" "}
                {"("}หากไม่ต้องการส่งซ่อมให้ลูกค้าปฎิเสธการซ่อม{")"}
              </p>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิดหน้าต่าง
          </Button>

          <Button variant="danger" onClick={deleterepair}>
            ปฎิเสธการซ่อม
          </Button>

          <Button variant="primary" onClick={updatetrack}>
            ยืนยันการซ่อม
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showpayment}
        onHide={handleClosepayment}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการชำระเงิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className={styles2.G2col}>
              <Form.Label className={`text-center ${styles2.reTitle}`}>
                โปรดชำระเงิน
              </Form.Label>

              <Col sm={6}>
                <Form.Group as={Row}>
                  <Col sm={12} className="d-flex justify-content-center">
                    <img
                      src={data.RS_ad_payment}
                      className={styles2.imgpayment}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mt-2 d-flex justify-content-center"
                >
                  <Col sm={4}>
                    <Form.Label className={styles2.reTitle}>
                      ยอดชำระ :
                    </Form.Label>
                  </Col>
                  <Col sm={4}>
                    <Form.Label
                      className={`text-center ${styles2.textpayment}`}
                    >
                      {" "}
                      {data.RS_ad_appraise}
                    </Form.Label>
                  </Col>

                  <Col sm={2}>
                    <Form.Label className={styles2.reTitle}>บาท</Form.Label>
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} className="d-flex justify-content-center">
                <Form.Group as={Row} className={styles2.boxprice}>
                  <Col sm={12} className="d-flex justify-content-center">
                  
                  <img src={imageUrl} className={styles2.imgprice} />
                  </Col>
                  <Col sm={12} className="d-flex justify-content-center ">
                <label
                  htmlFor="upload-button"
                  className={styles2.customFileUpload}
                >
               คลิกเพื่ออัพโหลดหลักฐานการชำระเงิน

                
                </label></Col>
                </Form.Group>



                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <input
                    type="file"
                    id="upload-button"
                    accept="image/jpeg, image/png"
                    className={styles2.upInput}
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosepayment}>
            ปิดหน้าต่าง
          </Button>

          <Button variant="primary" onClick={uploadslip} disabled={disable}>
            ยืนยันการชำระเงิน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default listrepair;

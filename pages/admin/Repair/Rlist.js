import React from "react";
import Layoutadmin from "../Components/layoutadmin";
import {
  Container,
  Nav,
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Popover,
} from "react-bootstrap";
import styles from "@/styles/Repairadmin.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus,faCircleCheck,faCircleXmark,faSpinner } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";



function Rlist() {
  const [repairStatus, setRepairStatus] = useState("รอการตอบรับ");
  const [dataRows, setDataRows] = useState([]);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const [admindetail, setAdminDetail] = useState("");
 


  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleshow = async (row) => {
    console.log(row);
    setData(row);
    setShow(true);
  };

  const [value, setValue] = useState([]);
  useEffect(() => {
    fetchData();
   
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post("/api/admin/requestrepairshow", {
        status: "รอการตอบรับ",
      });
      setDataRows(res.data.rows);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };



 const btnstatus =(status) =>
  {
  
    const labelstatus =  document.querySelector(`.${styles.textstatus}`);

      if (status === "ตอบรับคำขอซ่อม") {
        setRepairStatus("ตอบรับคำขอซ่อม");
        labelstatus.classList.add(`${styles.textstatusaccept}`);
        labelstatus.classList.remove(`${styles.textstatusreject}`);
      } else if (status === "ปฎิเสธคำขอซ่อม") {
        setRepairStatus("ปฎิเสธคำขอซ่อม");
        labelstatus.classList.add(`${styles.textstatusreject}`);
        labelstatus.classList.remove(`${styles.textstatusaccept}`);
      }

  }

  const hangdleChange = (e) => 
  {
   
  
  
  };
 
 const handleSubmit = async (e) => {
   const appraise = (`${value1} - ${value2}`);
   

   if(repairStatus==="รอการตอบรับ" )
   {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'กรุณาเลือกสถานะการซ่อม',
     
    })
   }
    else 
  {
     const res = await axios.post("/api/admin/resrepairback", {
      RSid: data.RSid,
      RSstatus: repairStatus,
      RS_ad_appraise: appraise,
      RS_ad_detail: admindetail,
    });

    if (res.data.message === "success send") {
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'บันทึกข้อมูลสำเร็จ',
       
      })
      setShow(false);
      fetchData();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'บันทึกข้อมูลไม่สำเร็จ',
       
      })
    }
    


  }
  
 
 };



 const getStatusIcon = () => {
  if (repairStatus === "ตอบรับคำขอซ่อม") {
    return <><FontAwesomeIcon icon={faCircleCheck} className={`text-success mx-2 ${styles.fade_icon2}`} />{repairStatus} </> ;
  } else if (repairStatus === "ปฎิเสธคำขอซ่อม") {
    return <> <FontAwesomeIcon icon={faCircleXmark} className={`text-danger mx-2 ${styles.fade_icon}`} />{repairStatus}</>;
  } else {
    return <> <FontAwesomeIcon icon={faSpinner} className={`text-warning mx-2 fs-5 ${styles.rotate_icon}`} />{repairStatus}</>;
  }
};





  return (
    <Layoutadmin>
      <Nav
        variant="tabs"
        className={styles.navtab}
        defaultActiveKey="/admin/Repair/Rlist"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Repair/Rlist">รายการขอซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/Repair/RInprogess">รายการดำเนินการซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rpayment">รายการรอชำระ</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rsuccess">รายการชำระเสร็จสิ้น</Nav.Link></Nav.Item>
      </Nav>

      <Container className={styles.container}>
        {dataRows.map((row, index) => (
          <Col key={index} sm={4} className="d-flex justify-content-center pt-2">
            <Card className={styles.cardpayment}>
              <Card.Body>
                <Card.Title>รายการขอซ่อม {index + 1}</Card.Title>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="text-start fw-bold">
                      ชื่อผู้ขอซ่อม :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="8"
                      className="fst-italic fw-medium text-primary"
                    >
                      {row.Uname}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="text-start fw-bold">
                      เบอร์โทรศัพท์ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="8"
                      className="fst-italic fw-medium text-primary "
                    >
                      {row.Uphone}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="text-start fw-bold">
                      email :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="8"
                      className="fst-italic fw-medium text-primary "
                    >
                      {row.Uemail}
                    </Form.Label>
                  </Form.Group>

                  <hr className="my-2" />
                  <h5>รายละเอียดเพิ่มเติม</h5>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2" className="text-start fw-bold">
                      ยี่ห้อ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="3"
                      className="fst-italic fw-medium text-primary "
                    >
                      {row.RSbrand}
                    </Form.Label>
                    <Form.Label column sm="2" className="text-start fw-bold">
                      รุ่น :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="3"
                      className="fst-italic fw-medium text-primary "
                    >
                      {row.RSmodel}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="3" className="text-start fw-bold ">
                      ปัญหา :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="9"
                      className="text-break fst-italic fw-medium text-primary "
                    >
                      {row.RSproblem}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm="3" className="text-start fw-bold"></Col>

                    <Form.Label
                      column
                      sm="9"
                      className="text-danger text-end fst-italic"
                    >
                      {dayjs(row.RStime).format("YYYY-MM-DD HH:mm:ss")}
                    </Form.Label>
                  </Form.Group>
                </Form>
              
               
              </Card.Body>
              <Card.Footer className=""> 
              <Button className={styles.btnrepair} variant="primary" onClick={() => handleshow(row)}>
                  จัดการรายการซ่อม
                </Button>
                </Card.Footer>
            </Card>
          </Col>
        ))}
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
          <Modal.Title id="contained-modal-title-vcenter">
            รายการขอซ่อม
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-2">
              <Col xs={12} md={6} className={styles.boxmodalimg}>
                <h3 className={styles.textmodalimg}>Profile</h3>
                <img src={data.Uimage} className={styles.modalimg} />
              </Col>
              <Col xs={6} md={6} className="">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="text-start fw-bold">
                      ชื่อผู้ขอซ่อม :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="7"
                      className="fst-italic fw-medium text-primary"
                    >
                      {data.Uname}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="text-start fw-bold">
                      เบอร์โทรศัพท์ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="7"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.Uphone}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="text-start fw-bold">
                      email :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="7"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.Uemail}
                    </Form.Label>
                  </Form.Group>
                  <hr className="my-2" />
                  <h5>รายละเอียดเพิ่มเติม</h5>
                  <Form.Group as={Row}>
                    <Form.Label column sm="3" className="text-start fw-bold">
                      ยี่ห้อ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="3"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.RSbrand}
                    </Form.Label>
                    <Form.Label column sm="3" className="text-start fw-bold">
                      รุ่น :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="3"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.RSmodel}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="3" className="text-start fw-bold ">
                      ปัญหา :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="9"
                      className="text-break  fw-bolder text-danger border rounded bg-light  "
                    >
                      {data.RSproblem}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </Col>
            </Row>

            <div className={styles.divider}>
              <hr />
              <span className={styles.divider_text}>แอดมิน</span>
              <hr />
            </div>

            <Row>
              <Col xs={6} md={8}  className={styles.boxleftadmin}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="5" className="text-start fw-bold">
                      รายละเอียดการซ่อม :
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        onChange={(e) => setAdminDetail(e.target.value)}
                        placeholder="ใส่รายละเอียดการซ่อมเช่น กี่วัน      เสียหายที่ใด"
                        className=""
                        as="textarea" rows={3}
                      ></Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-2">
                    <Form.Label column sm="5" className="text-start fw-bold">
                      ราคาที่ประเมิน :
                    </Form.Label>
                    <Col sm="3">
                      <Form.Control
                       type="number"
                       inputmode="numeric"
                        placeholder="เริ่มต้น"
                        className={`text-center ${styles.customInput}`}
                        onChange={(e) => {setValue1(e.target.value);
                        hangdleChange(e);}}

                      ></Form.Control>
                    </Col>
                    <Col sm="1"> <FontAwesomeIcon icon={faMinus} class="pt-2"/> </Col>
                    <Col sm="3">
                      <Form.Control
                   
                        placeholder="สิ้นสุด"
                        className={`text-center ${styles.customInput}`}
                        onChange={(e) => {setValue2(e.target.value);
                          hangdleChange(e);}}
                      ></Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-2">
                    <Form.Label column sm="5" className="text-start fw-bold">
                      ที่อยู่ส่งซ่อม:
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        placeholder="ใส่ที่อยู่สำหรับส่งซ่อม"
                        className=""
                        as="textarea" rows={3}
                      ></Form.Control>
                    </Col>
                  </Form.Group>

                </Form>
              </Col>

              <Col xs={6} md={4} >
                <div className="text-center">
                  <h5 className="text-dark">สถานะการซ่อม</h5>
                </div>

                <Button variant="success" className="w-100 mt-2" onClick={()=> btnstatus("ตอบรับคำขอซ่อม")}>
                ตอบรับคำขอซ่อม
                </Button>
               
                <Button variant="danger" className="w-100 mt-2" onClick={()=> btnstatus("ปฎิเสธคำขอซ่อม")}>
                ปฎิเสธคำขอซ่อม
                </Button>
                   
                 
                <Form.Group as={Row} className="mt-2 fs-4">
                  <Form.Label className="text-center ">
                    สถานะการปัจจุบัน 
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="border mx-2 rounded bg-light">
                 
                  
                  
                  <Form.Label column sm="12" id="labelstatus" className={`text-center fst-italic fw-bolder ${styles.textstatus} `} >
                  {getStatusIcon()}
                  </Form.Label>
                </Form.Group>
            
                
         
                {/* <div className={"d-flex justify-content-end "}>{currentTime.toLocaleTimeString()}</div> */}
                
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSubmit}>บันทึก</Button>
        </Modal.Footer>
      </Modal>
    </Layoutadmin>
  );
}

export default Rlist;

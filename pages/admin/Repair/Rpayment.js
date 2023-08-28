import React from 'react'
import Layoutadmin from '../Components/layoutadmin'
import {Nav,Container,Col,Row,Card,Modal,Button, Form,Dropdown} from 'react-bootstrap'
import styles from '@/styles/Repairadmin.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircleXmark,faCircleNotch } from '@fortawesome/free-solid-svg-icons'
function Rpayment() {
   const [dataRows, setdataRows] = useState([])
    const [show, setShow] = useState(false);
   
    const fetchData = async () => {
        const res = await axios.post('/api/admin/requestrepairshow', { status: "รอการชำระเงิน" })
        setdataRows(res.data.rows)
        console.log(res.data.rows)
    }

    useEffect(() => {

        fetchData()
    }, [])
    
    const [data, setData] = useState([])
    const handleClose = () => setShow(false);
    const handleshow = (row) => {
        setData(row)
        setShow(true)
    }

        
    const [expanded, setExpanded] = useState(false);

    const toggleZoom = () => {
      setExpanded(!expanded);
    };

  const updatestatus = async () => {
    try {
      const res = await axios.post('/api/admin/updatestatus', {
        RSid: data.RSid,
        RSstatus: "ตรวจสอบแล้ว",
      }
      )
      console.log(res.data)
      if (res.data.message === "success send") {
        setShow(false)
        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }





  return (

    <Layoutadmin>
        <Nav
        variant="tabs"
        className={styles.navtab}
        defaultActiveKey="/admin/Repair/Rpayment"
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
          <Col key={index} sm={4} className="m-1">
            <Card>
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
                      status :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="9"
                      className={`text-break fst-italic fw-bold  
                      ${
                        row.RSstatus === "รอการตรวจสอบ"
                          ? "text-warning"
                          : row.RSstatus === "รอการชำระเงิน"
                          ? "text-danger "
                          : ""
                      }`}
                    >
                         {row.RSstatus === "รอการชำระเงิน"?(<><FontAwesomeIcon icon={faCircleXmark} className="text-danger" /> </>):null }
                         {row.RSstatus === "รอการตรวจสอบ"?(<><FontAwesomeIcon icon={faCircleNotch} className={`text-warning ${styles.rotate_icon}`} /> </>):null }
                         {row.RSstatus}
                    </Form.Label>
                  </Form.Group>

                  
                 {row.RSstatus === "รอการตรวจสอบ" ? (<><p className='text-end fs-6 fst-italic text-secondary'> กรุณาตรวจสอบการชำระเพื่อส่งรายการซ่อมคืนให้ลูกค้า</p><Form.Group class="d-flex justify-content-end"  ><Button className='' variant="primary" onClick={() => handleshow(row)}>
                  ตรวจสอบการชำระเงิน
                   </Button></Form.Group></>):(<> </>)}
                  
               
                </Form>
                
               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Container>
        
        <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.Modal}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการชำระเงิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

          <Row className="">
             <Col sm={6} >
                 <Form.Group as={Row}>
                    <Form.Label column sm="12" className="text-center fw-bold">
                      รายละเอียดการซ่อม
                      </Form.Label>
                    </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="text-start fw-bold">
                      ชื่อผู้ขอซ่อม :
                    </Form.Label> 
                    <Form.Label
                      column
                      sm="8"
                      className="fst-italic fw-medium text-primary"
                    >
                      {data.Uname}
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
                      {data.Uphone}
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
                      {data.Uemail}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2" className="text-start fw-bold">
                      ยี่ห้อ :
                    </Form.Label>
                    <Form.Label
                      column   
                      sm="3"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.RSbrand}
                    </Form.Label>
                    <Form.Label column sm="2" className="text-start fw-bold">
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
                  <hr className='my-2'/>
                  <Form.Group as={Row}>
                    <Form.Label column sm="12" className="text-center fw-bold">
                      ที่อยู่คืนเครื่อง
                    </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Form.Label column sm="2" className="text-start fw-bold">
                      ชื่อ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="10"
                      className="fst-italic fw-bold text-primary "
                    >
                      {data.ADDname}
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
                      {data.ADDphone}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="2" className="text-start fw-bold">
                      ที่อยู่ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="10"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.ADDaddress}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="3" className="text-start fw-bold">
                      จังหวัด :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="9"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.ADDprovince}
                    </Form.Label>
                    <Form.Label column sm="3" className="text-start fw-bold">
                      อำเภอ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="9"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.ADDdistrict}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="4" className="text-start fw-bold">
                      รหัสไปรษณีย์ :
                    </Form.Label>
                    <Form.Label
                      column
                      sm="4"
                      className="fst-italic fw-medium text-primary "
                    >
                      {data.ADDzipcode}
                    </Form.Label>
                  </Form.Group>


                
                    

                  </Col>
                  <Col sm={6} >
                  <Form.Group as={Row}>
                    <Form.Label column sm="12" className="text-center fw-bold">
                      หลักฐานการชำระเงิน 
                    </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className={styles.boxprice}>
                  <Col sm={12} className="d-flex justify-content-center">
                  
                  <img  onClick={toggleZoom} src={data.RSsliped} className={`${styles.imgprice} ${expanded ? styles.expanded : ''}` }/>
                  </Col>
                 
                </Form.Group>



                    </Col>
                  </Row>

                  </Form>
                  </Modal.Body>
                  <Modal.Footer>
                  <Button className='' variant="secondary" onClick={handleClose}>
                  ปิด
                    </Button>
                    <Button className='' variant="primary" onClick={updatestatus}>
                  ยืนยันการตรวจสอบชำระเงิน
                    </Button>
                    
        </Modal.Footer>
        </Modal>

        

        




    </Layoutadmin>
  )
}

export default Rpayment
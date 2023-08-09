import React from "react";
import Layoutadmin from "../Components/layoutadmin";
import { Container, Nav, Form, Row, Col, Card ,Button} from "react-bootstrap";
import styles from "@/styles/Rlist.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function Rlist() {
  const [repairStatus, setRepairStatus] = useState();
  const [dataRows, setDataRows] = useState([]);

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
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
      </Nav>

      <Container className={styles.container}>
        
        {dataRows.map((row, index) => (
      
            <Col key={index} sm={4} className="m-2">
              <Card >
                <Card.Body>
                  <Card.Title>รายการขอซ่อม { index+1}</Card.Title>
                   <Form>
                    <Form.Group as={Row} >
                        <Form.Label column sm="4" className="text-start fw-bold">
                            ชื่อผู้ขอซ่อม :
                        </Form.Label>
                         <Form.Label column sm="8" className="fst-italic fw-medium text-primary">
                            {row.Uname}
                        </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} >
                        <Form.Label column sm="4" className="text-start fw-bold">
                            เบอร์โทรศัพท์ :
                        </Form.Label>
                         <Form.Label column sm="8" className="fst-italic fw-medium text-primary ">
                            {row.Uphone}
                        </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Form.Label column sm="4" className="text-start fw-bold">
                            email :
                        </Form.Label>
                         <Form.Label column sm="8" className="fst-italic fw-medium text-primary ">
                            {row.Uemail}
                        </Form.Label>
                        </Form.Group>


                       <hr className="my-2"/>
                       <h5>รายละเอียดเพิ่มเติม</h5>
                       <Form.Group as={Row} >
                        <Form.Label column sm="2" className="text-start fw-bold">
                            ยี่ห้อ :
                        </Form.Label>
                         <Form.Label column sm="3" className="fst-italic fw-medium text-primary ">
                            {row.RSbrand}
                        </Form.Label>
                        <Form.Label column sm="2" className="text-start fw-bold">
                            รุ่น :
                        </Form.Label>
                         <Form.Label column sm="3" className="fst-italic fw-medium text-primary ">
                            {row.RSmodel}
                        </Form.Label>

                        </Form.Group>

                        <Form.Group as={Row} >
                        <Form.Label column sm="3" className="text-start fw-bold ">
                            ปัญหา :
                        </Form.Label>
                         <Form.Label column sm="9" className="text-break fst-italic fw-medium text-primary ">
                            {row.RSproblem}
                        </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} >
                            <Col sm="7" className="text-start fw-bold">
                               </Col> 
                    
                            <Form.Label column sm="5" className="text-danger fst-italic">
                            {dayjs(row.RStime).format("YYYY-MM-DD HH:mm:ss")}
                        </Form.Label>
                        </Form.Group>
                        
                   </Form>
                  <Button variant="primary" >จัดการรายการซ่อม</Button>
                </Card.Body>
              </Card>
            </Col>

        
        ))} 
      </Container>
    </Layoutadmin>
  );
}

export default Rlist;

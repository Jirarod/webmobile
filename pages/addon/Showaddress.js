import React, { useEffect, useState } from "react";
import { Container ,Form, Row,Col, Button} from "react-bootstrap";
import { decode } from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
import Editaddress from "./Editaddress";
function Showaddress() {





  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.reload(); // Refresh หน้าเว็บเมื่อ Modal ถูกปิด
  };



  const [dataRows, setDataRows] = useState([]);

  const [id, setId] = useState(""); 
  useEffect(() => {


    const token = localStorage.getItem("token");
        const decoded = decode(token);
      if (token) {setId(decoded.id);}
    
    fetchData(id);
    console.log(id);
  }, [id]);

   

  const fetchData = async (id) => {
    try {
      const res = await axios.post("/api/showaddressapi", { id });
      console.log(res.data);
      setDataRows(res.data.rows);

      
 
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <>
  <div>
      {/* ในตัวอย่างนี้คุณสามารถนำ dataRows ไปแสดงผลในหน้าเว็บได้ */}
      {dataRows.map((row, index) => (
        <div  key={index}>
          <Row> 
            <Col sm={10}>
          <Form className="mb-2 mt-2">
            <Form.Group as={Row}>
              <Form.Label className="text-capitalize fw-bolder border-end " column sm="3">
               {row.ADDname}
              </Form.Label>
              <Form.Label column sm="4">
                {row.ADDphone}
              </Form.Label>
            </Form.Group>

            <Form.Group >
              <Form.Label className="fw-light text-body-secondary">
                {row.ADDaddress}
              </Form.Label>
              </Form.Group>

              <Form.Group >
              <Form.Label className="fw-light text-body-secondary">
                {" จ."}{row.ADDprovince}{", อำเภอ"}{row.ADDdistrict}{", "}{row.ADDzipcode}
              </Form.Label>
              </Form.Group>

          </Form></Col>

          <Col sm={2}>
            <Button variant="danger" className="mt-5" onClick={() => setShowModal(true)}>แก้ไข</Button>
          </Col>
          
          </Row>
          <hr />

        </div>
      ))}
    </div>
    <Editaddress show={showModal} onHide={handleCloseModal} />
  </>);
}

export default Showaddress;

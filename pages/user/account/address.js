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
import { faPlus,faPenToSquare,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import Userformadress from "@/pages/addon/Userformadress";
import { useRouter } from "next/router";  // Refresh หน้าเว็บเมื่อ Modal ถูกปิด

import styles1 from "@/styles/addres.module.css";
import axios from "axios";
import { decode } from "jsonwebtoken";


function address() {

  
   
 


  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    router.reload(); // Refresh หน้าเว็บเมื่อ Modal ถูกปิด
  };



  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [addressid, setAddressid] = useState('');


  const handleSubmit = async (e) =>
  { 
      console.log(addressid);
      console.log(id);
      e.preventDefault()
      const res = await axios.post('/api/updateaddressapi',
          {   id,
              phone,
              name,
              address,
              province,
              district,
              zipcode,addressid})
      console.log(res.data);
      if((await res).data.message === "Address update")
      {
        setShow(false);
         Swal.fire({
              title: 'แก้ไขที่อยู่สำเร็จ',
              text: 'ที่อยู่ของคุณได้รับการแก้ไขแล้ว',
              icon: 'success',
              confirmButtonText: 'ตกลง'
          }).then((result) => {

              if (result.isConfirmed) {

          window.location.reload()}
          })
      }

  }

  const handleDelete = async (row) =>
  {
      console.log(row.ADDid);
      const res = await axios.post('/api/deleteaddressapi',
          { id,
            addressid:row.ADDid})
      console.log(res.data);
      if((await res).data.message === "Address delete")
      {
          Swal.fire({
              title: 'ลบที่อยู่สำเร็จ',
              text: 'ที่อยู่ของคุณได้รับการลบแล้ว',
              icon: 'success',
              confirmButtonText: 'ตกลง'
          }).then((result) => {

              if (result.isConfirmed) {

                  window.location.reload()}
          })
      }
  }





const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = (row) => {
  setAddressid(row.ADDid);
  setData(row);
  setShow(true);
  console.log(row);
}

const [data, setData] = useState([]);
const [dataRows, setDataRows] = useState([]);
const [id, setId] = useState("");
useEffect(() => {
  const token = localStorage.getItem("token");
  const decoded = decode(token);
  if (token) {
    setId(decoded.id);
  }

  fetchData(id);
}, [id]);



const fetchData = async (id) => {
  try {
    const res = await axios.post("/api/showaddressapi", { id });

    setDataRows(res.data.rows);
  } catch (err) {
    console.log(err);
  }
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
 
                {/* showadress */}
                <div>
        {/* ในตัวอย่างนี้คุณสามารถนำ dataRows ไปแสดงผลในหน้าเว็บได้ */}
        {dataRows.map((row, index) => (
          <div key={index}>
            <Row>
              <Col sm={10}>
                <Form className="mb-2 mt-2">
                  <Form.Group as={Row}>
                    <Form.Label
                      className="text-capitalize fw-bolder border-end "
                      column
                      sm="3"
                    >
                      {row.ADDname}
                    </Form.Label>
                    <Form.Label column sm="4">
                      {row.ADDphone}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="fw-light text-body-secondary">
                      {row.ADDaddress}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="fw-light text-body-secondary">
                      {" จ."}
                      {row.ADDprovince}
                      {", อำเภอ"}
                      {row.ADDdistrict}
                      {", "}
                      {row.ADDzipcode}
                    </Form.Label>
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={2}>
                <FontAwesomeIcon icon={faPenToSquare} className={styles1.iconedit} onClick={() => handleShow(row)} />
                <FontAwesomeIcon icon={faTrashCan} className={styles1.icondelete}  onClick={() => handleDelete(row)}/>
              </Col>
            </Row>
            <hr />

           
          </div>
        ))}
      </div>
      



      <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  แก้ไขที่อยู่
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form id="formadd" onSubmit={handleSubmit}>
                  {" "}
              
                  <Form.Group className="mb-3" as={Row}>
                    <Col sm={6}>
                      <Form.Control
                        type="text"
                        placeholder={data.ADDname}
                        className=""
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Control
                        type="text"
                        placeholder={data.ADDphone}
                        className=""
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder={data.ADDprovince}
                        className=""
                        onChange={(e) => setProvince(e.target.value)}
                      />
                    </Col>

                    <Col>
                      <Form.Control
                        type="text"
                        placeholder={data.ADDdistrict}
                        className=""
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </Col>

                    <Col>
                      <Form.Control
                        type="text"
                        placeholder={data.ADDzipcode}
                        className=""
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder={data.ADDaddress}
                      className="pb-5"
                      onChange={(e) =>  setAddress(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger"  onClick={handleClose} >Close</Button>
                
                <Button type="submit" form="formadd">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>

              
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

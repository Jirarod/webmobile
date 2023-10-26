import React, { useEffect, useRef, useState } from "react";
import Layoutadmin from "../Components/layoutadmin";
import {
  Nav,
  Container,
  Table,
  Button,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables";

import styles from "@/styles/Purchaseadmin.module.css";

import dayjs from "dayjs";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faPen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { set } from "react-hook-form";


function PInprogess() {
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tableRef.current && tableData.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [tableData]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/showpurchasetable");
      setTableData(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [url, setUrl] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => { 
    setShow(false); 
    window.location.reload();
  
  }
  const handleShow = (row) => {
    setData(row);
    setShow(true);
  };

    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
  
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setImageUrl(URL.createObjectURL(file));
  
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
       
  
        if (allowedTypes.includes(file.type)) {
          setSelectedFile(file);
        } else {
          // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
          console.error(
            "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
          );
        }
      }
    };

    const [imageUrl1, setImageUrl1] = useState('');
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [isActive, setIsActive] = useState(true);
  
  
    const handleFileChange1 = (event) => {
      const file = event.target.files[0];
      setImageUrl1(URL.createObjectURL(file));
      setIsActive(false);
      
      if (file) {
        const allowedTypes = ["image/jpeg", "image/png"];
       
  
        if (allowedTypes.includes(file.type)) {
          setSelectedFile1(file);
        } else {
          // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
          console.error(
            "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
          );
        }
      }
    };


  const [expanded, setExpanded] = useState(false);

    const toggleZoom = () => {
      setExpanded(!expanded);
    };

    const handlesubmit = async (e) => {
      
      try {
        
        if(imageUrl != "" ){
         const formData = new FormData();
         formData.append("file", selectedFile);
         formData.append("upload_preset", "Slipeduser");
         formData.append("cloud_name", "dsacsgwkl");
        const resimg = await axios.post(
          "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
          formData
        );
        const url = resimg.data.secure_url;
        console.log(resimg.data.secure_url);
        console.log(url);

        const resupload = await axios.post("/api/admin/uploadslipPurchase", {
          id: data.SSid,
          status: "ชำระเงินเสร็จสิ้น",
          url: url,
        });
        
        //ชำระเงินเสร็จสิ้น
        if (await resupload.data.message == "success send") {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          handleClose();
          fetchData();
        }

  
        }

        if(status === "ตรวจสอบแล้ว"){

        const res = await axios.post("/api/admin/resPurchaseback", {
          id: data.SSid,
          status: status,
          price: price,
          detail: note,
        });
        
        if (await res.data.message == "success send") {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          handleClose();
          fetchData();
        }

      }

      if(status === "ยกเลิกการรับซื้อ"){
        const res = await axios.post("/api/admin/resPurchaseback", {
          id: data.SSid,
          status: status,
          price: '',
          detail: note,
        });

        if (await res.data.message == "success send") {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          handleClose();
          fetchData();
        }
      }

      } catch (err) {
        console.log(err);
      }
       
    }


    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const [dataUP, setDataUP] = useState([]);
    const handlesend = async (SSid) => {
      try {
        const res = await axios.post("/api/admin/viewinfoUPurchase", {
          id: SSid,
        });
        setDataUP(res.data.rows[0]);
        console.log(res.data.rows[0]);

        setShow1(true);
       
      } catch (err) {
        console.log(err);
      }


    }

    const handlesendback = async () => {
      try {
   
          const formData = new FormData();
          formData.append("file", selectedFile1);
          formData.append("upload_preset", "Aboutsellservice");
          formData.append("cloud_name", "dsacsgwkl");
          const resimg = await axios.post(
            "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
            formData
          );
          const url = resimg.data.secure_url;
          console.log(resimg.data.secure_url);

          const res = await axios.post("/api/admin/uploadpurchasetrackback", {
            id: dataUP.SSid,
            status: "ส่งคืน",
            url: url,
          });

          window.location.href = "/admin/Purchase/Psuccess";
          fetchData();


        
      }
      catch (err) {
        console.log(err);
      }
    }



  

  return (
    <Layoutadmin>
      <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Purchase/PInprogess"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Purchase/Plist">รายการรับซื้อ</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Purchase/PInprogess">
            รายการกำลังดำเนินการ
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Purchase/Psuccess">
            รายการเสร็จสิ้น
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className={styles.containertable}>
        {tableData.length > 0 ? (
          <Table
            id="myTable"
            hover
            variant="white"
            striped
            ref={tableRef}
            className={styles.table}
          >
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">ชื่อรายการรับซื้อ</th>
                <th className="text-center">ราคาที่ประเมิน</th>
                <th className="text-center">วันที่แจ้งขาย</th>
                <th className="text-center">สถานะ</th>
                <th className="text-center">ดำเนินการ</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr className={styles.tr} key={row.id}>
                  <td>{index + 1}</td>
                  <td>
                    {row.SSbrand} {row.SSmodel}
                  </td>
                  <td>{row.SS_ad_apprise}</td>
                  <td>{dayjs(row.SStime).format("DD/MM/YYYY")}</td>
                  <td
                    className={`
                          ${
                            row.SSstatus === "ตอบรับการรับซื้อ"
                              ? "text-success text-center fw-bold"
                              : row.SSstatus === "อยู่ระหว่างการส่งขาย"
                              ? "text-warning text-center fw-bold"
                              : row.SSstatus === "ตรวจสอบแล้ว"
                              ? "text-info text-center fw-bold"
                              : row.SSstatus === "ยืนยันการขาย"
                              ? "text-success text-center fw-bold"
                              : row.SSstatus === "ปฎิเสธการขาย"|| row.SSstatus === "ปฎิเสธการขาย(ส่งคืน)" 
                              ? "text-danger text-center fw-bold" :
                               row.SSstatus === "ยกเลิกการรับซื้อ"
                              ? "text-danger text-center fw-bold"
                              : "text-warning text-center fw-bold"
                          }`}
                  >
                    {row.SSstatus}{row.SSstatus == "ยกเลิกการรับซื้อ" || row.SSstatus == "ปฎิเสธการขาย(ส่งคืน)" ? (<p className={styles.textwarn}>(ทางร้านต้องส่งคืนโดยดูที่อยู่จัดส่งได้ในปุ่มดำเนินการและอัพโหลดหลักฐานการส่งคืน)</p>):(<></>)}
                    {row.SSstatus == "อยู่ระหว่างการส่งขาย" ? (
                      <FontAwesomeIcon
                        icon={faTruck}
                        className={styles.truckicon}
                      />
                    ) : null}
                  </td>
                  <td>
                    {row.SSstatus == "ยกเลิกการรับซื้อ"|| row.SSstatus == "ปฎิเสธการขาย(ส่งคืน)" ? (<>
                    <button className={styles.returnbtn} onClick={()=>handlesend(row.SSid)} >ส่งคืน</button></>):(
                    <button
                      onClick={() => handleShow(row)}
                      className={styles.editbtn}
                    >
                      แก้ไข
                    </button>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h1 className="text-center mt-5">Please Add Data</h1>
        )}
      </Container>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรายการรับซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Row>
               <Col sm={4}>
                 <Form.Group as={Row} className="justify-content-center">
                   <img src={data.SSurltrack} className={styles.sellImg2} />
                 </Form.Group>
               </Col>

               <Col sm={4} className="justify-content-center">
                 <Form.Group as={Row} className="justify-content-center">
                    <img src={data.SSurlidcard} className={styles.sellImg2} />
                 </Form.Group>
               </Col>

               <Col sm={4} className="justify-content-center">
                <Form.Group as={Row} className="justify-content-center ">
                  <img src={data.SSurlpayment} onClick={toggleZoom} className={`${styles.sellImg2} ${expanded ? styles.expanded : ''}` } />
                </Form.Group> 
               </Col>
            </Row>

            <Form.Group as={Row} className="mb-1 text-center">
                  <Form.Label column sm="4">
                    เลขพัสดุ
                  </Form.Label>

                  <Form.Label column sm="4">
                    บัตรประชาชน
                  </Form.Label>

                  <Form.Label column sm="4">
                    ช่องทางการชำระเงิน
                  </Form.Label>
                </Form.Group>

                {data.SSstatus == "อยู่ระหว่างการส่งขาย" ? (<>
                <div className={styles.divider}>
              <hr />
              <span className={styles.divider_text}>การตอบกลับแอดมิน</span>
              <hr />
            </div>
            <Container className={styles.Containerinmodal}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="1">
                  สถานะ
                </Form.Label>
                <Col sm="4">
                  <Form.Control as="select" defaultValue="เลือกสถานะ" onChange={(e)=>setStatus(e.target.value)}>
                    <option disabled>เลือกสถานะ</option>
                    <option>ตรวจสอบแล้ว</option>
                 
                    <option>ยกเลิกการรับซื้อ</option>
                    <option>ชำระเสร็จสิ้น</option>
                  </Form.Control>
                </Col>
                
                {status == "ยกเลิกการรับซื้อ" ? (<><Form.Label className="text-danger fst-italic" column sm="7">**หากต้องการยกเลิกการรับต้องบอกรายละเอีดว่าทำไมถึงยกเลิก</Form.Label></>):(<>
                <Form.Label column sm="3">
                  ราคาที่ประเมิน(หลังตรวจสอบ)
                </Form.Label>
                <Col sm="4">
                  <Form.Control type="number" className="customInput" placeholder="ราคาที่ประเมิน" onChange={(e)=>setPrice(e.target.value)}/>
                </Col>
                </>)}

              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="1">
                  หมายเหตุ
                </Form.Label>
                <Col sm="11">
                  <Form.Control as="textarea" rows={3} onChange={(e)=>setNote(e.target.value)} />
                </Col>
              </Form.Group>

                
            </Container></>):(<></>)}

            {data.SSstatus == "ยืนยันการขาย" ? (<> <div className={styles.divider}>
              <hr />
              <span className={styles.divider_text}>อัพโหลดหลักฐานการโอนเงิน</span>
              <hr />
            </div>



            {imageUrl ? (
            <Form.Group as={Row} className="mb-3 justify-content-center"> 
            <img src={imageUrl} className={styles.slipImg} />
            </Form.Group> ): (<></>)}
           

            

                 <Form.Group as={Row} className="mb-3">

                        <Form.Label column sm="2">
                          หลักฐานการโอนเงิน
                        </Form.Label>
                          
                          <Col sm="10">
                          <Form.Control type="file"  className={styles.inputfile}
                          onChange={handleFileChange}/>
                          </Col>
                    </Form.Group>     

                      
       
            </>):(<></>)}
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handlesubmit}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={show1} onHide={handleClose1} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>ข้อมูลการส่งคืน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} >
              <Form.Label className="text-center fw-bold fs-4" column sm="12">
                ข้อมูลการส่งคืน
              </Form.Label>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm="6" className="border rounded-3 pb-2">
                  <Form.Group as={Row}>
                  <Form.Label column sm='3' className="fw-bold">ชื่อ-นามสกุล</Form.Label>
                  <Form.Label column sm='9'>{dataUP.Uname}</Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                  <Form.Label column sm='3' className="fw-bold">เบอร์โทรศัพท์</Form.Label>
                  <Form.Label column sm='9'>{dataUP.Uphone}</Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                  <Form.Label column sm='3' className="fw-bold">ที่อยู่ส่งคืน</Form.Label>
                  <Form.Label column sm='9'>{dataUP.ADDaddress} {dataUP.ADDdistrict} {dataUP.ADDamphoe} {dataUP.ADDprovince} {dataUP.ADDzipcode}</Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                  <Form.Label column sm='3' className="fw-bold">รายการที่ส่งคืน</Form.Label>
                  <Form.Label column sm='9'>{dataUP.SSbrand} {dataUP.SSmodel}</Form.Label>
                  </Form.Group>

                  <Form.Group as={Row}>
                  <Form.Label column sm='3' className="fw-bold">วันที่แจ้งขาย</Form.Label>
                  <Form.Label column sm='9'>{dayjs(dataUP.SStime).format("DD/MM/YYYY")}</Form.Label>
                  </Form.Group>



                </Col>

                <Col sm="6" className="border rounded-3 pb-2">
                <Form.Group as={Row}>
                  <Form.Label column sm='12' className="fw-bold text-center">อัพโหลดหลักฐานการส่ง</Form.Label>
                  </Form.Group >
                  <Form.Group as={Row} className="justify-content-center mb-2"> 
                  {imageUrl1 ? (
                  <img src={imageUrl1} className={styles.sellImg2} />
                  ) : (null)}
                </Form.Group>

                    <Form.Control type="file"  className={styles.inputfile}
                          onChange={handleFileChange1}/>

                 

                </Col>
              </Form.Group>
           
            </Form>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            ปิด
          </Button>
          <Button variant="primary" disabled={isActive} onClick={handlesendback}
          >
          ส่งคืน
          </Button>
        </Modal.Footer>
      </Modal>

    </Layoutadmin>
  );
}

export default PInprogess;

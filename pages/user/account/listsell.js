import React from "react";
import Usernav from "@/pages/addon/Usernav";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import { Col, Container, Row, Form, Modal, Button } from "react-bootstrap";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { useEffect, useState } from "react";
import styles2 from "@/styles/list.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faChevronLeft,faChevronCircleRight,faCheck,faTruck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { set } from "react-hook-form";


export const uploadCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Aboutsellservice");
  const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
      formData
  );
  return {publicId:response?.data.public_id, url:response?.data.secure_url}
}


function listsell() {
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

  const fetchData = async (id) => {
    try {
      const res = await axios.post("/api/showsellitemapi", { id });
      setDataRows(res.data.rows);
      console.log(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };
  

 const [imgtrack, setImgtrack] = useState([]);
  const [imgidcard, setImgidcard] = useState([]);
  const [imgpayment, setImgpayment] = useState([]);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [loading, setLoading] = useState(false);









  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [tracking, setTracking] = useState([]); //เก็บค่า tracking number ที่ลูกค้ากรอก
  const handleClose = () => setShow(false);
  const handleshow = async (row) => {
    console.log(row);
    setData(row);
    setShow(true);
  };

  const [isActive, setIsActive] = useState(true);

  const toggleClassName = () => {
    setIsActive(!isActive); // สลับสถานะ isActive
  };
  const [page, setPage] = useState(1);
  const handleNext = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const [preimg, setPreimg] = useState(null);
  const handleFileChange = (event) => {



    setPreimg(URL.createObjectURL(event.target.files[0]));
    
    const file = event.target.files[0];
    console.log(file);  
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
     

      if (allowedTypes.includes(file.type) ) {
        setImgtrack(file);
      } else {
        // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
        console.error(
          "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
        );
      }
    }
  };


  const [preimg1, setPreimg1] = useState(null);
  const handleFileChange1 = (event) => {



    setPreimg1(URL.createObjectURL(event.target.files[0]));
    
    const file = event.target.files[0];
    console.log(file);  
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
     

      if (allowedTypes.includes(file.type) ) {
        setImgidcard(file);
      } else {
        // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
        console.error(
          "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
        );
      }
    }
  };

  const [preimg2, setPreimg2] = useState(null);
  const handleFileChange2 = (event) => {
    setPreimg2(URL.createObjectURL(event.target.files[0]));
    
    const file = event.target.files[0];
    console.log(file);  
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
     

      if (allowedTypes.includes(file.type) ) {
        setImgpayment(file);
      } else {
        // ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB
        console.error(
          "ไฟล์ไม่ใช่รูปภาพประเภท JPEG หรือ PNG หรือมีขนาดเกิน 1 MB"
        );
      }
    }
  };





  const handlesubmit = async() =>{
    if(imgtrack !==null  &&imgidcard!==null&& imgpayment !== null){
      try {
        setLoading(true);
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);


     
        const response = await uploadCloudinary(imgtrack);

       
        if (response.url !== null) setLoading1(false);

        const response1 = await uploadCloudinary(imgidcard);
        if (response1.url !== null) setLoading2(false); 

        const response2 = await uploadCloudinary(imgpayment);
        if (response2.url !== null) setLoading3(false);


       
        setLoading(false);

    

        const res = await axios.post("/api/acceptsellservice", {
          id:data.SSid,
          status:"อยู่ระหว่างการส่งขาย",
          imgtrack:response.url,
          imgidcard:response1.url,
          imgpayment:response2.url,

        });

        if (await res.data.message == "success send") {
          Swal.fire({
            icon: 'success',
            title: 'บันทึกสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })

          handleClose();
          fetchData(id);

        }

      }
      catch (err) {
        console.log(err);
      }
    
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'กรุณาอัพโหลดรูปภาพ',
      text: 'กรุณาอัพโหลดรูปภาพ',

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    }
      )



 }
  }

  return (
    <>
      <Usernav />

      <Container>
        <Row>
          <Col sm={3}>
            <Usermenuaccount />
          </Col>
          <Col sm={9}>
            <Container className={styles.UinCon}>
              <Row>
                <Col sm={10} className="mt-3">
                  <h3 className={styles.UinTitle}>รายการขาย</h3>
                  <p className={styles.UinSubTitle}> รายการขายของคุณ</p>
                </Col>
                <hr />
              </Row>

              <Row>
                <Col sm={12}>
                  {dataRows.map((row, index) => (
                    <div key={index}>
                     
                      <>
                        <Form className={styles2.sellForm}>
                          <Form.Group as={Row}>
                            <Col sm={2} className={styles2.sellBox}>
                              <Form.Label className={styles2.reTitle}>
                                รายการขายที่
                              </Form.Label>
                            </Col>

                            <Col sm={3} className={styles2.sellBox}>
                              <Form.Label className={styles2.reTitle}>
                                ยี่ห้อ
                              </Form.Label>
                            </Col>
                            <Col sm={3} className={styles2.sellBox}>
                              <Form.Label className={styles2.reTitle}>
                                รุ่น
                              </Form.Label>
                            </Col>

                            <Col sm={3} className={styles2.sellBox}>
                              <Form.Label className={styles2.reTitle}>
                                สถานะ
                              </Form.Label>
                            </Col>

                            <Col sm={1} className={styles2.sellBox}></Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Col sm={2} className={styles2.sellBox}>
                              <Form.Label className={styles2.sellsubTitle}>
                                {index + 1}
                              </Form.Label>
                            </Col>

                            <Col sm={3} className={styles2.sellBox}>
                              <Form.Label className={styles2.sellsubTitle}>
                                {row.SSbrand}
                              </Form.Label>
                            </Col>

                            <Col sm={3} className={styles2.sellBox}>
                              <Form.Label className={styles2.sellsubTitle}>
                                {row.SSmodel}
                              </Form.Label>
                            </Col>

                            <Col
                              sm={3}
                              className={`
                          ${
                            row.SSstatus === "ตอบรับการรับซื้อ"
                              ? "text-success text-center fw-bold"
                              : row.SSstatus === "รอการตอบรับ"
                              ? "text-warning text-center fw-bold"
                              : "text-warning text-center fw-bold"
                          }`}
                            >
                              <Form.Label className={styles2.sellsubTitle}>
                                {row.SSstatus}
                                {row.SSstatus === "อยู่ระหว่างการส่งขาย" ? (
                                <FontAwesomeIcon
                                  icon={faTruck}
                                  className={styles2.truck}
                                />):(null)}
                              </Form.Label>
                            </Col>

                            {row.SSstatus === "ตอบรับการรับซื้อ" ? (
                              <Col sm={1} className={styles2.sellBox}>
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
                          {row.SSstatus === "ตอบรับการรับซื้อ" ? (
                            <Form.Group as={Row} className="my-1">
                              <p className="text-secondary fst-italic fw-light">
                                ทางร้านได้มีการตอบรับคำขอของคุณกรุณากดIcon
                                เพื่ออ่านรายละเอียดการตอบกลับจากทางร้าน
                              </p>
                            </Form.Group>
                          ) : (
                            <></>
                          )}
                        </Form>
                      </>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose} size="xl"
          backdrop="static"
          keyboard={false}

         aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title>รายละเอียดการรับซื้อ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            {page === 1 && (<>
               Page {page}/2
              <Form className={styles2.sellForm}>
                <Form.Group as={Row} className="mb-2">
                  <Col sm={5}>
                    <img src={data.SSimg1} className={styles2.sellImg} />
                  </Col>

                  <Col sm={7} className={styles2.sellviewBox}>
                    <Form.Group as={Row} className="text-center mb-2">
                      <Col sm={12}>
                        <h5>รายละเอียดการขาย</h5>
                      </Col>

                      <hr />
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={6}>
                        <Form.Label className={styles2.sellinfo}>
                          ยี่ห้อ : {data.SSbrand}
                        </Form.Label>
                      </Col>
                      <Col sm={6}>
                        <Form.Label className={styles2.sellinfo}>
                          รุ่น : {data.SSmodel}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={6}>
                        <Form.Label className={styles2.sellinfo}>
                          ปัญหา : {data.SSproblem}
                        </Form.Label>
                      </Col>
                      <Col sm={6}>
                        <Form.Label className={styles2.sellinfo}>
                          ราคาที่ต้องการ : {data.SSprice}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col sm={4}>
                        <Form.Label className={styles2.sellinfo}>
                          รายละเอียดเพิ่มเติม:
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Label className={styles2.sellinfo1}>
                          {data.SSdetails}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                  <Form.Group as={Row} className="text-center mb-2">
                    <h5>รายละเอียดการตอบกลับจากแอดมิน</h5>
                    <hr />
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={2}>
                      <Form.Label className={styles2.sellinfo}>
                        ราคาที่รับซื้อ :
                      </Form.Label>
                    </Col>
                    <Col sm={4}>
                      <Form.Label className={styles2.sellinfo}>
                        {data.SS_ad_apprise}
                      </Form.Label>
                    </Col>
                    <Col sm={2}>
                      <Form.Label className={styles2.sellinfo}>
                        สถานะ :
                      </Form.Label>
                    </Col>
                    <Col sm={4}>
                      <Form.Label className={styles2.sellinfo}>
                        {data.SSstatus}
                      </Form.Label>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={3}>
                      <Form.Label className={styles2.sellinfo}>
                        รายละเอียดเพิ่มเติม:
                      </Form.Label>
                    </Col>
                    <Col sm={9}>
                      <Form.Label className={styles2.sellinfo1}>
                        {data.SS_ad_detail}
                      </Form.Label>
                    </Col>
                  </Form.Group>

                  <Row>
          
                      <Form.Group as={Row}>
                        <Col sm={2} className="text-start">
                          <Form.Label className={styles2.sellinfo}>
                            ที่อยู่ส่งซ่อม:
                          </Form.Label>
                        </Col>
                        <Col sm={5} className="text-start">
                          <Form.Label className={styles2.sellinfo}>
                            {" "}
                            157/3 ถนนประชาธิปไตย ตำบลท่าพี่เลี้ยง อำเภอเมือง
                            จังหวัดสุพรรณบุรี
                          </Form.Label>
                          
                        </Col>

                        
                      </Form.Group>
                

                 
                  </Row>
                  <p className="text-danger mt-2">
                    **กรุณาใส่เลขรหัสพัสดุเพื่อให้แอดมินติดตามสถานะอุปกรณ์ที่ส่งขาย
                    ก่อนที่กดยืนยันซ่อมเพื่อเป็นการเปลี่ยนสถานะการขายของลูกค้า{" "}
                    {"("}หากไม่ต้องการส่งซ่อมให้ลูกค้าปฎิเสธการขาย{")"}
                  </p>
                </Form.Group>
               
              </Form></>
            )}
            {page === 2 && (
              <>
              Page {page}/2
              <Form className={styles2.sellForm}>

               <Row>
                <Col sm={4} className="text-center">
                <Form.Group as={Row} className="mb-2">
                      <Form.Label column sm="12" className="text-center fs-bold">
                       อัพโหลดหลักฐานการส่ง
                      </Form.Label>
                </Form.Group>
                <Form.Group className="justify-content-center" as={Row}>
                       <img src={preimg} className={styles2.sellImgpre} />
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
                           
                            ไฟล์ที่รองรับ: .JPEG, .PNG.
                          </Form.Label>
                        </Col>
                      </Form.Group>
                
                {loading ?(<>
                {loading1 ? (<><Row><div className={styles2.loader}></div></Row></>
                ):(<><Row><div className="justify-content-center"><FontAwesomeIcon style={{color:"#9625f3"}} size="2x" icon={faCheck}/></div></Row></>)
                }</>):null}
                </Col>


                <Col sm={4} className="text-center">
                <Form.Group as={Row} className="mb-2">
                      <Form.Label column sm="12" className="text-center fs-bold">
                       อัพโหลดรูปบัตรปชชโดยไม่ต้องแสดงเลขบัตรปชช
                      </Form.Label>
                </Form.Group>

                <Form.Group className="justify-content-center" as={Row}>
                       <img src={preimg1} className={styles2.sellImgpre} />
                  </Form.Group>
                
                <Form.Group className="mt-4" as={Row}>
                        <Col sm="12" className="d-flex justify-content-center">
                          <div className="btn btn-secondary btn-rounded">
                            <label
                              className="form-label text-white m-1"
                              for="customFile2"
                            >
                              เลือกรูป
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile2"
                              accept="image/jpeg, image/png"
                              onChange={handleFileChange1}
                            />
                          </div>
                        </Col>
                      </Form.Group>

                      <Form.Group className="mt-4" as={Row}>
                        <Col sm="12" className="d-flex justify-content-center">
                          <Form.Label className={styles.UinSubTitle}>
                           
                            ไฟล์ที่รองรับ: .JPEG, .PNG.
                          </Form.Label>
                        </Col>
                      </Form.Group>
                {loading ?(<>
                {loading2 && loading? (<><Row><div className={styles2.loader}></div></Row></>
                ):(<><Row><div className="justify-content-center"><FontAwesomeIcon style={{color:"#9625f3"}} size="2x" icon={faCheck}/></div></Row></>)
                }</>):null}
                </Col>


                <Col sm={4} className="text-center">
                <Form.Group as={Row} className="mb-2">
                      <Form.Label column sm="12" className="text-center fs-bold">
                       อัพโหลดช่องทางการรับเงิน
                      </Form.Label>
                </Form.Group>
                <Form.Group className="justify-content-center" as={Row}>
                       <img src={preimg2} className={styles2.sellImgpre} />
                  </Form.Group>
                <Form.Group className="mt-4" as={Row}>
                        <Col sm="12" className="d-flex justify-content-center">
                          <div className="btn btn-secondary btn-rounded">
                            <label
                              className="form-label text-white m-1"
                              for="customFile3"
                            >
                              เลือกรูป
                            </label>
                            <input
                              type="file"
                              className="form-control d-none"
                              id="customFile3"
                              accept="image/jpeg, image/png"
                              onChange={handleFileChange2}
                            />
                          </div>
                        </Col>
                      </Form.Group>
                      

                      <Form.Group className="mt-4" as={Row}>
                        <Col sm="12" className="d-flex justify-content-center">
                          <Form.Label>
                           
                            ไฟล์ที่รองรับ: .JPEG, .PNG.
                          </Form.Label>
                        </Col>
                      </Form.Group>
                {loading ?(<>
                {loading3 && loading? (<><Row><div className={styles2.loader}></div></Row></>
                ):(<><Row><div className="justify-content-center"><FontAwesomeIcon style={{color:"#9625f3"}} size="2x" icon={faCheck}/></div></Row></>)
                }</>):(null)} 
                </Col>

               </Row>
                 
                

              </Form>
              </>

            )}
               
            </>
          </Modal.Body>
          <Modal.Footer>
              {page === 1 ? (<>
            <Button variant="secondary" onClick={handleClose}>
              ปิด
            </Button>
             <Button variant="danger" onClick={handleClose}>
             ปฎิเสธการซ่อม
           </Button></>
          ) : (
            <Button variant="secondary" onClick={handleBack}>
              กลับ
            </Button>
          )}
          {page === 2 ? (
            <><Button variant="danger" onClick={handleClose}>
             ปฎิเสธการซ่อม
           </Button>
            <Button variant="primary" onClick={handlesubmit}>
              บันทึก
            </Button>
             </>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              ถัดไป{"("}เพื่อยืนยันการส่งซ่อม{")"}
            </Button>
          )}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default listsell;

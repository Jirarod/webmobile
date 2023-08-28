import React, { useState, useEffect, use } from "react";
import Layoutadmin from "../Components/layoutadmin";
import {
  Nav,
  Container,
  Col,
  Row,
  Card,
  Modal,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import styles from "@/styles/Repairadmin.module.css";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
function RInprogess() {
  const [dataRow, setdataRow] = useState([]);
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState();

  const [estimatedtime, setestimatedtime] = useState();
  const [estimatedprice, setestimatedprice] = useState();

  const handleedit = (row) => {
    setdata(row);
    setShow(true);
    setstatus(row.RSstatus);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post("/api/admin/requestrepairshow", {
        status: "อยู่ระหว่างการส่งซ่อม",
      });
      setdataRow(res.data.rows);
      console.log(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const handlestatus = async () => {
    try {
      if (status === "ดำเนินการการซ่อม") {
        console.log("if");
        const res = await axios.post("/api/admin/updatestatus", {
          RSid: data.RSid,
          RSstatus: status,
          RS_ad_appraise: estimatedprice,
          RS_ad_finishtime: estimatedtime,
        });

        setShow(false);
        fetchData();
      } else {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "Payment");
        formData.append("cloud_name", "dsacsgwkl");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
          formData
        );
        console.log(res.data.secure_url);
        const res2 = await axios.post("/api/admin/updatestatus", {
          RSid: data.RSid,
          RSstatus: status,
          RS_ad_appraise: estimatedprice,
          RS_ad_finishtime: estimatedtime,
          RS_ad_payment: res.data.secure_url,
        });

        if (res2.data.message === "success send") {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "บันทึกไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        

        setShow(false);
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
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
  


  return (
    <Layoutadmin>
      <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Repair/RInprogess"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Repair/Rlist">รายการขอซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/Repair/RInprogess">
            รายการดำเนินการซ่อม
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/Repair/Rpayment">รายการรอชำระ</Nav.Link>

        </Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rsuccess">รายการชำระเสร็จสิ้น</Nav.Link></Nav.Item>
      </Nav>

      <Container className={styles.containerin}>
        <table className="table  table-striped ">
          <thead className="text-center">
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">รายการ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">วันที่แจ้ง</th>
              <th scope="col">track number</th>
              <th scope="col">ผู้ดำเนินการ</th>
              <th scope="col">ราคาที่ประเมินไว้</th>
              <th scope="col">แก้ไข</th>
            </tr>
          </thead>

          <tbody className="text-center ">
            {dataRow.map((row, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {row.RSbrand} {row.RSmodel}
                </td>
                <td
                  className={`styles2.resubTitle 
                          ${
                            row.RSstatus === "อยู่ระหว่างการส่งซ่อม"
                              ? "text-warning mx-2 fw-bold"
                              : row.RSstatus === "ดำเนินการการซ่อม"
                              ? "text-success mx-2 fw-bold"
                              : ""
                          }`}
                >
                  {row.RSstatus}
                </td>
                <td>{dayjs(row.RStime).format("YYYY-MM-DD")}</td>
                <td>{row.RStrackid}</td>
                <td>{row.Uname}</td>
                <td>{row.RS_ad_appraise}</td>
                <td>
                  <FontAwesomeIcon
                    className={`text-warning ${styles.editicon}`}
                    icon={faPen}
                    onClick={() => handleedit(row)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรายการซ่อม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={7}>
              <Form className="border px-2 rounded bg-light">
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    sm="12"
                    className="fw-bolder text-center fs-4"
                  >
                    รายละเอียด
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="2" className="fw-bolder">
                    รายการ
                  </Form.Label>
                  <Form.Label column sm="4" className="fst-italic fw-medium">
                    {data.RSbrand} {data.RSmodel}
                  </Form.Label>
                  <Form.Label column sm="2" className="fw-bolder">
                    สถานะ
                  </Form.Label>

                  <Form.Label
                    column
                    sm="4"
                    className={`styles2.resubTitle 
                          ${
                            data.RSstatus === "อยู่ระหว่างการส่งซ่อม"
                              ? "text-warning  fw-bold"
                              : data.RSstatus === "ดำเนินการการซ่อม"
                              ? "text-success  fw-bold"
                              : ""
                          }`}
                  >
                    {status}
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm="2" className="fw-bolder">
                    วันที่แจ้ง
                  </Form.Label>
                  <Form.Label column sm="4" className="fst-italic fw-medium">
                    {dayjs(data.RStime).format("YYYY-MM-DD")}
                  </Form.Label>

                  <Form.Label column sm="2" className="fw-bolder">
                    track number
                  </Form.Label>
                  <Form.Label column sm="4" className="fst-italic fw-medium">
                    {data.RStrackid}
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                  <Form.Label column sm="3" className="fw-bolder">
                    ผู้ดำเนินการ
                  </Form.Label>
                  <Form.Label
                    column
                    sm="9"
                    className="fst-italic fw-medium text-secondary"
                  >
                    {data.Uname}
                  </Form.Label>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="6" className="fw-bolder">
                    ราคาที่ประเมินไว้ก่อนหน้า
                  </Form.Label>

                  <Form.Label
                    column
                    sm="5"
                    className="fst-italic fw-medium border text-center text-light rounded bg-secondary"
                  >
                    {data.RS_ad_appraise}
                  </Form.Label>
                </Form.Group>
              </Form>
            </Col>

            <Col sm={5}>
              <Form>
                <Form.Group as={Row}>
                  {status === "ซ่อมสำเร็จ" ? (
                    <>
                      <Form.Label
                        column
                        sm="12"
                        className="fw-bolder text-center"
                      >
                        อัพโหลดช่องทางการชำระเงิน
                      </Form.Label>
                    </>
                  ) : (
                    <>
                      <Form.Label
                        column
                        sm="12"
                        className="fw-bolder text-center"
                      >
                        แก้ไขสถานะ
                      </Form.Label>
                    </>
                  )}
                </Form.Group>

                {data.RSstatus === "ดำเนินการการซ่อม" ? (
                  <>
                    {status === "ซ่อมสำเร็จ" ? (
                      <>
                        <Form.Group
                          as={Row}
                          className=" justify-content-center"
                         
                        >
                          {imageUrl && <img src={imageUrl} alt="Uploaded" className={styles.croppedImage} />}
                          
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className=" justify-content-center"
                        >
                          <label
                            htmlFor="upload-button"
                            className={styles.customFileUpload}
                          > Click me upload <FontAwesomeIcon icon={faFileArrowUp}></FontAwesomeIcon></label>
                          <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3"
                          >
                            <input
                              type="file"
                              id="upload-button"
                              accept="image/jpeg, image/png"
                              className={styles.upInput}

                              onChange={handleFileChange}
                            />
                          </Form.Group>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                        >
                          
                          <Col sm="10">
                            <Form.Control
                              className="customInput text-center"
                              
                              type="number"
                              placeholder="ราคาที่ลูกค้าต้องชำระ"
                              onChange={(e) => setestimatedprice(e.target.value)}
                            />
                          </Col><Form.Label
                            column
                            sm="2"
                            className="fw-bolder text-start"
                          >
                            บาท
                          </Form.Label>

                        </Form.Group>

                      </>
                    ) : (
                      <>
                        <Form.Group
                          as={Row}
                          className=" justify-content-center"
                        >
                          <Col sm="10">
                            <Button
                              variant="outline-success"
                              className="w-100"
                              onClick={() => setstatus("ซ่อมสำเร็จ")}
                            >
                              ซ่อมสำเร็จ
                            </Button>
                          </Col>
                        </Form.Group>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Form.Group as={Row}>
                      <Button
                        variant="outline-success"
                        className="w-100"
                        onClick={() => setstatus("ดำเนินการการซ่อม")}
                      >
                        ดำเนินการการซ่อม
                      </Button>
                      <Form.Group as={Row}>
                        <Form.Label
                          column
                          sm="12"
                          className="fw-bolder text-center"
                        >
                          โปรดระบุเวลาในการซ่อม
                        </Form.Label>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="3" className="fw-bolder">
                          วันที่
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="date"
                            placeholder="วันที่"
                            onChange={(e) => setestimatedtime(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row}>
                        <Form.Label column sm="3" className="fw-bolder">
                          ราคาประเมิน
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            className="mt-2 customInput"
                            type="number"
                            placeholder="ราคาประเมิน"
                            onChange={(e) => setestimatedprice(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <p className="text-danger">
                        ***ราคาที่ประเมินนี้เป็นราคาที่ประเมินหลังจากได้รับเครื่องแล้วประเมินใกล้เคียงที่สุด
                      </p>
                    </Form.Group>
                  </>
                )}
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handlestatus}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </Layoutadmin>
  );
}

export default RInprogess;

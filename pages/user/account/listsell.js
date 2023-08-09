import React from "react";
import Usernav from "@/pages/addon/Usernav";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import { Col, Container, Row, Form, Modal } from "react-bootstrap";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { useEffect, useState } from "react";
import styles2 from "@/styles/list.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
function listsell() {
  const [id, setId] = useState("");
  const [dataRows, setDataRows] = useState([]);
  const [show, setShow] = useState(false);
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
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlemore = async (e) => {
    setShow(true);
    if (show === true) {
      setShow(false);
    }
    e.preventDefault();
  };

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
                      {show ? (
                        <>
                         <Form className={styles2.sellForm}>
                            <Form.Group as={Row} className="mb-2">
                              <Col sm={5}>
                                <img
                                  src={row.SSimg1}
                                  className={styles2.sellImg}
                                />
                              </Col>

                              <Col sm={7} className={styles2.sellviewBox}>
                                <Form.Group
                                  as={Row}
                                  className="text-center mb-2"
                                >
                                  <Col sm={11}><h5>รายละเอียดการขาย</h5></Col>

                                  <Col sm={1}>
                                  <FontAwesomeIcon
                                  icon={faEye}
                                  className={styles2.sellIcon}
                                  onClick={handlemore}
                                /> </Col>
                                  <hr />
                                </Form.Group>

                                <Form.Group as={Row}>
                                  <Col sm={6}>
                                    <Form.Label className={styles2.sellinfo}>
                                      ยี่ห้อ : {row.SSbrand}
                                    </Form.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Label className={styles2.sellinfo}>
                                      รุ่น : {row.SSmodel}
                                    </Form.Label>
                                  </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                  <Col sm={6}>
                                    <Form.Label className={styles2.sellinfo}>
                                      ปัญหา : {row.SSproblem}
                                    </Form.Label>
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Label className={styles2.sellinfo}>
                                      ราคาที่ต้องการ : {row.SSprice}
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
                                      {row.SSdetails}
                                    </Form.Label>
                                  </Col>
                                </Form.Group>
                              </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-2">
                              <Col sm={12} className={styles2.sellviewBox}>
                                <Form.Group
                                  as={Row}
                                  className="text-center mb-2"
                                >
                                  <h5>รายละเอียดการตอบกลับจากแอดมิน</h5>
                                  <hr />
                                </Form.Group>
                              </Col>


                            </Form.Group>
                          </Form>
                        </>
                      ) : (
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

                              <Col sm={3} className={styles2.sellBox}>
                                <Form.Label className={styles2.sellsubTitle}>
                                  {row.SSstatus}
                                </Form.Label>
                              </Col>

                              <Col sm={1} className={styles2.sellBox}>
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className={styles2.sellIcon}
                                  onClick={handlemore}
                                />
                              </Col>
                            </Form.Group>
                          </Form>
                        </>
                      )}
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default listsell;

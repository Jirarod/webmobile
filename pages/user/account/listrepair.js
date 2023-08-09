import React, { useEffect, useState } from "react";
import Usernav from "@/pages/addon/Usernav";
import styles from "@/styles/Home.module.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import Usermenuaccount from "@/pages/addon/Usermenuaccount";
import styles2 from "@/styles/list.module.css";
import { decode } from "jsonwebtoken";
import axios from "axios";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTrashCan,
  faChevronCircleDown,
  faChevronDown,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { set } from "react-hook-form";
function listrepair() {
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
      const res = await axios.post("/api/showrepairitemapi", { id });
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
                      <Form className={styles2.reForm} onClick={handlemore}>
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
                          <Col sm={1}>  <FontAwesomeIcon
                              icon={faEye}
                              className={styles2.sellIcon}
                              onClick={handlemore}
                            /></Col>
                        </Form.Group>

                        {show ? (<Form.Group>
                              <Form.Label className={styles2.reTitle}>
                                ปัญหา :
                              </Form.Label>
                              <p className={styles2.reproblem}>
                                {" "}
                                {row.RSproblem}
                              </p>
                            </Form.Group>):(<></>)}

                        <Form.Group>
                          <Form.Label className={styles2.reTitle}>
                            สถานะการตอบกลับ:
                          </Form.Label>
                          <Form.Label className={styles2.resubTitle}>
                            {" "}
                            {row.RSstatus}
                          </Form.Label>
                        </Form.Group>

                        {show ? (
                          <>
                            
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <hr className={styles2.hr} />
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className={styles2.icon}
                              />
                              <hr className={styles2.hr} />
                            </div>

                            <Form.Group as={Row}>
                              <Form.Label className={styles2.reheadansTitle}>
                                การตอบกลับจากแอดมิน
                              </Form.Label>
                            </Form.Group>

                            <Form.Group as={Row}>
                              <Col sm={2}>
                                <Form.Label className={styles2.reTitle}>
                                  รายละเอียดเพิ่มเติม:
                                </Form.Label>
                              </Col>
                              <Col sm={4}>
                                <Form.Label className={styles2.reAns}>
                                  {" "}
                                  saddsssssssssssssssssssssssssssssssssssssdasdad
                                </Form.Label>
                              </Col>
                              <Col sm={2}>
                                <Form.Label className={styles2.reTitle}>
                                  ราคาประเมิน:
                                </Form.Label>
                              </Col>
                              <Col sm={4}>
                                <Form.Label className="mt-1">
                                  {" "}
                                  4000-7000
                                </Form.Label>
                              </Col>
                            </Form.Group>
                          </>
                        ) : (
                          <> </>
                        )}
                      </Form>
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default listrepair;

import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/recieptsell.module.css";
import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { parse } from "path";
import ImagePopup from "@/pages/addon/ImagePopup";
import dayjs from "dayjs";

function recieptsell() {
  const router = useRouter();
  const { data } = router.query;

  const parsedData = JSON.parse(data);



   
      const [showPopup, setShowPopup] = useState(false);
      const [selectedImage, setSelectedImage] = useState(null);
    
      const openPopup = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowPopup(true);
      };
    
      const closePopup = () => {
        setSelectedImage(null);
        setShowPopup(false);
      };

  console.log(parsedData);
  return (
    <div className={styles.backgound}>
      <Container className={styles.Conrec}>
        <Form className={styles.Formrec}>
          <Row>
            <Col sm={6}></Col>

            <Col className="text-end" sm={6}>
              <Form.Label column sm="12" className="fw-bold fs-5">
                ใบหลักโอนเงินจากทางร้าน
              </Form.Label>

              <Form.Label column sm="12" className="fw-bold">
                ที่อยู่
              </Form.Label>

              <Form.Label column sm="7" className="">
                ร้านสมายโฟนช็อป 157/3 ถนนประชาธิปไตย ตำบลท่าพี่เลี้ยง อำเภอเมือง
                จังหวัดสุพรรณบุรี
              </Form.Label>
            </Col>
          </Row>
          <Row className={styles.rowdetails}>
            <Form.Label column sm="12" className="fw-bold">
                รายละเอียด
                </Form.Label>
                <Form.Label column sm="12" className="">
                ชื่อผู้ขาย : {parsedData[0].Uname}
                </Form.Label>
                <Form.Label column sm="12" className="">
                เบอร์โทรศัพท์ : {parsedData[0].Uphone}
                </Form.Label>
                <Form.Label column sm="12" className="">
                อีเมล : {parsedData[0].Uemail}
                </Form.Label>
                <Form.Label column sm="12" className="">
                ที่อยู่ : {parsedData[0].ADDadrress} อำเภอ/เขต : {parsedData[0].ADDdistrict} จังหวัด: {parsedData[0].ADDprovince} รหัสไปรษณีย์: {parsedData[0].ADDzipcode} 
                </Form.Label>
                <Form.Label column sm="12" className="fw-bold">
                ได้ขายสินค้าต่อร้านสมายโฟนช็อป ดังนี้
                </Form.Label>
          </Row>

          <table className="table table-bordered ">
            <thead className="text-center">
                <tr>
                    <th scope="col" >ลำดับ</th>
                    <th scope="col">รายการ</th>
                    <th scope="col">ราคา</th>
                    <th scope="col">วันที่แจ้งขาย(วัน/เดือน/ปี)</th>
                </tr>

            </thead>
            <tbody>
                <tr  className="text-center">
                    <th scope="row">1</th>
                    <td>{parsedData[0].brand} {parsedData[0].SSmodel}</td>
                    <td>฿ {parsedData[0].SS_ad_apprise}</td>
                    <td>{dayjs(parsedData[0].SStime).format("DD/MM/YYYY")}</td>
                </tr>
                </tbody>
                </table>

                <Button variant="primary" onClick={() => openPopup(parsedData[0].SS_ad_slip)} className={styles.btn}>
                    ดูหลักฐานการโอนเงิน
                </Button>


                {showPopup && (
        <ImagePopup imageUrl={selectedImage} onClose={closePopup} />
      )}




        </Form>
      </Container>
    </div>
  );
}

export default recieptsell;

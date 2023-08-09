import React,{useEffect, useState} from "react";
import {
    Container,
    Row,
    Col,
    Image,
  } from "react-bootstrap";
  import styles from "@/styles/Home.module.css";
  import { decode } from "jsonwebtoken";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faUser ,faPen,faBell,faClipboardList} from "@fortawesome/free-solid-svg-icons";
  
  import Link from "next/link";

function Usermenuaccount() {
    const [accountname, setAccountname] = useState("");
    const [accountprofileimage, setAccountprofileimage] = useState("");

    useEffect(() => {

    const token = localStorage.getItem("token");
    const decoded = decode(token);
    if(token){
    setAccountname(decoded.name);
    setAccountprofileimage(decoded.image);
    }else{
        setAccountname("");
        setAccountprofileimage("");

    }
    }, []);


  return (
    <>
      <Container className={styles.UinMeCon}>
        <Row>
          <Col sm={3} className="mt-3">
            <Image
              src={accountprofileimage}
              rounded
              className={styles.UiImgprofilehead}
            />
          </Col>
          <Col sm={9} className="mt-3">
            <h3 className={styles.UinTitle}>Profile</h3>
            <p>{accountname}</p>
          </Col>
        </Row>
        <hr />
        <ul className={styles.UinUl}>
          <FontAwesomeIcon icon={faUser} className="mx-2" /> บัญชีของฉัน
          <Link href="/user/account/profile">
            {" "}
            <li className={styles.Uinli}>ข้อมูลส่วนตัว</li>{" "}
          </Link>
          <Link href="/user/account/address">
            {" "}
            <li className={styles.Uinli}>ที่อยู่จัดส่ง</li>{" "}
          </Link>

          <Link href="/user/account/changepassword">
            {" "}
          <li className={styles.Uinli}> เปลี่ยนรหัสผ่าน</li>
          </Link>

          <FontAwesomeIcon icon={faClipboardList} className="mx-2" /> รายการของฉัน
          <li className={styles.Uinli}> รายการสั่งซื้อ</li>
          <Link href="/user/account/listrepair"><li className={styles.Uinli}> รายการซ่อม</li></Link>
          <Link href="/user/account/listsell"><li className={styles.Uinli}> รายการขาย</li></Link>



          <FontAwesomeIcon icon={faBell} className="mx-2" /> การแจ้งเตือน
          <li className={styles.Uinli}> แจ้งเตือนการซ่อม</li>
          <li className={styles.Uinli}> แจ้งเตือนการขาย</li>
    
         

        </ul>
       

      </Container>
    </>
  );
}

export default Usermenuaccount;

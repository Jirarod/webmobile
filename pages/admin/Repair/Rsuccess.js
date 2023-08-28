import React from 'react'
import Layoutadmin from '../Components/layoutadmin'
import {Nav,Container,Col,Row,Card,Modal,Button, Form,Dropdown} from 'react-bootstrap'
import styles from '@/styles/Repairadmin.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Rsucces() {
  const [dataRows,setDataRows] = useState([])
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.post("/api/admin/requestrepairshow", {
        status: "ชำระเงินแล้ว",
      });
      setDataRows(res.data.rows);
      console.log(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const [trackid, setTrackid] = useState("");

  const updatetrackid = async (RSid) => {
    
    try {
      const res = await axios.post("/api/admin/updatetrackad", {
        RSid: RSid,
        RS_ad_trackid: trackid,
      });
      console.log(res.data.rows);
      if (await res.data.message == "success send") {
        alert("บันทึกเลขพัสดุเรียบร้อย");
      }
      
      fetchData();


    } catch (err) {
      console.log(err);
    }
  };








  return (
    <Layoutadmin>
           <Nav
        variant="tabs"
        className={styles.navtab}
        defaultActiveKey="/admin/Repair/Rsuccess"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Repair/Rlist">รายการขอซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/Repair/RInprogess">รายการดำเนินการซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rpayment">รายการรอชำระ</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rsuccess">รายการชำระเสร็จสิ้น</Nav.Link></Nav.Item>
      </Nav>

      <Container className={styles.containerin}>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่ออุปกรณ์</th>
              <th scope="col">ชื่อผู้ใช้แจ้งซ่อม</th>
              <th scope="col">วันที่แจ้งซ่อม</th>
              <th scope="col">วันที่ซ่อมสำเร็จ</th>
              <th scope="col">ราคา</th>
              <th scope="col">สถานะ</th>
              <th scope="col">ใส่เลขพัสดุ</th>
              <th scope="col">ยืนยัน</th>

            </tr>
          </thead>

          <tbody className="text-center justify-content-center">
            {dataRows.map((row,index) => (
              
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td className='text-uppercase'>{row.RSbrand} {row.RSmodel}</td>
              <td>{row.Uname}</td>
              <td> {dayjs(row.RStime).format("YYYY-MM-DD ")}</td>
              <td> {dayjs(row.RS_ad_finishtime).format("YYYY-MM-DD")}</td>
              <td>{row.RS_ad_appraise}</td>
              <td className='fw-bold text-success'>{row.RSstatus} <FontAwesomeIcon icon={faCheckCircle}/> </td>
              
              {row.RS_ad_trackid==""?(
              <><td>
               
            <input className={styles.input} onChange={(e)=>setTrackid(e.target.value)}></input>
         
            </td>
              <td><button onClick={() => updatetrackid(row.RSid)} className={styles.button}>ยืนยัน</button></td></>
              ):
              (
                <><td>{row.RS_ad_trackid}</td>
                <td className='fw-bold text-success'><FontAwesomeIcon icon={faCheckCircle}/> </td></>

              )
              }
              
            </tr>
            ))}
            </tbody>
        </table>

         
      
        
        </Container>
    </Layoutadmin>
  )
}

export default Rsucces
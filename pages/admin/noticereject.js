import React,{useEffect,useState} from 'react'
import Layoutadmin from './Components/layoutadmin'
import { Card, Container,Col,Row, Button,Nav } from 'react-bootstrap'
import styles from "@/styles/notice.module.css";
import axios, { all } from 'axios';
import dayjs from 'dayjs';
function noticereject() {
  
  useEffect(() => {
    getnotice()
  }, [])

  const [allnotice, setallnotice] = useState([]);

  const getnotice = async () => {
    const res = await axios.get("/api/admin/noticereject")
    console.log(res.data.combinedData      )

    setallnotice(res.data.combinedData)

  }
  const [data, setData] = useState([]);
  
//   const read = async (item) => {
//     console.log(item)
//     if(item.Ntype === "รายการซ่อม")
//     {
//       window.location.href = `/admin/Repair/Rlist`
//     }
//     else if(item.Ntype === "รายการรับซื้อ")
//     {
//       window.location.href = `/admin/Purchase/Plist`
//     }
//     else if(item.Ntype === "รายการสั่งซื้อ")
//     {
//       window.location.href = `/admin/Sale/reqproduct`
//     }
//     else
//     {
//      window.location.href = `/admin/noticereject`
//     }


//   }

    const del = async (Nid) => {  
    console.log(Nid)
    try {
      const res = await axios.post("/api/admin/delnotice", { Nid : Nid })
      console.log(res.data)
      window.location.reload();
    }
    catch (err) {
        console.log(err.response.data.msg)
    }
   
    }






  return (
    <Layoutadmin>
      <h3 className='text-center'>การแจ้งเตือน</h3>
      <Nav
        variant="tabs"
        className="justify-content-center my-3"
        defaultActiveKey="/admin/noticereject">
        <Nav.Item>
          <Nav.Link href="/admin/notice">การแจ้งเตือนที่ยังไม่ได้อ่าน</Nav.Link>
          
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/noticereaded">การแจ้งเตือนที่อ่านแล้ว</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/noticereject">การแจ้งเตือนรายการที่ยกเลิก</Nav.Link>
        </Nav.Item>
      </Nav>



      <Container fluid className={styles.Con} >
        {allnotice.map((item) => (<>
        <Card className={` ${styles.card}`} >
          <Card.Body>
            <Row>
            <Col sm="2">
              {item.user.Uimage === null ?
              (
               <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Avatar" className={styles.imgprofile} /> 
              ):(
              <img src={item.user.Uimage} alt="Avatar" className={styles.imgprofile} />
              )}

            </Col>
            <Col sm="8">
              <Card.Title>{item.rows.Ntype}</Card.Title>
              <Row>
              <Col sm="4">
              <Card.Text>
                ชื่อผู้แจ้ง : {item.user.Uname}
              </Card.Text>
              <Card.Text>
                วันที่แจ้ง : {dayjs(item.rows.Ntimes).format('YYYY-MM-DD HH:mm')}
              </Card.Text>
              </Col>
              <Col sm="8">
              <Card.Text>
                รายละเอียด : {item.rows.Nmessage}
              </Card.Text>
              </Col>
              </Row>
              <Card.Text className={styles.contrack}>
               ช่องทางการติดต่อ : {item.user.Uemail} , {item.user.Uphone}
              </Card.Text>
            </Col>
            <Col sm="2" className='d-flex justify-content-center align-content-center'>
             <button variant="primary" onClick={()=>del(item.rows.Nid)} className={styles.btnclose}>X</button>
            </Col>
            </Row>
          </Card.Body>
        </Card>

        </>
        ))}
        {allnotice.length === 0 ? (
          <div className={styles.nodata}>
            <h3>ไม่มีข้อมูลการแจ้งเตือน</h3>
          </div>
        ):(
          null
        )
        }
        
      </Container>
      </Layoutadmin>
  )
}
export default noticereject
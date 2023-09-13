import React,{useRef,useEffect,useState} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import { Container, Nav,Modal,Button,Table ,Form,Row,Col} from "react-bootstrap";
import styles from '@/styles/Purchaseadmin.module.css'
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables";
import axios from 'axios'
import dayjs from 'dayjs';


function Psuccess() {
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);


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
      const res = await axios.get("/api/admin/showpurchasesucces");
    
      if (res.data.rows.length > 0)
      setTableData(res.data.rows);
      else setTableData([]);

    } catch (err) {
      console.log(err);

    }
  };

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setData(row);
    setShow(true);
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


  return (
    <Layoutadmin>     <Nav
    variant="tabs"
    className="justify-content-center"
    defaultActiveKey="/admin/Purchase/Psuccess"
  >
    <Nav.Item>
      <Nav.Link href="/admin/Purchase/Plist">รายการรับซื้อ</Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link href="/admin/Purchase/PInprogess">รายการกำลังดำเนินการ</Nav.Link>
    </Nav.Item>

    <Nav.Item>
          <Nav.Link href="/admin/Purchase/Psuccess">
            รายการเสร็จสิ้น
          </Nav.Link>
        </Nav.Item>
    
  </Nav>

    <h1 className="text-center  mt-3">รายการเสร็จสิ้น</h1>

    <Table
      id="myTable"
      hover
      variant="white"
      striped
      ref={tableRef}
      className="text-center"
    >
      <thead>
        <tr>
          <th>ลำดับ</th>
          <th>ชื่อรายการ</th>
          <th>ชื่อผู้ขาย</th>
          <th>วันที่ขาย</th>
          <th>ราคาที่รับซื้อ</th>
          <th>สถานะ</th>
          <th>รายละเอียด</th>
        </tr>

      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className={styles.text}>{index + 1}</td>
            <td className={styles.text}>{row.SSbrand}  {row.SSmodel}</td>
            <td className={styles.text}>{row.Uname}</td>
            <td className={styles.text}>{dayjs(row.SSdate).format('DD/MM/YYYY')}</td>
            <td className={styles.text}>{row.SS_ad_apprise}</td>
            <td className={styles.text}>{row.SSstatus}</td>
            <td className={styles.text}>
              <Button variant="primary" className={styles.btndetails} onClick={() => {
                handleShow(row);
              }}>รายละเอียด</Button>
            </td>

              


          </tr>
        ))}
      </tbody>
    </Table>


    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>รายละเอียด</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {page === 1 && (<>
               Page {page}/2
          <Form.Group >
            <Form.Label column sm="12" className='text-center fs-5'>
              รายการการรับซื้อ
            </Form.Label>
          </Form.Group>
          <Form.Label column sm="12" className='text-end'>
              วันที่ขาย : {dayjs(data.SSdate).format('DD/MM/YYYY')}
            </Form.Label>

          <Form.Group as={Row} >
            <Col sm="1">
            </Col>
            <Form.Label column sm="5">
              ชื่อผู้ขาย : {data.Uname}
            </Form.Label>
            <Col sm="1">
            </Col>
            <Form.Label column sm="5">
              เบอร์โทรศัพท์ : {data.Uphone}
            </Form.Label>
            </Form.Group>

            <Form.Group as={Row} className="">
              <Form.Label column sm="6">
                ที่อยู่ปัจจุบัน : {data.ADDaddress}  
                </Form.Label>

                <Form.Label column sm="3">
                อำเภอ/เขต : {data.ADDdistrict}
                </Form.Label>

                <Form.Label column sm="3">
                รหัสไปรษณีย์ : {data.ADDzipcode}
                </Form.Label>
              </Form.Group>

              <Form.Group as={Row} >
            <Col sm="1">
            </Col>
            <Form.Label column sm="11">
              ได้นำโทรศัพท์มือถือ : {data.SSbrand}  {data.SSmodel} มาขายให้กับทางร้าน โดยมีรายละเอียดดังนี้

            </Form.Label>
            </Form.Group>

            <Form.Group as={Row} >

            <Form.Label column sm="12">
              {data.SSdetails} ปัญหา : {data.SSproblem} ราคาที่ต้องการขาย : {data.SSprice} บาท
            </Form.Label>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm="12" className='text-end'>
                ราคาที่รับซื้อ : {data.SS_ad_apprise} บาท
                </Form.Label>
            </Form.Group>

            <Form.Group as={Row} >
            <Form.Label column sm="12" className='text-center fs-5'>
             บัตรประชาชนผู้ขาย
            </Form.Label>
          </Form.Group>

          <Form.Group as={Row} className='d-flex justify-content-center' >
            <img className={styles.idcardimg} src={data.SSurlidcard}></img>
          </Form.Group>

          <Form.Group as={Row} className='mt-2 text-end text-secondary' >
            <p>โดยบัตรประชาชนนี้เป็นของลูกค้าเพื่อยืนยันการซื้อขายว่าเป็นการรับกันไม่ใช่ของโจร</p>
          </Form.Group>

          </>)
          }

          {page === 2 && (<>
          Page {page}/2

          <Form.Group as={Row} >
            <Form.Label column sm="12" className='text-center fs-5'>
              สลิปการโอนเงิน
            </Form.Label>

            <Form.Group as={Row} className='d-flex justify-content-center' >
            <img className={styles.slipimg} src={data.SS_ad_slip}></img>
          </Form.Group>
          </Form.Group>


          </>)}




        </Form>
      </Modal.Body>
      <Modal.Footer>
      {page === 1 ? (<>
            <Button variant="secondary" onClick={handleClose}>
              ปิด
            </Button>
           </>
          ) : (
            <Button variant="secondary" onClick={handleBack}>
              กลับ
            </Button>
          )}
          {page === 2 ? (
            <>
       
             </>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              ถัดไป
            </Button>
          )}
      </Modal.Footer>
    </Modal>

    



</Layoutadmin>
  )
}

export default Psuccess
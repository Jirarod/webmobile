import React, { useEffect , useRef, useState} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import { Nav,Table,Container,Form,Modal, Col,ListGroup, Row } from "react-bootstrap";

import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables';

import dayjs from 'dayjs';
import axios from 'axios';

import styles from '@/styles/Saleadmin.module.css'
import Swal from 'sweetalert2';


function allproduct() {
    const tableRef = useRef(null);
    const [tableData, setTableData] = useState([]);
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);

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
          const response = await axios.get("/api/admin/producttable");
        setTableData(response.data);

        console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        };    

      const [dataitem, setDataitem] = useState([]);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = (row) => {
        setShow(true);
        setDataitem(row);

      }
     
      const delPD = async (PDid) => {
        try {
          Swal.fire({
            title: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
            text: "คุณจะไม่สามารถย้อนกลับได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'ใช่, ลบสินค้านี้!',
            cancelButtonText: 'ยกเลิก'
          }).then(async (result) => {
            if (result.isConfirmed) {
          const res = await axios.post('/api/admin/delproduct'
          ,{PDid});
          console.log(res.data);
          if (res.data.message === "Delete success") 
          {Swal.fire(
            'ลบสินค้าเรียบร้อย!',
            '',
            'success'
          )
            window.location.href = "/admin/Sale/allproduct";
          }
          
            }
          }
          )

        } catch (err) {
          console.log(err);
        }
      }

      const editPD = async (PDid) => {
        try {
          Swal.fire({
            title: 'คุณต้องการแก้ไขสินค้านี้ใช่หรือไม่?',
            text: "คุณจะไม่สามารถย้อนกลับได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, แก้ไขสินค้านี้!',
            cancelButtonText: 'ยกเลิก'
          }).then(async (result) => {
            if (result.isConfirmed) {
          const res = await axios.post('/api/admin/editproduct'
          ,{
            PDid
            ,stock
            ,price
          });
          console.log(res.data);
          if (res.data.message === "Edit success") 
          {Swal.fire(
            'แก้ไขสินค้าเรียบร้อย!',
            '',
            'success'
          )
            window.location.href = "/admin/Sale/allproduct";
          }
          
            }
          }
          )

        } catch (err) {
          console.log(err);
        }
      }





  return (
    <Layoutadmin>
        <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Sale/allproduct">
        <Nav.Item>
          <Nav.Link href="/admin/Sale/addproduct">เพิ่มรายการสิ้นค้า</Nav.Link>
          
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Sale/allproduct">รายการสิ้นค้าทั้งหมด</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Sale/reqproduct">รายการคำสั่งซื้อ</Nav.Link>
        </Nav.Item>
      </Nav>


      <Container className={styles.containertable}>
      {tableData.length > 0 ? (
        <Table id="myTable" hover variant="white" striped ref={tableRef} className={styles.table}>
          <thead>
            <tr>
              <th className='text-center'>#</th>
              <th className='text-center'> ชื่อสินค้า</th>
              <th className='text-center'>หมวดหมู่สินค้า</th>
              <th className='text-center'>วันที่เพิ่มสินค้า</th>
              <th className='text-center'>ราคา</th>
              <th className='text-center'>จำนวน</th>
              <th className='text-center'>ลบ</th>
              <th className='text-center'>แก้ไข</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr className={styles.tr} key={row.id}>
                <td>{index + 1}</td>
                <td>{row.PDname}</td>
                <td>{row.PDcategory}</td>
                <td>{dayjs(row.PDdate).format('DD/MM/YYYY')}</td>
                <td>{row.PDprice}
                </td>
                <td>{row.PDstock}
                {row.PDstock === 0 ? (<span className='text-danger'> (หมด) </span>):(null)}
                </td>
                <td>
                  <button onClick={()=> delPD(row.PDid)} className='btn btn-danger'>ลบ</button>
                </td>
                <td>
                  <button onClick={()=> handleShow(row)} className='btn btn-warning'>แก้ไข</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 className="text-center mt-5">Please Add Data</h1>
      )}
    </Container>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Row>
          <Form.Label column sm="3" className='text-center fw-bold'>ชื่อสินค้า</Form.Label>
          <Form.Label column sm="3" className='text-center fw-bold'>หมวดหมู่สินค้า</Form.Label>
          <Form.Label column sm="3" className='text-center fw-bold'>ราคา</Form.Label>
          <Form.Label column sm="3" className='text-center fw-bold'>จำนวน</Form.Label>
          </Row>
          <Row>
          <Form.Label column sm="3" className='text-center'>{dataitem.PDname}
          </Form.Label>
          <Form.Label column sm="3" className='text-center'>{dataitem.PDcategory}
          </Form.Label>
          <Form.Label column sm="3" className='text-center'>{dataitem.PDprice}
          </Form.Label>
          <Form.Label column sm="3" className='text-center'>{dataitem.PDstock}
          </Form.Label>
          </Row>
        </Form>
        <Form>
          <Form.Label column sm="12" className='text-center fw-bold'>จัดการสินค้า</Form.Label>
          <Row>
          <Form.Label column sm="3" className='text-center fw-bold'>จำนวน</Form.Label>
          <Col sm="3">
          <Form.Control type="number" className='customInput' placeholder="จำนวน" onChange={(e)=>setStock(e.target.value)} />
          </Col>

          <Form.Label column sm="3" className='text-center fw-bold'>ราคา</Form.Label>
          
          <Col sm="3">
          <Form.Control type="number" className='customInput' placeholder="ราคา" onChange={(e)=>setPrice(e.target.value)}/>
          </Col>

          </Row>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-success' onClick={()=>editPD(dataitem.PDid)}>
            Save Changes
          </button> 
        </Modal.Footer>
        </Modal>







    </Layoutadmin>
  )
}

export default allproduct
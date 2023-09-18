import React, { useEffect , useRef, useState} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import { Nav,Table,Container } from "react-bootstrap";

import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables';

import dayjs from 'dayjs';
import axios from 'axios';

import styles from '@/styles/Saleadmin.module.css'


function allproduct() {
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
          const response = await axios.get("/api/admin/producttable");
        setTableData(response.data);

        console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        };    






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
          <Nav.Link href="/admin/Sale/req">รายการคำสั่งซื้อ</Nav.Link>
        </Nav.Item>
      </Nav>


      <Container className={styles.containertable}>
      {tableData.length > 0 ? (
        <Table id="myTable" hover variant="white" striped ref={tableRef} className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อสินค้า</th>
              <th>หมวดหมู่สินค้า</th>
              <th>วันที่เพิ่มสินค้า</th>
              <th>ราคา</th>
              <th>จำนวน</th>
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
                <td>{row.PDstock}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 className="text-center mt-5">Please Add Data</h1>
      )}
    </Container>





    </Layoutadmin>
  )
}

export default allproduct
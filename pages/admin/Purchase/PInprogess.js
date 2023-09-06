import React, { useEffect , useRef, useState} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import { Nav,Container,Table,Button } from 'react-bootstrap'
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-dt/js/dataTables.dataTables';

import styles from '@/styles/Purchaseadmin.module.css'

import dayjs from 'dayjs';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck,faPen } from '@fortawesome/free-solid-svg-icons';


function PInprogess() {

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
        const response = await axios.get("/api/admin/showpurchasetable");
      setTableData(response.data);

      console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      };    

      const [data, setData] = useState([]);
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = (row) => {
        setData(row);
        setShow(true);
        
      };
        
          



  return (
    <Layoutadmin>
           <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Purchase/PInprogess"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Purchase/Plist">รายการรับซื้อ</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Purchase/PInprogess">รายการกำลังดำเนินการ</Nav.Link>
        </Nav.Item>
        
      </Nav>

      <Container className={styles.containertable}>
      {tableData.length > 0 ? (
        <Table id="myTable" hover variant="white" striped ref={tableRef} className={styles.table}>
          <thead>
            <tr   >
              <th className="text-center">#</th>
              <th className="text-center">ชื่อรายการรับซื้อ</th>
              <th className="text-center">ราคาที่ประเมิน</th>
              <th className="text-center">วันที่แจ้งขาย</th>
              <th className="text-center">สถานะ</th>
              <th className="text-center">ดำเนินการ</th>


            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr className={styles.tr} key={row.id}>
                <td>{index + 1}</td>
                <td>{row.SSbrand} {row.SSmodel}</td>
                <td>{row.SS_ad_apprise}</td>
                <td>{dayjs(row.SStime).format('DD/MM/YYYY')}</td>
                <td   className={`
                          ${
                            row.SSstatus === "ตอบรับการรับซื้อ"
                              ? "text-success text-center fw-bold"
                              : row.SSstatus === "อยู่ระหว่างการส่งขาย"
                              ? "text-warning text-center fw-bold"
                              : "text-warning text-center fw-bold"
                          }`}>{row.SSstatus} {row.SSstatus=="อยู่ระหว่างการส่งขาย"?
                          (<FontAwesomeIcon icon={faTruck} className={styles.truckicon}/>):(null)}</td>
                <td><button className={styles.editbtn}>แก้ไข</button></td>
               
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

export default PInprogess
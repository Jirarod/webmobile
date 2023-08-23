import React from 'react'
import Layoutadmin from '../Components/layoutadmin'
import {Nav,Container,Col,Row,Card,Modal,Button, Form,Dropdown} from 'react-bootstrap'
import styles from '@/styles/Repairadmin.module.css'
function Rpayment() {
  return (

    <Layoutadmin>
        <Nav
        variant="tabs"
        className={styles.navtab}
        defaultActiveKey="/admin/Repair/Rpayment"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Repair/Rlist">รายการขอซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/Repair/RInprogess">รายการดำเนินการซ่อม</Nav.Link>
        </Nav.Item>
        <Nav.Item><Nav.Link href="/admin/Repair/Rpayment">รายการรอชำระ</Nav.Link></Nav.Item>
      </Nav>

      <Container className={styles.container}>



      </Container>

    </Layoutadmin>
  )
}

export default Rpayment
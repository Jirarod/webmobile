import React,{useEffect, useState} from 'react'
import Usernav from '@/pages/addon/Usernav'
import { Container, Form } from 'react-bootstrap'
import styles from '@/styles/otp.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield,faEnvelope} from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'

function changepassword() {
    


      
  return (
    <>
    <Usernav/>
    <Container
    className={styles.UotpCon}
    >
            <Form className={styles.UotpForm}>
            <FontAwesomeIcon icon={faUserShield} className={styles.UotpIcon} /> 
            <h3 className={styles.UotpTitle}>
                กรุณาเลือกวิธีการยืนยันตัวตนต่อไปนี้ เพื่อรักษาความปลอดภัยของบัญชีผู้ใช้ของคุณ
            </h3>

          <Link href="/user/account/verify/otp" className={styles.link}> 
            <button className={styles.UotpBtnconfirm}> <FontAwesomeIcon icon={faEnvelope} className='mx-2'/>
            ยืนยันตัวตนด้วยอีเมล</button> </Link>

             </Form>
           


    </Container>


    </>
  )
}

export default changepassword
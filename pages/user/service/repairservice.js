import React, { useEffect ,useState} from 'react';
import Usernav from '../../addon/Usernav';
import { Container ,Form,Button} from 'react-bootstrap';
import styles from '@/styles/service.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard} from '@fortawesome/free-solid-svg-icons';
import { decode } from 'jsonwebtoken' ;
import Swal from 'sweetalert2';


function repairservice() {
  const [barnd, setBarnd] = useState('')
  const [model, setModel] = useState('')
  const [problem, setProblem] = useState('')
  const [id, setId] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
   const decoded = decode(token)

    if(token){
      setToken(token)
      setId(decoded.id)
      
    }
  }, [])


  const onSubmit = async (e) => {
    e.preventDefault()
    
    if(token){
      console.log(token)
       console.log(id)

      const res = await axios.post('/api/repairserviceapi',
      {
        id,
        barnd,
        model,
        problem
      })

      if((await res).data.message === "Repair service added")
      {
        Swal.fire({
          title: 'ส่งข้อมูลสำเร็จ',
          text: "ระบบได้รับข้อมูลแล้ว",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ตกลง'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/user/account/listrepair'
          }
        }
        )
      }
   
    }
    else{
      Swal.fire({
        title: 'คุณยังไม่ได้เข้าสู่ระบบ',
        text: "โปรดเข้าสู่ระบบก่อน",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'เข้าสู่ระบบ',
        cancelButtonText: 'ยกเลิก'

      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/Loginpage'
        }
      })
      
    }

  }

  return (
    <>
    <Usernav/>

    <Container className={styles.Contain} >
    

        <Form className={styles.form} onSubmit={onSubmit}>
           <h5 className={styles.title}>กรอกข้อมูลมือถือที่ต้องการซ่อม</h5>
           <hr className={styles.hr}/>
           <Form.Group className='mt-3'>
                <Form.Label>ยี่ห้อ</Form.Label>
                <Form.Control type="text" placeholder="กรุณากรอกยี่ห้อ" required onChange={(e)=>setBarnd(e.target.value)}/>
          </Form.Group> 

          <Form.Group className='mt-3'>
                <Form.Label>รุ่น</Form.Label>
                <Form.Control type="text" placeholder="กรุณากรอกรุ่น" required onChange={(e)=>setModel(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mt-3'>
                <Form.Label>ปัญหา</Form.Label>
                <Form.Control className='pb-5 ' type="text" placeholder="กรุณากรอกปัญหา" required onChange={(e)=>setProblem(e.target.value)}/>
          </Form.Group>

          <Form.Group className='mt-3'>
                <button className={styles.btnsubmit} type="submit"> ส่งข้อมูล</button>
          </Form.Group>

       

        </Form>
        

    </Container>
    </>
  )
}

export default repairservice
import {React,useState} from 'react'
import {Button, Form } from 'react-bootstrap'

import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link'
import styles from '@/styles/signlogin.module.css'


import { useRouter } from 'next/router' 

function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    

    const loginusers = async (e) => {
        e.preventDefault();
       
                const res =await axios.post('/api/Loginapi',
                {
                    email: email,
                    password: password
                }) 
                
                if((await res).data.message === "User logged in")
                {
                  localStorage.setItem('token',(await res).data.token);
                 
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบสำเร็จ',
                        text: 'User logged in successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      router.push('/Marketpage');
                }
                else 
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email หรือ Password ไม่ถูกต้อง',
                        text: 'User not found!',
                        })
    
                    }

    }
  return (
    <Form className={styles.form} onSubmit={loginusers}>
    <h1 >Login</h1>    
  
    <Form.Group className={styles.formgroup}>
     <Form.Control className={styles.input} type="email"  placeholder="Enter email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
     <Form.Control className={styles.input} type="password" placeholder="Enter password" required value={password} onChange={(e) =>setPassword(e.target.value)}/>
     <Form.Label className={styles.label}>Don't have an account? <Link href="/Registerpage">Signup</Link></Form.Label>
     
    </Form.Group>
     <div className={styles.btnfield}>
       
       
    
     <Button className={styles.button} variant="primary" type="submit">Login</Button>
     </div>

</Form>
  )
}

export default Loginpage
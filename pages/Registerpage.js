import {React,useState} from 'react'
import {Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import styles from '@/styles/signlogin.module.css'  

function Registerpage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();



    const addusers = async (e) => {
        e.preventDefault();
        
             const res =await axios.post('/api/Registerapi', 
             {
                name: name,
                email: email,
                password: password
            })
            if((await res).data.message === "User created")
            {
                Swal.fire({
                    icon: 'success',
                    title: 'สมัครสมาชิกสำเร็จ',
                    text: 'User created successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  router.push('/Loginpage');
            }
            else
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Email ถูกใช้งานแล้ว',
                    text: 'User already exists!',
                    })

                }
    }


  return (
    <>
    
    <Form className={styles.form} onSubmit={addusers}>
        <h1 id="title">Sign Up</h1>    
      
        <Form.Group className={styles.formgroup}>
        
         <Form.Control className={styles.input} id="nameField" type="text" placeholder="Enter Username" required value={name} onChange={(e)=>setName(e.target.value)}/>

         <Form.Control className={styles.input} type="email" placeholder="Enter email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        
         <Form.Control className={styles.input} type="password" placeholder="Enter password" required minLength={6}
          value={password} onChange={(e) =>setPassword(e.target.value)} /> 
         
         
        </Form.Group>
         <div className={styles.btnfield}>
         <Button className={styles.button}  type="submit">Signup</Button>
         </div>
         


    </Form>

    </>
  )
}

export default Registerpage
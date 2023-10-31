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
    const [otp, setOtp] = useState('');
    const [otpInput, setOtpInput] = useState('');
    const [next, setNext] = useState(false);
    const [activeotp, setActiveotp] = useState(false);
    const router = useRouter();



    const handleSendOTP = async () => {
      const res = await axios.post("/api/checkuemail", {
        email: email,
      });
      
      if ((await res).data.message === "User already exists" || email === "") {
        Swal.fire({
          icon: "error",
          title: "Email ถูกใช้งานแล้ว",
          text: "User already exists!",
          timer: 3000,
        });
      
      } else {
      setActiveotp(true);
      console.log(email);
      // สร้าง OTP ขึ้นมา (ให้เปลี่ยนส่วนนี้ตามที่คุณต้องการ)
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);
      setOtp(generatedOtp.toString());
      // ส่ง OTP ไปยังอีเมลของผู้ใช้
      const emailTo = email; // อีเมลของผู้ใช้ที่คุณต้องการส่ง OTP ไป
      const subject = "Your OTP Code";
      const text = `Your OTP: ${generatedOtp}`;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "otp ถูกส่งไปยัง" + email + "แล้ว",
        showConfirmButton: false,
        text: "กรุณาเช็ค OTP ในอีเมลของคุณ",
      });
      const img = null;
  
      // ส่งคำร้องขอไปยังแอปพลิเคชันของคุณเพื่อส่งอีเมล
      try {
        await axios.post("/api/sendEmailapi", { emailTo, subject, text,name,img});
      } catch (error) {
        console.error("Error sending email:", error);
      }

    }


    };




    
    
    const handleVerifyOTP = async () => {

      if (otp === otpInput) {
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
             const dataToSend = {
               email: email,
               password: password,
               name: name
             };
             const queryParams = new URLSearchParams(dataToSend).toString();
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
        setOtpInput("");
        setOtp("dsfodk");
      } else {
        // ถ้า OTP ที่ผู้ใช้กรอกไม่ตรงกับที่ส่งไปให้ทำอะไรต่อ
        console.log("OTP ไม่ถูกต้อง");
        Swal.fire({
          icon: "error",
          title: "กรอกรหัส OTP ไม่ถูกต้อง",
          text: "กรุณากรอกรหัส OTP ใหม่อีกครั้ง",
          timer: 3000,
        });
      }
    };


    



    // const addusers = async (e) => {
    //     e.preventDefault();
        
    //          const res =await axios.post('/api/Registerapi', 
    //          {
    //             name: name,
    //             email: email,
    //             password: password
    //         })
    //         if((await res).data.message === "User created")
    //         {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'สมัครสมาชิกสำเร็จ',
    //                 text: 'User created successfully',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               })
    //               const dataToSend = {
    //                 email: email,
    //                 password: password,
    //                 name: name
    //               };
    //               const queryParams = new URLSearchParams(dataToSend).toString();
    //               router.push(`/verifyemail?${queryParams}`);
                  
    //         }
    //         else
    //         {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Email ถูกใช้งานแล้ว',
    //                 text: 'User already exists!',
    //                 })
    //             }
    // }

    if(activeotp)
    {
        return (<Form className={styles.form} >
            <h1 id="title">Verify OTP</h1>
            <Form.Group className={styles.formgroup}>
              <Form.Label className={styles.label}>รหัสOTPถูกส่งไปยัง{email}กรุณากรอกรหัสเพื่อยืนยันว่าเป็นemailของคุณ</Form.Label>
              <Button className={styles.button} onClick={handleSendOTP}>Resend OTP</Button>
            <Form.Control className={styles.input} type="text" placeholder="Enter OTP" required value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
            </Form.Group>
            <div className={styles.btnfield}>
            <Button className={styles.button}  onClick={handleVerifyOTP}>Verify</Button>
            </div>
            </Form>
            )
  
    }

  return (
    <>
    
    <Form className={styles.form}>
        <h1 id="title">Sign Up</h1>    
      
        <Form.Group className={styles.formgroup}>
        
         <Form.Control className={styles.input} id="nameField" type="text" placeholder="Enter Username" required value={name} onChange={(e)=>setName(e.target.value)}/>

         <Form.Control className={styles.input} type="email" placeholder="Enter email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        
         <Form.Control className={styles.input} type="password" placeholder="Enter password" required minLength={6}
          value={password} onChange={(e) =>setPassword(e.target.value)} /> 
         
         
        </Form.Group>
         <div className={styles.btnfield}>
         <Button className={styles.button} onClick={handleSendOTP}  type="submit">Signup</Button>
         </div>
         


    </Form>

    </>
  )
}

export default Registerpage
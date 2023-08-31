import React, { useEffect, useState } from "react";
import Usernav from "@/pages/addon/Usernav";
import { Button, Container, Form } from "react-bootstrap";
import styles from "@/styles/otp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";
import axios from "axios";
function otp() {
  const [censoremail, setCensoremail] = useState(""); // ตัวแปรที่จะใช้เก็บอีเมลที่ถูกเซ็นเซอร์ไว้
  const [otp, setOtp] = useState("hmkdf;");
  const [email, setEmail] = useState("");
  const [otpInput, setOtpInput] = useState(""); // ตัวแปรที่จะใช้เก็บค่า OTP ที่ผู้ใช้กรอกเข้ามา
  const [next, setNext] = useState();
  const [id, setId] = useState("");
  const [name, setName] = useState("");







  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decode(token);

      setName(decoded.Uname);
   
      setEmail(decoded.email);
      setId(decoded.id);
      setCensoremail(
        decoded.email.replace(
          /(.{2})(.*)(?=@)/,
          (_, a, b) => a + b.replace(/./g, "*")
        )
      );
    }
  }, []);

  const handleVerifyOTP = () => {
    if (otp === otpInput) {
      setNext(true);
      console.log("OTP ถูกต้อง");
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

  const handleSendOTP = async () => {
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
      title: "otp ถูกส่งไปยัง" + censoremail + "แล้ว",
      showConfirmButton: false,
      text: "กรุณาเช็ค OTP ในอีเมลของคุณ",
    });

    // ส่งคำร้องขอไปยังแอปพลิเคชันของคุณเพื่อส่งอีเมล
    try {
      await axios.post("/api/sendEmailapi", { emailTo, subject, text,name});
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });
 
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  })
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
 
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "กรุณากรอกรหัสผ่านใหม่";
          }else if (value.length < 6) {
            stateObj[name] = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
          } 
          else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "รหัสผ่านไม่ตรงกัน";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;
 
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "กรุณากรอกรหัสผ่านใหม่อีกครั้ง";
          }else if (value.length < 6) {
            stateObj[name] = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
          } 
          else if (input.password && value !== input.password) {
            stateObj[name] = "รหัสผ่านไม่ตรงกัน";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    if (input.password === input.confirmPassword) {
      console.log(input.password);
      console.log("submit");
      const res = await axios.post("/api/changepasswordapi",
       {id, password: input.password });
      if ((await res).data.message === "Password change") {
        Swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          text: "ระบบได้ทำการเปลี่ยนรหัสผ่านแล้ว",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ตกลง",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/user/account/profile";
          }
        });
      }
      
    } else {
      validateInput({ target: { name: "password", value: input.password } });
      validateInput({ target: { name: "confirmPassword", value: input.confirmPassword } });
    }
  }




  

  if (next) {
    return (
      <Container className={styles.UotpCon}>
        <Form className={styles.Upass} onSubmit={onSubmit}>
          <FontAwesomeIcon icon={faUserShield} className={styles.UotpIcon} />
          <h3 className={styles.UotpTitle}>กรุณากรอกรหัสผ่านใหม่</h3>

          <Form.Group className="mb-3">
            <Form.Label>รหัสผ่านใหม่</Form.Label>
            <Form.Control
               type="password"
               name="password"
               placeholder='Enter Password'
               value={input.password}
               onChange={onInputChange}
               onBlur={validateInput}
               required minLength={6}
            /> {error.password && <span className="err text-danger">{error.password}</span>}
             
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder='Enter Confirm Password'
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              required minLength={6}
            />  {error.confirmPassword && <span className="err text-danger">{error.confirmPassword}</span>}
             
          </Form.Group>
          <button type="submit"  className={styles.UotpBtnconfirm}>
            ยืนยัน
          </button>
        </Form>
      </Container>
    );
  }

  return (
    <Container className={styles.UotpCon}>
      <Form className={styles.UotpForm}>
        <FontAwesomeIcon icon={faUserShield} className={styles.UotpIcon} />
        <h3 className={styles.UotpTitle}>
          กรุณากรอกรหัส OTP ที่ได้รับทางอีเมล
        </h3>

        <h3 className={styles.UotpTitle}>{censoremail}</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={styles.Uotpsend} onClick={handleSendOTP}>
            ส่งรหัสOTP
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="กรอกรหัส OTP"
            onChange={(e) => setOtpInput(e.target.value)}
          />
        </Form.Group>

        <div className={styles.UotpBtnconfirm} onClick={handleVerifyOTP}>
          <p className={styles.textbtn}>ยืนยัน</p>
        </div>
      </Form>
    </Container>
  );
}

export default otp;

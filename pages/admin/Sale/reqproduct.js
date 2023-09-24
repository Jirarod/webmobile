import React,{useEffect,useState} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import { Nav,Table,Container,Form,Row,Col,Button } from "react-bootstrap";
import styles from '@/styles/Saleadmin.module.css'
import ImagePopup from "@/pages/addon/ImagePopup";
import axios from 'axios';
import Swal from 'sweetalert2';
import e from 'cors';
function reqproduct() {

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/admin/reqproduct");
    const data = await res.json();
    setData(data.combinedData);
    console.log(data.combinedData);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedImage(null);
    setShowPopup(false);
  };

   const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const filechange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setDisabled(false);

    }
    else {
      setFile(null);
      setDisabled(true);
    }


    
  }


  const handlesubmit = async (datapayment) => {
    console.log(datapayment);
   
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Aboutsellservice");
      const res = await axios.post("https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload", formData);
        
      const res2 = await axios.post('/api/admin/updatesale', {    
        payment: datapayment,
        status: "จัดส่งแล้ว",
        image: res.data.secure_url    
    
      })
      if (await res2.data.message === "update success") {
       
        Swal.fire({
          icon: 'success',
          title: 'อัพโหลดสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          location.reload();
        }, 1000);

      }

      
   
  }





  return (
    <Layoutadmin>
        <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Sale/reqproduct">
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

      <h2 className='text-center mt-4'>รายการคำสั่งซื้อ</h2>

    <div className={styles.overflow}>
      <Container className='mt-4 '>
          <p>รายการคำสั่งซื้อทั้งหมด</p>

          {data.map((item) => (
            <div>

          <Form.Group as={Row} className={styles.Formrow}>
            
            <Col sm="1">
              
              </Col>
            <Form.Label column sm="2">
              {item.user.Uname}
            </Form.Label>

            <Form.Label column sm="7" className='text-end'>
              รายการสินค้าที่สั่งซื้อ({item.payment.length} รายการ)
            </Form.Label>
          
          </Form.Group>
          <Form.Group as={Row} className={styles.Formdrop}>
              {item.payment.map((item2) => (
                <Row>
               <Form.Label  className='text-center' column sm="3">{item2.PDname}</Form.Label>
                <Form.Label className='text-center' column sm="3">{item2.PAY_numberproduct}</Form.Label>
                <Form.Label className='text-center' column sm="2">{item2.PDprice}</Form.Label>
                <Form.Label className='text-center' column sm="2">{item2.PAY_Total}</Form.Label>
                <Col sm={2} className={styles.Colmiddle}><Button variant="primary" onClick={() => openPopup(item2.PAY_Sliped)} className={styles.btn}>
                    ดูหลักฐานการโอนเงิน
                </Button></Col>
              </Row>
              ))}

          </Form.Group>
          <Form.Group as={Row} className={styles.Formbottom}>
            <Form.Label column sm="12" className='fw-bold'>
              ที่อยู่ในการจัดส่ง
            </Form.Label>
            <Form.Label column sm="12">
              ชื่อผู้รับ : {item.user.Uname}
            </Form.Label>
            <Form.Label column sm="12">
              เบอร์โทรศัพท์ : {item.address[0].ADDphone}
            </Form.Label>
            <Form.Label column sm="9">
              อีเมล : {item.user.Uemail}
            </Form.Label>
            <Form.Label column sm="3" className='fw-bold '>
          โปรดอัพโหลดรูปการจัดส่ง
            </Form.Label>
            
            <Form.Label column sm="9">
              ที่อยู่ : {item.address[0].ADDaddress} อำเภอ/เขต : {item.address[0].ADDdistrict} จังหวัด: {item.address[0].ADDprovince} รหัสไปรษณีย์: {item.address[0].ADDzipcode}
            </Form.Label>

            <Col sm={3} className={styles.Colmiddle}>
              <Form.Control type='file' onChange={filechange} className={styles.inputfile}/>

              <Button variant="primary"  
              className={styles.btnsubmit}
              disabled={disabled}
              onClick={() => handlesubmit(item.payment)}
              >
                    อัพโหลดรูปการจัดส่ง
                </Button>
                </Col>



           </Form.Group>
          
          
          </div>
          ))}

{showPopup && (
        <ImagePopup imageUrl={selectedImage} onClose={closePopup} />
      )}


       
      </Container>
    </div>




    </Layoutadmin>
  )
}

export default reqproduct
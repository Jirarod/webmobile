import React, { useState, useRef } from "react";
import Layoutadmin from "../Components/layoutadmin";
import { Nav, Container, Col, Row, Modal, Button, Form } from "react-bootstrap";
import styles from "@/styles/Saleadmin.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import e from "cors";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { set } from "react-hook-form";

export const uploadCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Product");
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
    formData
  );
  return { url: response?.data.secure_url };
};

function addproduct() {
  const [images, setImages] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [imgurl, setImgurl] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    detail: "",
    category: "",
    brand: "",
  });


  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedFileNames = Array.from(selectedFiles).map(
      (file) => file.name
    );
    const selectedFileUrl = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setImgurl(selectedFileUrl);
    setFileNames(selectedFileNames);
    setImages(selectedFiles);
    console.log(selectedFiles.length);
  };

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {

    if(imgurl.length !== 0){
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;}
    else{
    
     
    }
  };

  const [loading, setLoading] = useState(false);


  const addproduct = async () => {

    
    if(formData.name !== "" && formData.price !== "" && formData.detail !== "" && formData.category !== "" && formData.brand !== "" && images.length !== 0){
      setLoading(true);
      const res = await axios.post("/api/admin/addproduct", {
        name: formData.name,
        price: formData.price,
        detail: formData.detail,
        category: formData.category,
        brand: formData.brand,
      });
    
      console.log(res.data);
      const productid = res.data.rows[0].PDid;
      console.log(productid);
    
   
      for (let i = 0; i < images.length; i++) {
        const {  url } = await uploadCloudinary(images[i]);
       
        const res = await axios.post("/api/admin/addproductimg", {
          productid: productid,
          url: url,
        });
        
        console.log(res.data.rows);
        if (await res.data.message == "success send") {
          console.log(" url ["+i+"] บันทึกเรียบร้อย = "+url);
        }
      }


      setLoading(false);
      if (await res.data.message == "success send") {
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าเรียบร้อย',
          text: 'เพิ่มสินค้าเรียบร้อย',
          cancelButtonText: 'ตกลง',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        })
        window.location.reload();
      }


    }
    else{
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }


  };

  return (
    <Layoutadmin>
      <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Sale/addproduct"
      >
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

      {loading ? (<></>):(<><div class="loader"></div></>)
        }

      <Container className={styles.containerin}>
        <Row>
          <Col sm={6}>
            <Form className="p-4">
              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>ชื่อสินค้า</Form.Label>
                <Form.Control type="text" placeholder="กรุณาใส่ชื่อสินค้า" 
                onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              </Form.Group>

              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>หมวดหมู่สินค้า</Form.Label>
                <Form.Select onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option>----เลือกหมวดหมู่สินค้า----</option>
                  <option>อุปกรณ์เสริม</option>
                  <option>มือถือมือ1</option>
                  <option>มือถือมือ2</option>
                  <option>แท็บเล็ต</option>
                  <option>ไอแพ็ด</option>
                  <option>อื่นๆ</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3 fw-bolder">
                    <Form.Label>ยี่ห้อ</Form.Label>
                    <Form.Select onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      >
                      <option>----เลือกยี่ห้อ----</option>
                      <option>Apple</option>
                      <option>Samsung</option>
                      <option>OPPO</option>
                      <option>VIVO</option>
                      <option>Realme</option>
                      <option>อื่นๆ</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3 fw-bolder">
                    <Form.Label>ราคา</Form.Label>
                    <Form.Control type="number" className="customInput" placeholder="กรุณาใส่ราคา" 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}/>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>รายละเอียดสินค้า</Form.Label>
                <Form.Control as="textarea" rows={4} 
                onChange={(e) => setFormData({...formData, detail: e.target.value})}/>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            <Form className="p-4">
              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>รูปภาพสินค้า</Form.Label>
              </Form.Group>
                
                <Row>
                <Col sm={3}>

                  <Row>
                    <div className={styles.imgbox}>
                      {imgurl.length !== 0 ? (
                    <img src={imgurl[0]} className={styles.imgmini} alt="slide_image" />):(<h2>รูป 1</h2>)}
                    </div>
                  </Row>

                  <Row className="mt-2">
                    <div className={styles.imgbox}>
                    {imgurl.length !== 0 ? (
                    <img src={imgurl[1]} className={styles.imgmini} alt="slide_image" />
                    ):(<h2>รูป 2</h2>)}

                    </div>
                  </Row>

                  <Row className="mt-2">
        
                            <label
                              className={styles.customFileUpload}
                              for="upload-button"
                            >
                              เลือกรูป
                            </label>
                            
 
                  </Row>

                </Col>
             
                <Col sm={9}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  
                  modules={[Autoplay, Pagination, ]}
                  onAutoplayTimeLeft={onAutoplayTimeLeft}
                  className="mySwiper"
                >
                  {imgurl.map((url) => (
                    <SwiperSlide>
                      <img src={url} alt="slide_image" />
                    </SwiperSlide>
                  ))}
                  {imgurl.length !== 0 ? (
                  <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                      <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                  </div>):(<div></div>)}
                </Swiper>
                </Col>
                </Row>
                
                  {loading ? (<><Row><div className={styles.loader}><p className={styles.textload}>กำลังเพิ่มสินค้า</p></div></Row></>):(<Row className="justify-content-end"><Button variant="success" className="mt-1 mx-3" style={{width:"40%"}} onClick={addproduct}>
          เพิ่มรายการสิ้นค้า<FontAwesomeIcon icon={faCartPlus} className="" />
        </Button></Row>)}
              
      

              <Form.Group className="my-3">
                <input
                className="d-none"
                  id="upload-button"
                  accept="image/jpeg, image/png"
                  multiple={true}
                  type="file"
                  onChange={handleFileInputChange}
                />
              </Form.Group>
            </Form>
           
          </Col>
        </Row>

      
      
      
      </Container>
    </Layoutadmin>
  );
}

export default addproduct;

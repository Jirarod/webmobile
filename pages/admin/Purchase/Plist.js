import React,{useEffect ,useState,useRef} from 'react'
import Layoutadmin from '../Components/layoutadmin'
import {
    Container,
    Nav,
    Form,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Popover,
  } from "react-bootstrap";

  import { Swiper, SwiperSlide } from 'swiper/react';
  import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-flip';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'; // เพิ่มนี้
import Swal  from 'sweetalert2';

dayjs.extend(relativeTime); // เปิดใช้งาน relativeTime plugin
import axios from 'axios'

import styles from "@/styles/Purchaseadmin.module.css";
function Plist() {
    const [dataRows, setDataRows] = useState([]);


    const [data, setData] = useState([]); 

    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [detialP, setDetialP] = useState();



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (row) => {
      setData(row);
      setShow(true)};


 


    useEffect(() => {
        fetchdata();
        }, []);

   const  fetchdata = async () => {
        try {
            const res = await axios.get("/api/admin/reqPurchase");
            setDataRows(res.data.rows);
          
            } catch (err) {
            console.log(err);
            }
    }

    const submit = async (e) => {
        e.preventDefault();
        const value = (`${value1} - ${value2}`);
        try {
            const res = await axios.post("/api/admin/resPurchaseback", {
                id:data.SSid,
                status:"ตอบรับการรับซื้อ",
                price:value,
                detail:detialP
            });
            if (await res.data.message == "success send") {
              Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
              })
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'บันทึกไม่สำเร็จ',
                showConfirmButton: false,
                timer: 1500
              })
            }
            handleClose();
            fetchdata();
            }
            catch (err) {
            console.log(err);
            }


    };

    const handlereject = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/admin/resPurchaseback", {
                id:data.SSid,
                status:"ปฏิเสธการรับซื้อ",
                price:null,
                detail:null
            });
            if (await res.data.message == "success send") {
              Swal.fire({
                icon: 'success',
                title: 'บันทึกสำเร็จ',
                showConfirmButton: false,
                timer: 1500
              })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'บันทึกไม่สำเร็จ',
              showConfirmButton: false,
              timer: 1500
            })
          }
          
            handleClose();
            fetchdata();
            }
            catch (err) {
            console.log(err);
            }


    };



  return (
    <Layoutadmin>
        <Nav
        variant="tabs"
        className="justify-content-center"
        defaultActiveKey="/admin/Purchase/Plist"
      >
        <Nav.Item>
          <Nav.Link href="/admin/Purchase/Plist">รายการรับซื้อ</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Purchase/PInprogess">รายการกำลังดำเนินการ</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/admin/Purchase/Psuccess">
            รายการเสร็จสิ้น
          </Nav.Link>
        </Nav.Item>
        
      </Nav>

        <Container className={styles.containerin}>


     {dataRows.map((row,index) => (<>
      <Col sm={4} className="mt-3 px-2" key={index}>
        <Card>
        <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
      >

        <SwiperSlide>

        <img cvariant="top" src={row.SSimg1} />

        </SwiperSlide>

        <SwiperSlide>
        <img variant="top" src={row.SSimg2} />
        </SwiperSlide>

        <SwiperSlide>
        <Card.Img variant="top" src={row.SSimg3} />
        </SwiperSlide>

        <SwiperSlide>
        <Card.Img variant="top" src={row.SSimg4} />
        </SwiperSlide>

        <SwiperSlide>
        <Card.Img variant="top" src={row.SSimg5} />
        </SwiperSlide>

        </Swiper>
       
        <Card.Body>
    
          <Card.Title className='text-uppercase'>{row.SSbrand} {row.SSmodel}</Card.Title>
          <Card.Text>
            {row.SSdetails}
          </Card.Text>
            <Card.Text>
            ราคาที่ลูกค้าต้องการ {row.SSprice} บาท
            </Card.Text>
          <Row>
            <Col sm={6}>
            <Card.Text>
              ปัญหา {row.SSproblem} 
            </Card.Text>
            </Col>
            <Col sm={2}>

            <Card.Text className='text-end'>
            สถานะ
            </Card.Text>
            </Col>

            <Col sm={4}>

            <Card.Text className='text-start text-warning '>
               {row.SSstatus}
            </Card.Text>
            </Col>

          </Row>
           
         
        </Card.Body>
        
        <Card.Footer>
          <small className="text-muted">{dayjs(row.SStime).fromNow()}</small>
        </Card.Footer>

        <Card.Footer  >
            <div className="text-end">
            <Button variant="primary" className='mx-2' onClick={()=>handleShow(row)} >รับซื้อ</Button>
            <Button variant="danger" onClick={handlereject}>ปฏิเสธ</Button>
            </div>
           

      </Card.Footer>
        </Card>
      </Col>


</>
        ))}
            
            <Modal show={show}  onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการรับซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
         
            <Form.Label column sm="12" className='text-center fs-3'>
              รายการ
            </Form.Label>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ยี่ห้อ
              </Form.Label>
              <Col sm="4">
                <Form.Control plaintext readOnly defaultValue={data.SSbrand} />
              </Col>
              <Form.Label column sm="2">
                รุ่น
              </Form.Label>
              <Col sm="4">
                <Form.Control plaintext readOnly defaultValue={data.SSmodel} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ปัญหา
              </Form.Label>
              <Col sm="4">
                <Form.Control plaintext readOnly defaultValue={data.SSproblem} />
              </Col>
           
              <Form.Label column sm="3">
                ราคาที่ลูกค้าต้องการ
              </Form.Label>
              <Col sm="3">
                <Form.Control plaintext readOnly defaultValue={data.SSprice} />
              </Col>
            </Form.Group> 
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                รายละเอียด
              </Form.Label>
              <Col sm="9">
                <Form.Control className=' border rounded px-3 text-break bg-light' as="textarea" plaintext readOnly rows={2} placeholder="รายละเอียด" defaultValue={data.SSdetails}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                ราคาที่รับซื้อ
              </Form.Label>
              <Col sm="4">
                <Form.Control onChange={(e)=> setValue1(e.target.value)} className='customInput' type="number" placeholder="ราคาที่รับซื้อเริ่มต้น" />
              </Col>
              <Col sm="1" className='text-center mt-1'>
                <Form.Label >
                  ถึง
                </Form.Label>
              </Col>
              <Col sm="4">
                <Form.Control onChange={(e)=> setValue2(e.target.value)}className='customInput' type="number" placeholder="ราคาที่รับซื้อสิ้นสุด" />
              </Col>




            </Form.Group>

                 <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                รายละเอียด
              </Form.Label>
              <Col sm="9">
                <Form.Control onChange={(e)=> setDetialP(e.target.value)}className='text-break' as="textarea"  rows={3} placeholder="รายละเอียดตอบกลับจากแอดมิน" />
              </Col>
            </Form.Group>



        
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={submit}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>


        </Container>
        
    </Layoutadmin>
  )
}

export default Plist
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

import axios from 'axios'

import styles from "@/styles/Purchaseadmin.module.css";
function Plist() {
    const [dataRows, setDataRows] = useState([]);


 


    useEffect(() => {
        fetchdata();
        }, []);

   const  fetchdata = async () => {
        try {
            const res = await axios.get("/api/admin/reqPurchase");
            setDataRows(res.data.rows);
            console.log(res.data.rows);
            } catch (err) {
            console.log(err);
            }
    }



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

            <Card.Text>
              ปัญหา {row.SSproblem} 
            </Card.Text>
         
        </Card.Body>
        
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>

        <Card.Footer  >
            <div className="text-end">
            <Button variant="primary" className='mx-2' >รับซื้อ</Button>
            <Button variant="danger">ปฏิเสธ</Button>
            </div>
           

      </Card.Footer>
        </Card>
      </Col>


</>
        ))}


        </Container>
        
    </Layoutadmin>
  )
}

export default Plist
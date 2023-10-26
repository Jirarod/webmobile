import React,{useState,useEffect} from 'react'
import { Container ,Form,Row,Col,Button,Modal} from 'react-bootstrap'
import styles from '@/styles/Checkout.module.css'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Usernav from './addon/Usernav'
import axios from 'axios'
import { decode } from 'jsonwebtoken'
import Swal from 'sweetalert2'


function checkout() {
    const [id, setId] = useState("");

  const [data,setData] = useState([]);
  const [alltotal,setAlltotal] = useState([]);
  const [address,setAddress] = useState([]);




  useEffect(() => {
    const token = localStorage.getItem('token') //erorถ้ารีเฟรชหน้า
    const decoded = decode(token)
    
    if (token) {

      setId(decoded.id)
      fetchdata();
      fetchdataaddress();
    } 
      
  }, [id])

  useEffect(() => {
    // เรียกใช้ calculateTotalPrice เมื่อ data มีการเปลี่ยนแปลง
    const total = calculateTotalPrice(data);
    setAlltotal(total);
  }, [data]);

  const [loading, setLoading] = useState(true);
         const fetchdata = async () => {
      try{
      const res = await axios.post("/api/checkoutshow",{userID : id});
  
      if (await res.data.message === "itemcheckout") {
        console.log(res.data.combinedData);
        setData(res.data.combinedData);
       
        setLoading(false);

      }
     

      }catch(err){
        console.log(err);
      }

    };

    const [firstaddress,setFirstaddress] = useState([
        {
            ADDid : '',
            ADDname : '',
            ADDphone : '',
            ADDaddress : '',
            ADDprovince : '',
            ADDdistrict : '',
            ADDzipcode : '',
        }
    ]);

    const fetchdataaddress = async () => {
        try{
        const res = await axios.post("/api/showaddressapi",{id : id});
            console.log(res.data.rows[0].ADDname);
            setFirstaddress(res.data.rows[0]);
    

          setAddress(res.data.rows);


        }catch(err){
            console.log(err);
        }
    
        }


    const calculateTotalPrice = (data) => {
        let total = 0;
      
        // หาผลรวมราคาสินค้าทั้งหมด
        for (const item of data) {
          total += parseInt(item.product.PDprice)+50;
        }

        return total;
      };

    
      
   const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
     
    }

    const [disabled, setDisabled] = useState(true);
    const [urlfile, setUrlfile] = useState(null); // สร้าง state เพื่อเก็บค่า url ของรูปภาพที่อัพโหลด
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
         setUrlfile(URL.createObjectURL(file));

        if (file) {
            setDisabled
            (false);
        }

        setFile(file);

      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "Slipeduser");
                const res = await axios.post("https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload", formData);
                console.log(res.data);
                const res2 = await axios.post("/api/checkoutpayment", {
                    userID : id,
                    addressID : firstaddress.ADDid,
                    img : res.data.secure_url,
                    total : alltotal,
                    data : data,
                });
                console.log(res2.data);
                if (await res2.data.message === "checkoutpayment") {
                    Swal.fire({
                        icon: 'success',
                        title: 'สั่งซื้อสินค้าสำเร็จ',
                        text: 'รอการตรวจสอบ',
                        
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.href = '/Marketpage'
                        }
                      }
                        )
                }
            } catch (err) {
                console.log(err);
            }
        }
    }





  return (
    <div className={styles.layoutcontainner}>
      
    <div className={styles.layoutcontainner__main}>
      <div className={styles.layoutnav}>
    <Usernav />
        </div>

    <Container className={styles.layoutcontainner__content}>
        <div className={styles.showadress}>
         <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
         <span >ที่อยู่ในการจัดส่ง</span>
         <Form.Group as={Row} className='mt-2'>
            <Form.Label column sm="10" className='fs-5 text-center'>
             {firstaddress.ADDname} {firstaddress.ADDphone}
            {firstaddress.ADDaddress}, {firstaddress.ADDdistrict}, {firstaddress.ADDprovince}, {firstaddress.ADDzipcode}
            </Form.Label>

            <Col sm="2" className="d-flex justify-content-center">
                  <Button variant="outline-secondary" onClick={handleShow}>เปลี่ยนที่อยู่</Button>
            </Col>
            </Form.Group>
        </div>

        {data.map((item) => (
        <div className={styles.showitem}>
            <Row>
                <Col sm={7} >
                <h4>สั่งซื้อสินค้าแล้ว</h4>
                </Col>
                <Col sm={2} className='text-center' >
                <p>ราคา</p>
                </Col>
                <Col sm={2} className='text-center' >
                <p>จำนวน</p>
                </Col>
            </Row>

            <Row className='my-3'>
                <Col sm={1} className='d-flex align-items-center justify-content-center'>
                    <img src={item.IMGurl.IMGurl}
                    className={styles.img} ></img>
                 </Col>
                
                <Col sm={4} className='d-flex align-items-center'>
                    <p className={styles.textlimit}>{item.product.PDname} {item.product.PDdetails}</p>
                </Col>

                <Col sm={2} className='d-flex align-items-center justify-content-center'>

                </Col>

                <Col sm={2} className='d-flex align-items-center justify-content-center'>
                    <p>฿{parseInt(item.product.PDprice).toLocaleString()}</p>
                </Col>

                <Col sm={2} className='d-flex align-items-center justify-content-center'>
                    <p>{item.product.C_numberproduct}</p>
                </Col>
            </Row>
             
            <Row className={styles.Rowitemtotal}>
               <Col sm={7} >
                </Col>
                <Col sm={5} >
                    <Form.Label column sm="6" className=' text-center'>
                    ราคาจัดส่ง ฿50
                    </Form.Label>
                    <Form.Label column sm="6" className=' text-center'>
                    ราคารวม ฿{(parseInt(item.product.PDprice)+50).toLocaleString()}
                    </Form.Label>

                </Col>
             </Row> 
        </div> ))}

        <div className={styles.showpayment}>
            <h4>การชำระเงิน</h4>

            <Row className={styles.boxpay}>
                <Form.Label column sm="6" className='fw-bold fs-5 text-center'>
                ช่องชำระเงิน
                </Form.Label>
                <Form.Label column sm="6" className='fw-bold fs-5 text-center'>
                อัพโหลดรูปการชำระเงิน
                </Form.Label>
               <Col sm={6} className="d-flex align-items-center justify-content-center">
                 <img src="https://res.cloudinary.com/dsacsgwkl/image/upload/v1698353573/Slipeduser/cyewhrarhrwvgjxeajsi.jpg"
                    className={styles.imgpay}
                 />
               </Col>
                <Col sm={6} className="d-flex align-items-center justify-content-center">
                    <img src={urlfile}
                    className={styles.imgpay}
                    ></img>

                </Col> 
                <Row>
                <Col sm={6} className="d-flex align-items-center justify-content-center">
                 
                </Col>
                <Col sm={6} className="d-flex align-items-center justify-content-center mt-2">
                <Form.Control type="file" onChange={handleFileChange}/>
                </Col>
                </Row>

            </Row>

            <Row className='my-3'>
                <Form.Label column sm="12" className='fw-bold fs-5 text-end'>
                    ยอดรวมสิ้นค้า : {alltotal.toLocaleString()} บาท
                </Form.Label>
                <Col sm={12} className="d-flex align-items-center justify-content-end">
                    <Button variant="outline-secondary" onClick={handleSubmit} disabled={disabled}>สั่งซื้อสินค้า</Button>
                </Col>





            </Row>
            


        </div>
        <br/>
        <br/>

        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>เปลี่ยนที่อยู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {address.map((item) => (
            
            <Row className='my-3'>
                <Col sm={1} className='d-flex align-items-center justify-content-center'>
                    <Form.Check
                    type="radio"
                    name="address"
                    value={item.ADDid}
                    onChange={(e)=> setFirstaddress(item)}
                    />
                 </Col>
                
                <Col sm={4} className='d-flex align-items-center'>
                    <p className={styles.textlimit}>{item.ADDname} {item.ADDphone}</p>
                </Col>

                <Col sm={7} className='d-flex align-items-center'>
                    <p className={styles.textlimit}>{item.ADDaddress}, {item.ADDdistrict}, {item.ADDprovince}, {item.ADDzipcode}</p>
                </Col>
            </Row>
            ))

            }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          
        </Modal.Footer>
        </Modal>
        
    </Container>
    </div>
    </div>

  )
}

export default checkout
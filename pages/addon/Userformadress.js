import React ,{useEffect, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container, Row, Col, Form,} from 'react-bootstrap'
import axios from 'axios';
import { decode } from "jsonwebtoken";


function Userformadress(props) {
 const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [zipcode, setZipcode] = useState('')

const [id, setId] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token)
    {
      const decoded = decode(token)
      setId(decoded.id)
    }
    
  }, [])
  
  const handleSubmit = async (e) => 
  {
     console.log(id); 
    e.preventDefault()
    const res = await axios.post('/api/addaddressapi',
     {id,
      phone,
      name,
      address,
      province,
      district,
      zipcode})
    console.log(res.data);
    if((await res).data.message === "Address added")
    {
      props.onHide()
      window.location.reload()
    }

  }




  return (
    <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       ที่อยู่
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form id="formadd" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" as={Row} >
            <Col sm={6}>
          <Form.Control type="text" placeholder="ชื่อ-นามสกุล" className='' required onChange={(e) =>setName(e.target.value)}/>
          </Col>
          <Col sm={6}>
          <Form.Control type="text"  placeholder="เบอร์โทรศัพท์" className='' required 
          onChange={(e) =>setPhone(e.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group className='mb-3' as={Row}>
        <Col >
         <Form.Control type="text" placeholder="จังหวัด" className='' required
         onChange={(e) =>setProvince(e.target.value)}/>
        </Col>

        <Col >
         <Form.Control type="text" placeholder="อำเภอ|เขต" className='' required 
         onChange={(e) =>setDistrict(e.target.value)}/>
        </Col>
          
        <Col >
         <Form.Control type="text" placeholder="รหัสไปรษณีย์" className='' required
         onChange={(e) =>setZipcode(e.target.value)}/>
        </Col>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type="text" placeholder="บ้านเลขที่,ซอย,หมู่,ถนน,แขวง/ตำบล" className='pb-5' required
          onChange={(e) =>setAddress(e.target.value)}/>
        </Form.Group>

      </Form> 
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={props.onHide}>Close</Button>
      <Button type="submit" form="formadd">Submit</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default Userformadress
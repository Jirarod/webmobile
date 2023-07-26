
import React ,{useEffect, useState}from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Container, Row, Col, Form,} from 'react-bootstrap'
import axios from 'axios';
import { decode } from "jsonwebtoken";

function Editaddress(props) {
 const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [id, setId] = useState('')
    const [addressid, setAddressid] = useState('')
    const [dataRows, setDataRows] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            const decoded = decode(token)
            setId(decoded.id)
        }
        fetchData(id);
    }, [id])

   



    const fetchData = async (id) => {
   
       
       
        try {
            const res = await axios.post("/api/showaddressapi", { id });
            setDataRows(res.data.rows);
            console.log(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };


     useEffect(() => {
      
        if (dataRows.length > 0) {
          setAddressid(dataRows[0].ADDid); 
          console.log(addressid);
        }
       
      }, [dataRows]);
   
    

    const handleSubmit = async (e) =>
    { 
        console.log(addressid);
        console.log(id);
        e.preventDefault()
        const res = await axios.post('/api/updateaddressapi',
            {   id,
                phone,
                name,
                address,
                province,
                district,
                zipcode,addressid})
        console.log(res.data);
        if((await res).data.message === "Address update")
        {
            props.onHide()
            window.location.reload()
        }

    }

  return (
    <div>
           {dataRows.map((row, index) => (
        <div  key={index}>
     <Modal
     {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       แก้ไขที่อยู่
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form id="formadd" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" as={Row} >
            <Col sm={6}>
          <Form.Control type="text" placeholder={row.ADDname} className=''  
          onChange={(e) =>setName(e.target.value)}/>
          </Col>
          <Col sm={6}>
          <Form.Control type="text" placeholder={row.ADDphone}  className=''
          onChange={(e) =>setPhone(e.target.value)}/>
        
          </Col>
        </Form.Group>

        <Form.Group className='mb-3' as={Row}>
        <Col >
         <Form.Control type="text" placeholder={row.ADDprovince}  className='' 
        onChange={(e)=>setProvince(e.target.value)}/>
        </Col>

        <Col >
         <Form.Control type="text" placeholder={row.ADDdistrict} className='' 
         onChange={(e)=>setDistrict(e.target.value)}
         />
        </Col>
          
        <Col >
         <Form.Control type="text" placeholder={row.ADDzipcode}  className='' 
         onChange={(e)=>setZipcode(e.target.value)}
         />
        </Col>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type="text" placeholder={row.ADDaddress}  className='pb-5'
          onChange={(e)=>setAddress(e.target.value)}
          />
        </Form.Group>

      </Form> 
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={props.onHide}>Close</Button>
      <Button type="submit" form="formadd">Submit</Button>
    </Modal.Footer>
  </Modal>

  </div>
    ))}
    </div>
  )
}

export default Editaddress
import React,{useEffect,useState} from 'react'
import {Container, Navbar,Popover,OverlayTrigger, Button,Dropdown,Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Link from 'next/link'
import { decode } from 'jsonwebtoken'
function Usernav() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [accountDetails, setAccountDetails] = useState('');
   const [id, setId] = useState('');

   const [numbercart,setNumbercart] = useState([]);




  const logout = () => {
   
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setAccountDetails('')
     window.location.href = '/Marketpage'
    }

     

    useEffect(() => {
      const token = localStorage.getItem('token') //erorถ้ารีเฟรชหน้า
      const decoded = decode(token)
      
      if (token) {
        setIsLoggedIn(true)
        setId(decoded.id)
        setAccountDetails(decoded.name)
        fetchdata();
      } else {
        setIsLoggedIn(false)
        setAccountDetails('')
       }
        
    }, [id])

     
      const [loading, setLoading] = useState(true);
      const fetchdata = async () => {
      try{
      const res = await axios.post("/api/numberincart",{userID : id});
    
      if (await res.data.message === "numbercart") {
     
        setNumbercart(res.data.rows[0].count);
        setLoading(false);
  
      }else
      {
   
      
      }

      }catch(err){
        console.log(err);
      }

    };

    if (loading) {
      return <div className='loading'></div>; // หน้าโหลดข้อมูล
    }
    else{
  return (
    <div className='navuser'>
    <Navbar className='fixed-top border' bg='white' variant="dark" >
      <Container>
        
    <Navbar.Brand href="/Marketpage"><h1 className='text-secondary'>Shop</h1></Navbar.Brand>
     <Nav className='me-auto'>
     <Nav.Link href="/Marketpage" className='text-secondary'>ร้านค้า</Nav.Link>
      <Nav.Link href="/user/service/repairservice" className='text-secondary'>บริการซ่อม</Nav.Link>
      <Nav.Link href="/user/service/sellservice" className='text-secondary'>บริการรับซื้อ</Nav.Link>
    </Nav>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    

      {isLoggedIn ? (
        
      <Dropdown>

        <Dropdown.Toggle id="dropdown-button-light-example1" variant="white">
      
          <FontAwesomeIcon icon={faUser} className='mx-1 text-secondary'/>
          {accountDetails}
  
         </Dropdown.Toggle>
         <Dropdown.Menu>
          <Dropdown.Item href="/user/account/profile" >
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    

       
      ) : (
        <Link   href={"/Loginpage"}> <Navbar.Text  className='text-secondary border rounded-3 p-1'>
           <FontAwesomeIcon icon={faUser}  className='mx-1 text-secondary'/> 
             Login
          </Navbar.Text></Link>
      )}

      <Link className="text-decoration-none mx-3" href="/user/account/cart">
      <div className='text-secondary border rounded-3 p-1 boxnumbercart'>
      <FontAwesomeIcon icon={faCartShopping} className='mx-1 text-secondary'/>

       Cart {numbercart == 0 ?(null):(<div className='numberincart'>{numbercart}</div>)}
      </div>
      </Link>

    </Navbar.Collapse>
    



    </Container>

    </Navbar>
    </div>
  );
      }
}

export default Usernav;
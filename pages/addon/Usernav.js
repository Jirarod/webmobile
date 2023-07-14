import React,{useEffect,useState} from 'react'
import {Container, Navbar,Popover,OverlayTrigger, Button,Dropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import { decode } from 'jsonwebtoken'
function Usernav() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [accountDetails, setAccountDetails] = useState('');





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
        setAccountDetails(decoded.name)
      } else {
        setIsLoggedIn(false)
        setAccountDetails('')
       }
    }, [])

        

  return (
    <>
    <Navbar className='fixed-top border' bg='white' variant="dark" >
      <Container>
        
    <Navbar.Brand href="/Marketpage"><h1 className='text-secondary'>Shop</h1></Navbar.Brand>
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
    </Navbar.Collapse>
    



    </Container>

    </Navbar>
    </>
  )
}

export default Usernav
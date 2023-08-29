import React ,{useEffect}from 'react'
import {Container, Navbar, Row,Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Usernav from './addon/Usernav'
import axios from 'axios'

function Marketpage() {

  

  return (
    <>
    <Usernav/>
     <header>
    <Container>
     
     <div
          className="p-5 text-center border border-light rounded-3 shadow-5 "
          style={{
            backgroundImage:
              "url('https://9to5mac.com/wp-content/uploads/sites/6/2022/06/ios-16-remove-background-image.jpeg?quality=82&strip=all')",
            height: "500px",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%",
            
          }}
        >

          <h1 className="mb-3 text-white textdiv">Store</h1>
          <h4 className="mb-3 text-white textdiv">
            เลือกสมาร์ทโฟนที่เหมาะกับตัวคุณ
          </h4>
        </div>


        

    </Container>
    </header>


    </>
  )
}

export default Marketpage
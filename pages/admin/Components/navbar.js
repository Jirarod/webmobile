import React,{useEffect,useState} from 'react'
import styles from '@/styles/navbar.module.css'
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
function navbar() {
  const [numbernotice, setNumbernotice] = useState(0);
  useEffect(() => {
    getnumbernotice()
  }, [])
  const getnumbernotice = async () => {
    const res = await axios.get("/api/admin/numbernotice")
    if(res.data.rows[0].count === null || res.data.rows[0].count === undefined)
    {
      setNumbernotice(0)
    }
    else
    {
    setNumbernotice(res.data.rows[0].count);
    }
  }
  return (
    <>
     <Navbar className={styles.navbar}>
            <h1 >Admin</h1>
            
            
            <div className={styles.navbar__right}>
              <a href="/admin/notice">
            <FontAwesomeIcon  size='2x' icon={faBell} className={styles.icon}/>
            {numbernotice === 0 ? null :(
            <span className={styles.navbar__right__numbernotice}>{numbernotice}</span>
            )}
            </a>
            </div>

            
    </Navbar>
    </>
  )
}

export default navbar
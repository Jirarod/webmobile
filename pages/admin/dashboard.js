import React ,{useEffect,useState}from 'react'
import styles from '@/styles/dashboard.module.css'
import Layoutadmin from './Components/layoutadmin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList,faCheck,faCircle  } from '@fortawesome/free-solid-svg-icons'
import  {Row,Col,Container,Card} from 'react-bootstrap'
import axios from 'axios'
import BarChart from './Components/BarChart'
import { set } from 'react-hook-form'


function dashboard() {
  
  const [nuberSellofmonth, setnuberSellofmonth] = useState(0);
  const [nuberrepair, setnuberrepair] = useState(0);
  const [data, setdata] = useState([]);

  useEffect(() => {
    
    getnuberSellofmonth()
    getallincome()
    getnuberrpair()
    getlastsell()
  }, [])
  
  const [sumsell, setsumsell] = useState(0);
  const getnuberSellofmonth = async () => {
    const res = await axios.get("/api/admin/DashsellofMonth")
    setnuberSellofmonth(res.data.rows[0].NumberOfPayments)
    setsumsell(res.data.SUM[0].TotalPayment)
  }
  
  const getallincome = async () => {
    const res = await axios.get("/api/admin/Dashallincome")
    const rawData = res.data.rows;


    const monthlyData = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const foundData = rawData.find(item => item.Month === month);
    
      return {
        Month: month,
        TotalPayment: foundData ? parseInt(foundData.TotalPayment, 10) : 0
      };
    });

    setdata(monthlyData)
  }

  const [sumrepair, setsumrepair] = useState(0);
  const getnuberrpair = async () => {
    const res = await axios.get("/api/admin/Dashrepairofmonth")
    console.log(res.data)
    if(res.data.rows[0].NumberOfRepair === null)
    {
      setnuberrepair(0)
    }
    else
    {
      setnuberrepair(res.data.rows[0].NumberOfRepair);
    }

    if(res.data.SUM[0].TotalAppraise === null)
    {
      setsumrepair(0)
    }
    else
     {setsumrepair(res.data.SUM[0].TotalAppraise);}
  }
  
  const [lastsell, setlastsell] = useState([]);
  const getlastsell = async () => {
    const res = await axios.get("/api/admin/lastdashboard")
    setlastsell(res.data.rows)
 
  }
  



   

  return (
    <>
     <Layoutadmin> 
      <span className={styles.headname}>
      <FontAwesomeIcon  size="" icon={faClipboardList} />  Main Dashboard
      </span>
      <Row className={styles.Rowcontrol}>
        <Col className='d-flex justify-content-center'>
        <Card className={styles.card}>
        <Card.Body>
        <Card.Title>รายการสั่งซื้อทั้งหมด</Card.Title>
        <Card.Text>
          รายการสั่งซื้อทั้งหมด
        </Card.Text>
        </Card.Body>
        </Card>
        </Col>

        <Col className='d-flex justify-content-center'>
        <Card className={styles.card}>
        <Card.Body>
        <Card.Title>รายการขาย 1 เดือน</Card.Title>
        <Card.Text className='text-center'>
           {nuberSellofmonth} รายการ {parseInt(sumsell).toLocaleString()} ฿
        </Card.Text>
        
        </Card.Body>
        </Card>

        </Col>

        <Col className='d-flex justify-content-center'>
   
        <Card className={styles.card}>
        <Card.Body>
        <Card.Title>รายการซ่อม 1 เดือน</Card.Title>
        <Card.Text >
         {nuberrepair} รายการ {sumrepair.toLocaleString()} ฿
        </Card.Text>

        </Card.Body>
        </Card>

        </Col>

        <Col className='d-flex justify-content-center'>
        <Card className={styles.card}>
        <Card.Body>
        <Card.Title>รายการรับซื้อ</Card.Title>
        <Card.Text>
          รายการสั่งซื้อทั้งหมด
        </Card.Text>
        </Card.Body>
        </Card>

        </Col>

      </Row>
       <hr/>
      <Row className={styles.Rowcontrol}>
        <Col sm={8}>
          <h4>รายงานรายได้รายเดือน</h4>
          <BarChart data={data}/>
   
         </Col>

         <Col sm={4}>
          <Card className={styles.recentcard}>
          <Card.Body>
          <Card.Title>
          รายการสั่งซื้อล่าสุด</Card.Title>
          
          {lastsell.map((item) => (
          <Row key={item} className={styles.item}>

          
          <Col sm={1} className='d-flex justify-content-center ' >
          {item.PAY_status === 'จัดส่งแล้ว' ?  <FontAwesomeIcon className='text-success mt-1'  icon={faCheck} />:
          <FontAwesomeIcon className='text-warning mt-1'  icon={faCircle} /> 
         
          }
          </Col>


          <Col sm={8} className='d-flex justify-content-center'>
          {item.PDname}
          </Col>

          <Col sm={3} className='d-flex justify-content-center'>
            {(item.PAY_Total).toLocaleString()} ฿
            </Col>
          </Row>
          ))}
          </Card.Body>
          </Card>

         </Col>

      </Row>


    



    
     </Layoutadmin>
    </>
  )
}

export default dashboard
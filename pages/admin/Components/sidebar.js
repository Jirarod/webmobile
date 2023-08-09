import React ,{useState} from "react";
import styles from "@/styles/sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faChartLine,faScrewdriverWrench,faMobileScreenButton,faStore,faBell } from "@fortawesome/free-solid-svg-icons";
import { Button, Nav, Navbar, Container } from "react-bootstrap";


function sidebar() {
    const [show, setShow] = useState(false);


    const handlemini = (e) => {
        e.preventDefault();
        setShow(true);
        if (show === true) {
            setShow(false);
        }
        const sidebar = document.querySelector(`.${styles.sidebar}`);
        sidebar.classList.toggle(`${styles.sidebar__mini}`);



        const sidebar__menu = document.querySelector(`.${styles.sidebar__menu}`);
        sidebar__menu.classList.toggle(`${styles.sidebar__menu__mini}`);

        const sidebar__listItem = document.querySelectorAll(`.${styles.sidebar__listItem}`);
        sidebar__listItem.forEach((item) => {
            item.classList.toggle(`${styles.sidebar__listItem__mini}`);
        }
        )

        const sidebar__link = document.querySelectorAll(`.${styles.sidebar__link}`);
        sidebar__link.forEach((item) => {
            item.classList.toggle(`${styles.sidebar__link__mini}`);
        }
        ) 

        const sidebar__iconitem = document.querySelectorAll(`.${styles.sidebar__iconitem}`);
        sidebar__iconitem.forEach((item) => {
            item.classList.toggle(`${styles.sidebar__iconitem__mini}`);
        }
        )


        const sidebar__btnlogout = document.querySelector(`.${styles.sidebar__btnlogout}`);
        sidebar__btnlogout.classList.toggle(`${styles.sidebar__btnlogout__mini}`);

        const layoutside = document.querySelector(".layoutside");
        layoutside.classList.toggle("layoutside__mini");

    }


  return (
    <>
      
        <div className={`layoutside ${styles.sidebar}`}>
            <div className={styles.sidebar__header}>
                <h3 hidden={show}>Admin</h3> 
                <FontAwesomeIcon icon={faBars}  className={styles.sidebar__icon} onClick={handlemini}/>
            </div>

            <div className={styles.sidebar__menu}>
               
            <div className={styles.sidebar__title1} hidden={show}>รายงาน</div>
                    <div className={styles.sidebar__listItem}>
                        <a href="#" className={styles.sidebar__link}>
                            <FontAwesomeIcon icon={faChartLine} className={styles.sidebar__iconitem}/>
                            <span hidden={show} >รายงานข้อมูล</span>
                        </a>
                    </div>

                   
                  <div className={styles.sidebar__title} hidden={show}>การจัดการรายการ</div>


                    <div className={styles.sidebar__listItem}>
                        <a href="/admin/Repair/Rlist" className={styles.sidebar__link}>
                            <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.sidebar__iconitem}/>
                            <span hidden={show} >รายการการซ่อม</span>
                        </a>
                    </div>

                    <div className={styles.sidebar__listItem}>
                        <a href="#" className={styles.sidebar__link}>
                            <FontAwesomeIcon icon={faMobileScreenButton} className={styles.sidebar__iconitem}/>
                            <span hidden={show} >รายการการรับซื้อ</span>
                        </a>
                    </div>

                    <div className={styles.sidebar__listItem}>
                        <a href="#" className={styles.sidebar__link}>
                            <FontAwesomeIcon icon={faStore} className={styles.sidebar__iconitem}/>
                            <span hidden={show} >รายการการขาย</span>
                        </a>
                    </div>

                    <div className={styles.sidebar__title} hidden={show}>การแจ้งเตือนต่างๆ</div>
                    
                    <div className={styles.sidebar__listItem}>
                        <a href="#" className={styles.sidebar__link}>
                            <FontAwesomeIcon icon={faBell} className={styles.sidebar__iconitem}/>
                            <span hidden={show} >รายการกาแจ้งเตือน</span>
                        </a>
                    </div>
                </div>

                <div className={styles.sidebar__footer}>
                   <Button variant="danger" className={styles.sidebar__btnlogout}>Logout</Button>
               </div>
         </div>

         

       
        
         
         
    </>
  );
}

export default sidebar;



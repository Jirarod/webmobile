import React, {useEffect, useRef, useState} from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/Product.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
//import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

//import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { decode } from "jsonwebtoken";
//import required modules
const handleZoomIn = () => {
  const lightboxImage = document.querySelector(`.${styles.lightbox} img`);
  lightboxImage.style.width = '100%';
};

import {Autoplay, FreeMode, Pagination, Thumbs, Navigation} from 'swiper/modules';
import {Container, Row,Col} from 'react-bootstrap'
import Usernav from '../addon/Usernav';
import axios from 'axios';


function PDid() {
    const router = useRouter()
    const { PDid } = router.query

    const [productid, setProductid] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        fetchdata();
    }, [PDid])

    useEffect(() => {
      const token = localStorage.getItem("token");
    const decoded = decode(token);
    if (token) {
      setId(decoded.id);
    }
    }, [id])

   const [product, setProduct] = useState([]);
    const [imgRows, setImgRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchdata = async () => {
        const res = await axios.post('/api/product',{PDid: PDid});
        console.log(res.data);
        setProduct(res.data.productRows);
        setImgRows(res.data.imgRows);
        setProductid(PDid);
        console.log(productid)
        console.log(res.data.imgRows);
        if (res.data.productRows.length > 0) {
            setLoading(false);
        }


    }

    const addincart = async () => {
      try {
        if (!id) {
          alert("กรุณาเข้าสู่ระบบ");
          return;
        }
        else{
        const res = await axios.post("/api/addincart", { 
          productID: productid
          , userID : id ,numberproduct: productCount
         
         });
        console.log(res.data);
        if (res.data.message === "Product added") {
          window.location.href = "/user/account/cart";
        }
      }
  
      } catch (err) {
        console.log(err);
      }
    };




    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0});
    const [startPosition, setStartPosition] = useState(null);
    const imageRef = useRef(null);
    

    const handleZoomIn = () => {
      if (zoomLevel < 3) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.2);
      }
    };
  
    const handleZoomOut = () => {
      if (zoomLevel > 0.5){
        setZoomLevel((prevZoomLevel) => prevZoomLevel - 0.2);
      }
    };
  
    const handleImageDrag = (e) => {
      if (e.type === 'mousedown') {
        let startX = e.clientX;
        let startY = e.clientY;
  
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
  
    setImagePosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
    }));
  
        startX = e.clientX;
        startY = e.clientY;
      };
  
    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }
    };
  
    
    const swiperSlidesData =[
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lkjbs8enbcna3f",
        description: "รูปที่ 1",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lkjbs8en4bt2f6",
        description: "รูปที่ 2",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lkjbs8en74xy46",
        description: "รูปที่ 3",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lkjbs8en74xy46",
        description: "รูปที่ 4",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7r98o-lktfthrq5otdc1",
        description: "รูปที่ 5",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7r98o-lktfthrq73dt96",
        description: "รูปที่ 6",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lfui3y5u8iv21e",
        descripton: "รูปที่ 7",
      },
      {
        image: "https://down-th.img.susercontent.com/file/cn-11134207-7qukw-lfui3y5venwecc",
        description: "รูปที่ 8",
      },
    ]
  
  
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
    const [swiperRef, setSwiperRef] = useState(null);
    let appendNumber = 4;
    let prependNumber = 1;
  
    const prepend2 = () => {
      swiper.prependSlide([
        `<div class="swiper-slide">Slide ${--prependNumber}</div>`,
        `<div class="swiper-slide">Slide ${--prependNumber}</div>`,
      ]);
    };
  
    const prepend = () => {
      swiper.prependSlide(`<div class="swiper-slide">Slide ${--prependNumber}</div>`);
    };
  
    const append = () => {
      swiper.appendSlide(`<div class="swiper-slide">Slide ${++appendNumber}</div>`);
    };
  
    const append2 = () => {
      swiper.appendSlide([
        `<div class="swiper-slide">Slide ${++appendNumber}</div>`,
        `<div class="swiper-slide">Slide ${++appendNumber}</div>`,
      ]);
    };
  
    const [productCount, setProductCount] = useState(1);
  
    const increaseProductCount = () => {
      if (productCount < product[0].PDstock) {
      setProductCount(productCount + 1);
    } else {
      alert('Cannot exceed the available stock.');
    }
    };
    const decreaseProductCount = () => {
      if (productCount > 1) {
      setProductCount(productCount - 1);
      }
    };
    const [cartCount, setCartCount] = useState(0);

  
    const purchase = async() => {
      try{
        if (!id) {
          alert("กรุณาเข้าสู่ระบบ");
          return;
        }
        else{
        const res = await axios.post("/api/fastcheckout", { 
          PDID: productid, UID : id,numberproduct: productCount
         
         });
         if (res.data.message === "Product added") {
          window.location.href = "/checkout";
         }

      }


      }
      catch(err)
      {
        console.log(err);
      }

    
    };
    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <>
    <Usernav/>
    <header>

    <Container className={`ml-auto ${styles.Product}`}>
   <Row>
 
    <div style={{
            height: "800px",
            slidesPerView: 'auto', 
            spaceBetween: 10,
            marginTop: "120px",
            marginLeft: "auto",
            marginRight: "100px",
          }}>  
    
  <Row>
      <Col sm={6} className='justify-content-center'>
      {/* Swiper ด้านบน */}
      <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      className={`mb-2 overlapping-swiper ${styles.mySwiper}`}
      >
        {imgRows.map((slide, index) => (
          <SwiperSlide
          key={index}
          className={`${styles.boximg} ${styles.customSlide}`}
          onClick={() => setSelectedImage(slide.IMGurl)}
          >
            <img src={slide.IMGurl} alt={slide.description}/>
          </SwiperSlide>
        ))}

        </Swiper>

      {/* Swiper ด้านล่าง */}
      <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      loop={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={10}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Pagination, Navigation, Thumbs]}
        className={`overlapping-swiper ${styles.swiperbox}`}
        >
          {imgRows.map((slide, index) => (
          <SwiperSlide
          key={index}
          className={`${styles.boximg} ${styles.customSlide}`}
          onClick={() => setSelectedImage(slide.IMGurl)}
          >
            <img src={slide.IMGurl} alt={slide.description}/>
          </SwiperSlide>
        ))}
        
          
      </Swiper>
      </Col>

      <Col sm={6}>
       <h1 className={styles.title}>{product[0].PDname}</h1> 
       <p className={styles.biotext}>{product[0].PDdetails}</p>
    
        <h3 className={styles.price}>฿ {(product[0].PDprice).toLocaleString()}</h3>

        <div >
        <button onClick={decreaseProductCount} className={styles.decreaseButton}> - </button>
        <span className={styles.productCount}>{productCount}</span>
        <button onClick={increaseProductCount} className={styles.increaseButton}> + </button>
        <span className='mx-3 text-secondary'>มีจำนวนสินค้าเหลือ {product[0].PDstock} ชิ้น</span>
        </div>



        <div className='mt-4'>
        <button onClick={addincart} className={styles.addButtons}>
          <FontAwesomeIcon icon={faCartPlus} />
          Add To Cart
        </button>
        <button onClick={purchase} className={styles.purchaseButtons}>Buy Now</button>
        </div>


      
      </Col> 

      </Row>
      
    {selectedImage && (
    <div className={`${styles.lightbox} ${styles.customLightbox}`}
    onMouseDown={handleImageDrag}
    >
    <img 
      ref={imageRef}
      src={selectedImage} 
      style={{transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px) `
      }}
    />
    <div className={styles.closeButtons}>
     <button onClick={() => setSelectedImage(null)}>X</button>
    </div>
    <div className={styles.zoomButtons}>
      <button onClick={handleZoomIn} className={styles.zoomInButton} > 
      <FontAwesomeIcon icon={faSearchPlus} />
      </button>
      <button onClick={handleZoomOut} className={styles.zoomOutButton} > 
      <FontAwesomeIcon icon={faSearchMinus} />
      </button>
    </div>
    </div>
    )}

      </div>
      </Row>  
    </Container>
    </header>


    </>
  )
}

export default PDid
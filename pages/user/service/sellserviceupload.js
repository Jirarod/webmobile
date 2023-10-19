import React,{useState} from 'react'
import Usernav from '../../addon/Usernav'
import { Container ,Form} from 'react-bootstrap'
import styles from '@/styles/uploads.module.css'
import axios  from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage,faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';

export const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Purchaseuser");
    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
        formData
    );
    return {publicId:response?.data.public_id, url:response?.data.secure_url}
}



function sellserviceupload() {
    const router = useRouter();
    const { 
    Uid,
    brand,
    model,
    problem,
    price,
    detail, } = router.query;
    
   const [formUrlData, setFormUrlData] = 
   useState({

      img1: '',
      img2: '',
      img3: '',
      img4: '',
      img5: '', 

    });

  
 
    
    const [images, setImages] = useState([]);
    const [link, setLink] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        console.log(images);
        e.preventDefault();
        if (images.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'กรุณาเลือกรูปภาพ',
                text: 'กรุณาเลือกรูปภาพไม่เกิน 5 รูป',
                
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              }
                )
        }
        if (images.length >= 5) {
            Swal.fire({
                icon: 'error',
                title: 'กรุณาเลือกรูปภาพ',
                text: 'กรุณาเลือกรูปภาพไม่เกิน 5 รูป',
                
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              }
                )
        }

        try {
            let imageArr = [];
            setLoading(true);
            const updatedFormUrlData = { ...formUrlData };

            for (let i=0;i<images.length;i++) {
                const data = await uploadCloudinary(images[i]);
                imageArr.push(data);
                updatedFormUrlData[`img${i + 1}`] = data.url;

              
            }
            setLoading(false);
            setFormUrlData(updatedFormUrlData);
           
            setLink(imageArr);


           
                
                console.log(Uid,brand,model,problem,price,detail);
                try {
                const res = await axios.post('/api/sellserviceapi', {
                    Uid,
                    brand,
                    model,
                    problem,
                    price,
                    detail,
                    img1: updatedFormUrlData.img1,
                    img2: updatedFormUrlData.img2,
                    img3: updatedFormUrlData.img3,
                    img4: updatedFormUrlData.img4,
                    img5: updatedFormUrlData.img5,
                });
                if ((await res).data.message === "sell service success") {
                    Swal.fire({
                        icon: 'success',
                        title: 'อัพโหลดสำเร็จ',
                        text: 'รอการตรวจสอบจากทางร้าน',
                        timer: 1500
                      })
                      router.push('/user/account/listsell')

                        
                       
                        
                      
                }
                
            } catch (error) {
                console.log(error);
            }
            
    }
    catch (error) {
        console.log(error);
    }

    }
 



         
    const handleFileInputChange = (e) => {
        // เก็บรายชื่อไฟล์ที่ผู้ใช้เลือกใน state fileNames
        const selectedFiles = e.target.files;
        const selectedFileNames = Array.from(selectedFiles).map((file) => file.name);
        setFileNames(selectedFileNames);
        setImages(selectedFiles);
      };
    


  return (
    <>
    <Usernav/>
    <Container className={styles.upCon}>
    <div>
        <Form onSubmit={handleSubmit} className={styles.upForm}>
            <h5 className={styles.uptitle}>อัพโหลดรูป</h5>
          
        <label htmlFor="upload-button" className={styles.customFileUpload}>
        <FontAwesomeIcon icon={faCloudArrowUp} className={styles.upIcon2}/>
          <p className={styles.upsubtitle}>อัพโหลดรูปตามคำแนะนำข้างต้นเพื่อให้ทางร้านประเมินราคาสภาพภายนอก</p>
       
          <p className={styles.upsubtitle}>จำนวนไฟล์: 5 รูป<br />
                            ไฟล์ที่รองรับ: .JPEG, .PNG.</p>

       </label>
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <input type="file" 
            id="upload-button"
            accept="image/jpeg, image/png"
            className={styles.upInput}
            multiple={true}
            onChange={handleFileInputChange}
            />
            </Form.Group>
           

           {/* เพิ่มตัวแสดงรายชื่อไฟล์ที่ผู้ใช้เลือก */}
            <div>
            {fileNames.map((fileName) => (
              
                <Form.Group  className={styles.upFile}>
                <FontAwesomeIcon icon={faFileImage} className={styles.upIcon}/> 
                <Form.Label  key={fileName}>{fileName}</Form.Label>
                </Form.Group>
            ))}
            </div>
        
            <Form.Group >
            {loading ? (<div className={styles.loader}></div>):(<button className={styles.upbtn} type='submit'>Upload</button>)}
            </Form.Group> 
            
        </Form>

      
        
        
    </div>
    </Container>
    </>
  )
}

export default sellserviceupload
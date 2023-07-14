import { useEffect, useState } from 'react';
import axios from 'axios';
import {decode} from 'jsonwebtoken';

function Testupload() {
 
  const [decoded,setDecoded] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    setDecoded(decode(token));
  }, []);
 


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'my-upload'); // เปลี่ยนเป็น upload preset ของคุณ

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload',
       formData);

      if (response.status === 200) {
       
        const res = await axios.post('/api/Upload', {
          image:response.data.url,
          email: decoded.email
        });

          
        // รูปถูกอัปโหลดและบันทึกในฐานข้อมูลสำเร็จ
        console.log('รูปถูกอัปโหลดและบันทึกในฐานข้อมูลสำเร็จ');
      } else {
        // การอัปโหลดและบันทึกข้อมูลรูปภาพผิดพลาด
        console.error('การอัปโหลดและบันทึกข้อมูลรูปภาพผิดพลาด');
      }
    } catch (error) {
      // เกิดข้อผิดพลาดในการเชื่อมต่อ API
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ API', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>อัปโหลด</button>
    </div>
  );
}

export default Testupload;

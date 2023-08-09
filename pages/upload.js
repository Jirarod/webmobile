import axios  from "axios";

const uploadCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Purchaseuser");
    const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsacsgwkl/image/upload",
        formData
    );
    console.log(response.data.secure_url);

    return {publicId:response?.data.public_id, url:response?.data.secure_url}
}

import React,{useState} from 'react'
import { set } from "react-hook-form";
import Usernav from "./addon/Usernav";
import { Container } from "react-bootstrap";

function upload() {
    const [images, setImages] = useState([]);
    const [link, setLink] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        console.log(images);
        e.preventDefault();
        try {
            let imageArr = [];
            setLoading(true);
            for (let i=0;i<images.length;i++) {
                const data = await uploadCloudinary(images[i]);
                imageArr.push(data);
                console.log(data);
            }
            setLoading(false);
            setLink(imageArr);
    }
    catch (error) {
        console.log(error);
    }
    }
  return (
    <>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="file" 
            multiple={true}
            onChange={(e)=>{setImages(e.target.files)}}
            />
            <button type='submit'>{loading ?'Loading..':"Upload"}</button>
        </form>
        {
            link && link.length > 0 && link.map(link=>{
                return(
                    <div key={link?.publicId}>
                        <p>publicId: {link?.url}</p>
        
                        <img src={link?.url} width={150}/> 
                          
                    </div>
                )

            }
            )

        }
        
    </div>
    </>
  )
}

export default upload

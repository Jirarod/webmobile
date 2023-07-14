import cloudinary from 'cloudinary';
import pool from "./Database";
// const cloudinary = require('cloudinary').v2;

const Upload = async (req, res) => {
    // cloudinary.v2.config({
    //     cloud_name: 'dsacsgwkl',
    //     api_key: '339222529121121',
    //     api_secret: 'xxJLF9unhipA5lp71PGiZHHg5N8',
    //     secure: true,
    //   });
    
    if(req.method==="POST")
    {
      const {image,email } = req.body;
      const [rows, field] = await pool.query(
        "UPDATE users SET Uimage = ? WHERE users.Uemail = ?",
        [image,email]
      );
      res.status(201).json({ message: "User update image profile" });
      console.log("user update image profile");

    }




};

export default Upload;

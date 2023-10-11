import pool from "../Database";
import jwt  from "jsonwebtoken";

export default async function Loginadminapi(req, res) {
    if(req.method ==="POST")
    {
       const {email, password} = req.body;
       const [data] = await pool.query('SELECT * FROM admin WHERE Adminemail = ?', [email]);
       if (data.length > 0)
       {
        
        if(password !== data[0].Adminpass)
        {
            console.log("password incorrect");
            res.send({message: 'Password incorrect'})

        }
        else
        {
            const admintoken = jwt.sign({id:data[0].Adminid,email:data[0].Adminemail,
                image:data[0].Adminimg}, process.env.JWT_SECRET, {expiresIn: '3600s'})

            console.log("password correct");
            res.status(200).json({message: 'admin logged in', admintoken})
        }
       }
        

    }
    else
    {
        res.status(405).json({message:"Method not allowed"});
    }
}
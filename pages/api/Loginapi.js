
import pool from './Database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function Loginapi(req, res) {
    if(req.method ==="POST")
    {
       const {email, password} = req.body;
         const [rows,field] = await pool.query('SELECT * FROM users WHERE Uemail = ?', [email])
            if(rows.length> 0)
            {
                const compare = await bcrypt.compare(password, rows[0].Upassword)
                console.log(compare); console.log(rows);
                if(compare)
                {
                    const token = jwt.sign({id:rows[0].Uid,name:rows[0].Uname,email:rows[0].Uemail,
                        image:rows[0].Uimage,phone:rows[0].Uphone,gender:rows[0].Ugender,birthday:rows[0].Ubirthday}, process.env.JWT_SECRET, {expiresIn: '3600s'})

                    console.log("password correct");
                    res.status(200).json({message: 'User logged in', token})
                }
                else
                {
                    console.log("password incorrect");
                    res.send({message: 'Password incorrect'})
                }
            }
            else
            {
                console.log("user not found");
                res.send({message: 'user not found'})
            }

            
        
     
    }
}

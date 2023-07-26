import pool from "./Database";
import jwt from "jsonwebtoken";

export default async function UpdateProfile(req, res) {
    if (req.method === "POST") {

        const {name,phone,gender,birthday,id} = req.body;

        if(name)
        {
            const [rows, field] = await pool.query(
                "UPDATE users SET Uname = ? WHERE users.Uid = ?",
                [name,id]
            );
        }
        if(phone)
        {
            const [rows, field] = await pool.query(
                "UPDATE users SET Uphone = ? WHERE users.Uid = ?",
                [phone,id]
            );
        }
        if(gender)
        {
            const [rows, field] = await pool.query(
                "UPDATE users SET Ugender = ? WHERE users.Uid = ?",
                [gender,id]
            );
        }
        if(birthday)
        {
            const [rows, field] = await pool.query(
                "UPDATE users SET Ubirthday = ? WHERE users.Uid = ?",
                [birthday,id]
            );
        }
        const [rows,field] = await pool.query('SELECT * FROM users WHERE Uid = ?', [id])
        const token = jwt.sign({id:rows[0].Uid,name:rows[0].Uname,email:rows[0].Uemail,
            image:rows[0].Uimage,phone:rows[0].Uphone,gender:rows[0].Ugender,birthday:rows[0].Ubirthday}, process.env.JWT_SECRET, {expiresIn: '1s'})

        res.status(201).json({ message: "User update profile" ,token});
        console.log("user update profile");



       
    }


}


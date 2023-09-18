import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            //หา status ในตาราง sellservice เท่ากับ ชำระเงินเสร็จสิ้น รวมกับ ตาราง user โดยหาที่ SS_Uid ของตารางsellservice และ Uid ของตาราง user ให้เท่ากัน และเอาข้อมูลในตารางuserมาด้วย
           
            const [rows,field] = await pool.query(
                `    SELECT sellservice.*, users.Uname, users.Uimage, users.Uemail, users.Uphone, address.*
                FROM sellservice
                INNER JOIN users ON sellservice.SS_Uid = users.Uid
                LEFT JOIN address ON sellservice.SS_Uid = address.ADD_Uid
                WHERE sellservice.SSstatus IN ("ชำระเงินเสร็จสิ้น","ส่งคืน")`
            );
            console.log(rows)
            
            res.status(200).json({rows});

           
           
        } catch (err) {
            console.error(err.message);
        }
    }
  
}
import pool from "./Database";

export default async function acceptsellservice(req, res) {
    if (req.method === "POST") {
        const {  Uid,id,
            status,
            imgtrack,
            imgidcard,
            imgpayment } = req.body;
        
        if(status === "ยืนยันการขาย" || status === "ปฎิเสธการขาย")
        {
            const [rows, field] = await pool.query("UPDATE sellservice SET SSstatus = ? WHERE SSid = ?",
            [status,id]
            );
            if(status === "ยืนยันการขาย")
            {
                const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
                [Uid,"รายการรับซื้อ",new Date(),"ได้ทำการยืนยันการขาย","ยังไม่ได้อ่าน"])
            }
            else
            {
                const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
                [Uid,"ยกเลิกรายการ",new Date(),"ได้ทำการปฎิเสธการขาย","ยังไม่ได้อ่าน"])
            }

            
            res.status(201).json({ message: "success send"});

        }
        else{
        const [rows, field] = await pool.query("UPDATE sellservice SET SSstatus = ?,SSurltrack = ?,SSurlidcard = ?,SSurlpayment = ? WHERE SSid = ?",
        [status,imgtrack,imgidcard,imgpayment,id]
        );
        const [notice,field2] = await pool.query('INSERT INTO notice (Nuid,Ntype,Ntimes,Nmessage,Nstatus) VALUES (?,?,?,?,?)',
        [Uid,"รายการรับซื้อ",new Date(),"ได้ทำการส่งขายทางร้าน โดยอัพโหลด ช่องทางการชำระเงิน และสลิปการส่งแล้ว โปรดเช็ค","ยังไม่ได้อ่าน"])
        
        res.status(201).json({ message: "success send"});
        }
      
    }
    }
// Compare this snippet from pages\api\showrepairitemapi.js:
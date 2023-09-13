import pool from "./Database";

export default async function acceptsellservice(req, res) {
    if (req.method === "POST") {
        const {  id,
            status,
            imgtrack,
            imgidcard,
            imgpayment } = req.body;
        
        if(status === "ยืนยันการขาย" || status === "ปฎิเสธการขาย")
        {
            const [rows, field] = await pool.query("UPDATE sellservice SET SSstatus = ? WHERE SSid = ?",
            [status,id]
            );
            
            res.status(201).json({ message: "success send"});

        }
        else{
        const [rows, field] = await pool.query("UPDATE sellservice SET SSstatus = ?,SSurltrack = ?,SSurlidcard = ?,SSurlpayment = ? WHERE SSid = ?",
        [status,imgtrack,imgidcard,imgpayment,id]
        );
        
        res.status(201).json({ message: "success send"});
        }
      
    }
    }
// Compare this snippet from pages\api\showrepairitemapi.js:
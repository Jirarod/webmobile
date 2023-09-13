import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, status,url } = req.body;


    
        const [rows] = await pool.query(
            "UPDATE sellservice SET SSstatus = ?,SS_ad_slip = ? WHERE SSid = ? ",
            [status,url,id]
        );
            res.status(201).json({ message: "success send"});
     
      
    }
}
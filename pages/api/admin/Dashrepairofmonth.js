import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET")
    {
        const sql ="SELECT COUNT(RSid) AS NumberOfRepair FROM repairservice WHERE RS_ad_finishtime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND RSstatus = 'ชำระเงินแล้ว'"
        const [rows] = await pool.query(sql);
        const [SUM] = await pool.query("SELECT SUM(RS_ad_appraise) AS TotalAppraise FROM repairservice WHERE RS_ad_finishtime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND RSstatus = 'ชำระเงินแล้ว'");

        res.status(201).json({rows,SUM});

    }
    else 
    {
        res.status(405).json({ message: "405 Method Not Allowed" });
       
    }
}
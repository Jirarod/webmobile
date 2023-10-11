import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET")
    {
        const sql = "SELECT COUNT(PAYID) AS NumberOfPayments FROM payment WHERE PAY_admin_times >= DATE_SUB(NOW(), INTERVAL 1 MONTH)"
        const [rows] = await pool.query(sql);
        const [SUM] = await pool.query("SELECT SUM(PAY_Total) AS TotalPayment FROM payment WHERE PAY_admin_times >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND PAY_status = 'จัดส่งแล้ว' ");

        res.status(201).json({rows,SUM});
    }
    else 
    {
        res.status(405).json({ message: "405 Method Not Allowed" });
       
    }
}
import pool from "../Database";

export default async function Dashallincome(req, res) {
    if(req.method ==="GET")
    {
        const sql ="SELECT MONTH(PAY_admin_times) AS Month, SUM(PAY_Total) AS TotalPayment FROM payment WHERE PAY_status = 'จัดส่งแล้ว' GROUP BY MONTH(PAY_admin_times)"
        const [rows,field] = await pool.query(sql)

        res.status(200).json({rows})
    }
    else
    {
        res.status(405).json({message:"wrong methods"})
    }
}

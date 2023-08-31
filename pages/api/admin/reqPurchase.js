import pool from "../Database";

export default async function reqPurchase(req, res) {
    if (req.method ==="GET")
    {
        
        const [rows,field] = await pool.query('SELECT * FROM sellservice WHERE SSstatus = "รอการตอบรับ"')

        res.status(200).json({message: 'sell service success',rows})

    }
}
import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET")
    {
        const sql ="SELECT payment.*,product.PDname FROM payment INNER JOIN product ON PDid = PAY_PDid ORDER BY PAYtime DESC LIMIT 10"
        const [rows] = await pool.query(sql);

        res.status(201).json({rows});

    }
    else 
    {
        res.status(405).json({ message: "405 Method Not Allowed" });
       
    }
}
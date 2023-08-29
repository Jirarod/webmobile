import pool from "../Database" ;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const [rows, field] = await pool.query(
        "SELECT * FROM product"
        );
        res.status(200).json(rows);
    }
    }
    
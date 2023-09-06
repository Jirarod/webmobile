import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const [rows, field] = await pool.query(
        "SELECT * FROM sellservice where SSstatus = 'อยู่ระหว่างการส่งขาย' "
        );
        console.log(rows)
        res.status(200).json(rows);
    }
    }

import pool from "./Database";

export default async function showsellitemapi(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        const [rows, field] = await pool.query(
        "SELECT * FROM sellservice WHERE SS_Uid = ?",
        [id]
        );
        res.status(200).json({ rows });
    }
    }
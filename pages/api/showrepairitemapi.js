import pool from "./Database";

export default async function showrepairitemapi(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        const [rows, field] = await pool.query(
        "SELECT * FROM repairservice WHERE RS_Uid = ?",
        [id]
        );
        res.status(200).json({ rows });
    }
    }
// Compare this snippet from pages\api\showrepairitemapi.js:
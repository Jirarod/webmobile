import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { PDid} = req.body;

       const [rows,field] = await pool.query(
            "DELETE FROM product WHERE PDid = ?",
            [PDid]
        );
        res.status(201).json({ message: "Delete success" });
    }
}
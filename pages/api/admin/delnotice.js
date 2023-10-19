import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { Nid } = req.body;
        const [rows,fileds] = await pool.query("DELETE FROM notice WHERE Nid = ? ",[Nid]);

        res.status(201).json({ message: "Delete send"});
    }
}
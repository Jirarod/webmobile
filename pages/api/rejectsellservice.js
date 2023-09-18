import pool  from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, status } = req.body;
        const [rows] = await pool.query(
            "UPDATE sellservice SET SSstatus = ? WHERE SSid = ? ",
            [status,id]
        );
            res.status(201).json({ message: "success send"});
    }
}
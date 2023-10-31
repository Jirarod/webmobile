import pool from "./Database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        const [rows, field] = await pool.query(
            "SELECT * FROM users WHERE Uemail = ?",
            [email]
        );
        if (rows.length > 0) {
            console.log("user already exists");
            res.status(201).json({ message: "User already exists" });
        } else {
            res.status(201).json({ message: "success send", rows });
        }
    }
    }
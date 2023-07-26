import pool from "./Database";
import bcrypt from "bcrypt";


export default async function changepasswordapi(req, res) {
    if (req.method === "POST") {
        const { id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [row, fields] = await pool.query("UPDATE users SET Upassword = ? WHERE Uid = ?", [hashedPassword, id]);
    res.status(201).json({ message: "Password change" });
    }
}
// Compare this snippet from pages\api\updateprofileapi.js:

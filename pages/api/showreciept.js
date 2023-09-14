import pool from "./Database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { SSid } = req.body;
        try {
            const [rows, field] = await pool.query(
                `    SELECT sellservice.*, users.Uname, users.Uimage, users.Uemail, users.Uphone, address.*
                FROM sellservice
                INNER JOIN users ON sellservice.SS_Uid = users.Uid
                LEFT JOIN address ON sellservice.SS_Uid = address.ADD_Uid
                WHERE sellservice.SSid = ?`, [SSid]);
        
          
            res.status(200).json({ message: "success", rows });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
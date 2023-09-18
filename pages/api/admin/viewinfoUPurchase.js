import pool from "../Database";

export default async function handler(req, res) {
    if (req.method === "POST")
    {
        const { id} = req.body;
        const [rows,field] = await pool.query(
            `    SELECT sellservice.*, users.Uname,users.Uemail, users.Uphone, address.*
            FROM sellservice
            INNER JOIN users ON sellservice.SS_Uid = users.Uid
            LEFT JOIN address ON sellservice.SS_Uid = address.ADD_Uid
            WHERE sellservice.SSid = ?`,
            [id]
        );
         
        res.status(201).json({rows});
    }
    
}
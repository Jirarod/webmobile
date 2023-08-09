import pool from "../Database";

export default async function requestrepairshow (req, res){
    if (req.method === "POST") {
        const { status } = req.body;
        const [rows, field] = await pool.query(
        "SELECT repairservice.* ,users.Uname,users.Uimage,users.Uemail,users.Uphone FROM repairservice INNER JOIN users ON repairservice.RS_Uid = users.Uid WHERE repairservice.RSstatus = ?",
        [status]
        );
        console.log(rows)
        res.status(200).json({ rows });
    
}
}

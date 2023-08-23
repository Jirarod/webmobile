import pool from "../Database";

export default async function requestrepairshow (req, res){
    if (req.method === "POST") { 
        const { status } = req.body;
        if(status ==="อยู่ระหว่างการส่งซ่อม"||status ==="ดำเนินการการซ่อม"){
        const [rows, field] = await pool.query(  "SELECT repairservice.*, users.Uname, users.Uimage, users.Uemail, users.Uphone " +
        "FROM repairservice INNER JOIN users ON repairservice.RS_Uid = users.Uid " +
        "WHERE repairservice.RSstatus = ? OR repairservice.RSstatus = ?",
        ["อยู่ระหว่างการส่งซ่อม", "ดำเนินการการซ่อม"]
      );
        console.log(rows)
        res.status(200).json({ rows });
        }else{
        const [rows, field] = await pool.query(
        "SELECT repairservice.* ,users.Uname,users.Uimage,users.Uemail,users.Uphone FROM repairservice INNER JOIN users ON repairservice.RS_Uid = users.Uid WHERE repairservice.RSstatus = ?",
        [status]
        );
        console.log(rows)
        res.status(200).json({ rows });
        }
}
}
